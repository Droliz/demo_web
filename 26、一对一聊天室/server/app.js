// 使用 nodejs-websocket 模块创建 websocket 服务
const ws = require('nodejs-websocket')
const PORT = 9000

// 离线消息列表
const offlineMsg = {};

// 聊天记录，key为两个用户id的组合，value为聊天记录
const chatRecord = {};

// 通过两个用户id: string，生成唯一的key
const getKey = (id1, id2) => {
    return id1 > id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
}

const server = ws.createServer(connect => {
    connect.on('text', (massage) => {
        massage = JSON.parse(massage);
        // console.log(massage);
        if (massage.type === 'login') {
            // 设置连接id
            connect.id = massage.id;
            // 查看是否有离线消息
            if (offlineMsg[connect.id]) {
                offlineMsg[connect.id].forEach(msg => {
                    // 发送离线消息
                    console.log("推送离线消息", msg)
                    // 更改状态
                    msg.state = "success";
                    connect.sendText(JSON.stringify(msg));
                    // 发送完毕后，将消息添加到聊天记录中
                    const key = getKey(connect.id, msg.sendId);
                    if (chatRecord[key]) {
                        chatRecord[key].push(msg);
                    } else {
                        chatRecord[key] = [msg];
                    }

                });
                // 发送完毕后，清空离线消息列表
                offlineMsg[connect.id] = [];
            }
        } else if (massage.type === 'msg') {
            const { acceptId, msg } = massage
            // 先判断目标是否在线
            let isOnline = false;
            server.connections.forEach(conn => {
                if (conn.id === acceptId) {
                    isOnline = true;
                }
            });

            // 不在线，先添加到离线消息列表，等目标上线后再发送
            if (!isOnline) {

                if (offlineMsg[acceptId]) {
                    offlineMsg[acceptId].push({ sendId: connect.id, type: "msg", msg, state: "fail" });
                } else {
                    offlineMsg[acceptId] = [{ sendId: connect.id, type: "msg", msg, state: "fail" }];
                }
            } else {
                // 在线，直接发送
                server.connections.forEach(conn => {
                    if (conn.id === acceptId) {
                        conn.sendText(JSON.stringify({ sendId: connect.id, type: "msg", msg, state: "success" }));
                    }
                });
                // 发送完毕后，将消息添加到聊天记录中
                const key = getKey(connect.id, acceptId);
                if (chatRecord[key]) {
                    chatRecord[key].push({ sendId: connect.id, type: "msg", msg, state: "success" });
                } else {
                    chatRecord[key] = [{ sendId: connect.id, type: "msg", msg, state: "success" }];
                }
            }

            // 发送成功，给自己回执
            connect.sendText(JSON.stringify({ sendId: connect.id, type: "msg", msg, state: "success" }));
        } else if (massage.type === 'ping') {
            // 心跳检测
            connect.sendText(JSON.stringify({ type: 'pong' }));
        } else if (massage.type === 'changeAcceptId') {
            // 查看聊天记录
            const { acceptId } = massage;
            const key = getKey(connect.id, acceptId);
            if (chatRecord[key]) {
                // 推送聊天记录
                chatRecord[key].forEach(msg => {
                    console.log("推送聊天记录", msg)
                    connect.sendText(JSON.stringify(msg));
                });
            }
        }
        // console.log(chatRecord);
        return;
    });

    connect.on('error', (err) => {
        console.log('error', err);
    });

    // 连接关闭
    connect.on('close', (code, reason) => {
        console.log('close', code, reason);
    });

}).listen(PORT)


// q: c 语言中 7 -- 8 =  的答案是什么？为什么
// a: 7 -- 8 = 4294967295，因为 7 -- 8 = 7 - 8 = -1，-1在计算机中是用补码表示的，补码是原码取反加1，所以-1的补码是11111111，而int类型是4个字节，所以补码是11111111 11111111 11111111 11111111，转换成十进制就是4294967295

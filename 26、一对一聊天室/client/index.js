// 连接 websocket 服务器
let ws; // websocket 对象
let userId;  // 当前用户id
let acceptId;  // 聊天对象id

// 存储未读消息
const unreadMsg = {};

// 渲染节点
class Renderer {
    constructor(userId) {
        this.userId = userId;
        this.input = document.querySelector('.input .in');  // 输入框
        this.btn = document.querySelector('.input .btn');  // 发送按钮
        this.list = document.querySelector('.list');  // 联系人列表
        this.title = document.querySelector('.window-header span');  // 聊天框标题
        this.chat = document.querySelector('.window-body .content');  // 聊天框
        this.username = document.querySelector('#username');  // 登录用户名
        this.submit = document.querySelector('#submit');  // 登录按钮
        this.userList = [
            {
                id: '2511503173',
                name: '张三',
                avatar: './img/touxiang.jpg',
            },
            {
                id: '13297056929',
                name: '李四',
                avatar: './img/touxiang.jpg',
            },
            {
                id: '793353570',
                name: '王五',
                avatar: './img/touxiang.jpg',
            },
            {
                id: '2183782371',
                name: '赵六',
                avatar: './img/touxiang.jpg',
            },
        ];

        this.init();
    }

    init() {
        this.renderList();
        // this.renderChat();
    }

    // 渲染联系人列表
    renderList() {
        this.list.innerHTML = this.userList.map(user => {
            if (user.id === this.username.value) return ''
            return `
                <li class='list-item' data-user_id="${user.id}">
                    <img src="${user.avatar}" alt="">
                    <span>${user.name}</span>
                </li>
            `;
        }).join('');
    }

    // 单独渲染联系人
    renderListItem(user) {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.dataset.user_id = user.id;
        li.innerHTML = `
            <img src="${user.avatar}" alt="">
            <span>${user.name}</span>
        `;
        this.list.appendChild(li);
    }

    // 渲染聊天框
    renderChat(name, arr = []) {
        this.title.innerHTML = name;
        // 渲染聊天内容
        arr.forEach(msg => {
            this.renderContent(msg);
        });

    }

    // 渲染聊天内容
    renderContent(_msg) {
        const { type, msg, sendId, state } = _msg;
        console.log('renderer', msg)
        // console.log(type, msg, sendId, state);
        if (type === 'msg') {
            // 7.2、创建li
            const li = document.createElement('li');
            // 7.3、判断是自己发送的消息还是别人发送的消息
            // console.log(sendId, this.userId)
            if (sendId === this.userId) {
                li.className = 'right';
                li.innerHTML = `
                    <div class="message">${msg}</div>
                    <img src="./img/touxiang.jpg" alt="">
                `;
            } else {
                li.className = 'left';
                li.innerHTML = `
                    <img src="./img/touxiang.jpg" alt="">
                    <div class="message">${msg}</div>
                `;
            }
            // 7.4、将li添加到聊天框中
            this.chat.appendChild(li);
        }
        // 聊天框滚动条永远靠下
        this._scroll();
    }

    // 聊天框滚动条永远靠下
    _scroll() {
        // 滚动条在chat的父节点上
        const parent = this.chat.parentNode;
        // 判断
        if (parent.scrollTop + parent.offsetHeight === parent.scrollHeight) return;
        // 滚动条滚动到最底部
        parent.scrollTop = parent.scrollHeight;
    }
}

const btn = document.querySelector('.input .btn');  // 发送按钮
const input = document.querySelector('.input .in');  // 输入框
const list = document.querySelector('.list');  // 联系人列表
const chat = document.querySelector('.window-body .content');
const username = document.querySelector('#username');
const submit = document.querySelector('#submit');

// 联系人列表（从服务器获取）
const userList = [
    {
        id: '2511503173',
        name: '张三',
        avatar: './img/touxiang.jpg',
    },
    {
        id: '13297056929',
        name: '李四',
        avatar: './img/touxiang.jpg',
    },
    {
        id: '793353570',
        name: '王五',
        avatar: './img/touxiang.jpg',
    },
    {
        id: '2183782371',
        name: '赵六',
        avatar: './img/touxiang.jpg',
    },
];

// 添加事件
const _event = (ws, rend) => {
    if (!rend) return
    // 切换联系人
    list.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('click', () => {

            // 如果初始的联系人为空，将遮罩层隐藏
            if (!acceptId) {
                _hide(document.querySelector('.mask'), true);
            }

            // item 自定义属性 data-user_id
            rend.renderChat(item.dataset.user_id);
            // 修改acceptId
            acceptId = item.dataset.user_id;
            // 清空聊天内容
            chat.innerHTML = '';
            // 消除角标
            item.querySelector('.unread') && item.querySelector('.unread').remove();
            ws.send(JSON.stringify({ type: 'changeAcceptId', acceptId }));
        });
    });

    // 发送按钮
    btn.addEventListener('click', () => {
        if (ws) {
            // 发送消息
            ws.send(JSON.stringify({ type: 'msg', acceptId, msg: input.textContent }));
            // 清空输入框
            input.textContent = '';
        }
    });
}

// 为消息列表添加未读消息
const _addUnread = (id) => {
    // 获取联系人列表
    const lis = list.querySelectorAll('.list-item');
    // 遍历
    lis.forEach(item => {
        if (item.dataset.user_id === id) {
            // 获取未读消息数量
            const num = item.querySelector('.unread');
            // 判断
            if (num) {
                // 有未读消息
                num.innerHTML = parseInt(num.innerHTML) + 1;
            } else {
                // 没有未读消息
                const span = document.createElement('span');
                span.className = 'unread';
                span.innerHTML = 1;
                item.appendChild(span);
            }
        }
    });
}


// 隐藏元素
const _hide = (el, flag) => {
    // flag 为 true 隐藏
    if (!flag) return;
    el.style.display = 'none';
}

submit.addEventListener('click', () => {
    if (username.value === '') return
    // 1、连接服务器
    ws = new WebSocket('ws://localhost:9000');
    // 2、获取用户名
    userId = username.value;
    const renderer = new Renderer(userId);
    // 添加事件
    _event(ws, renderer);
    // 默认不显示联系人
    // acceptId = list.querySelectorAll('.list-item')[0].dataset.user_id;
    // 3、更改聊天对象
    // renderer.renderChat(acceptId);
    // 4、监听连接成功事件
    ws.onopen = () => {
        console.log('连接成功');
        // 5、发送连接信息
        ws.send(JSON.stringify({ type: 'login', id: userId }));
        // 6、进入主界面
        _hide(document.querySelector('.login'), true);
        // 默认切换到第一个联系人
        // ws.send(JSON.stringify({ type: "changeAcceptId", acceptId }));
    }
    // 7、监听服务器发送的消息
    ws.onmessage = (msg) => {
        // 心跳检测
        if (msg.data.type === 'pong') return
        // renderer.renderContent(JSON.parse(msg.data));
        const { sendId } = JSON.parse(msg.data);
        console.log(sendId === acceptId);
        // 如果当前的发送人是当前聊天对象（或自己消息反馈），直接渲染
        if (acceptId === sendId || sendId === userId) {
            renderer.renderContent(JSON.parse(msg.data));
        } else {  // 如果不是，将消息存储到对应的数组中
            // 所有用户都在联系人列表中
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].id === sendId) {
                    // 判断是否有消息数组
                    if (!userList[i].msg) {
                        userList[i].msg = [];
                    }
                    // 添加消息
                    userList[i].msg.push(JSON.parse(msg.data));
                    break;
                }
            }

            // 为联系人列表添加未读消息
            _addUnread(sendId);
        }
    }
    // 8、监听连接关闭事件
    ws.onclose = () => {
        console.log('连接关闭');
    }
    // 9、监听连接错误事件
    ws.onerror = () => {
        alert('连接错误');
    }

    // 心跳检测
    setInterval(() => {
        ws.send(JSON.stringify({ type: 'ping' }));
    }, 60000);
});

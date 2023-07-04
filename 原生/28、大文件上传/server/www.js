// www.js
const mysql = require('mysql');
const http = require('http')

const server = http.createServer()
// 连接数据库
const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    database: 'test'
});

server.on('request', async (req, res) => {
    // 处理跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    if (req.url === '/upload') {
        console.log(req.query);
        con.connect();
        // console.log(con);
        // 查询数据库
        con.query('SELECT * FROM files', (err, result) => {
            if (err) {
                console.log("查询失败");
                throw err;
            };
            console.log(result);
        })
        // 关闭数据库
        con.end();
    }
});

server.listen(3000, () => {
    console.log('server is running in 127.0.0.1:3000');
});


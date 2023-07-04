const input = document.getElementById('input');
let upload = document.getElementById('upload')

input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log(file);
});

upload.addEventListener('click', () => {
    const file = input.files[0];
    // 计算 hash 值
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        const spark = new SparkMD5.ArrayBuffer();
        spark.append(fileReader.result);
        const hash = spark.end();
        console.log('hash', hash);
    }
    fileReader.readAsArrayBuffer(file);
    // 发送请求
    axiosRequest({ url: 'http://localhost:3000/upload', data: { file } }).then((res) => {
        console.log(res);
    });
});

//请求函数
function axiosRequest({ method = "post", url, data }) {
    return new Promise((resolve, reject) => {
        const config = {//设置请求头
            headers: 'Content-Type:application/x-www-form-urlencoded',
        }
        //默认是post请求，可更改
        axios[method](url, data, config).then((res) => {
            resolve(res)
        });
    })
}

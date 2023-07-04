let input = document.getElementById('input')
let upload = document.getElementById('upload')
let files = {}//创建一个文件对象
let chunkList = []//存放切片的数组

// 读取文件
input.addEventListener('change', (e) => {
    files = e.target.files[0]
    console.log(files);

    //创建切片
    chunkList = createChunk(files)
    console.log(chunkList);
    //上传切片
    //数据处理

})

async function uploadFile(list) {

    const requestList = list.map(({ file, fileName, index, chunkName }) => {
        const formData = new FormData() // 创建表单类型数据
        formData.append('file', file)  //该文件
        formData.append('fileName', fileName)  //文件名
        formData.append('chunkName', chunkName)  //切片名
        return { formData, index }
    }).map(({ formData, index }) => axiosRequest({
        method: 'post',
        url: 'http://localhost:3000/upload',//请求接口，要与后端一一一对应
        data: formData
    }).then(res => {
        console.log(res);
        //显示每个切片上传进度
        let p = document.createElement('p');
        p.innerHTML = `${list[index].chunkName}--${res.data.message}`;
        document.getElementById('progress').appendChild(p);
    }));
    console.log(requestList)
    await Promise.all(requestList);  //保证所有的切片都已经传输完毕
    // 通知后端去做切片合并
    merge(files.size, files.name);
}

// 文件上传
upload.addEventListener('click', () => {
    const uploadList = chunkList.map(({ file }, index) => ({
        file,
        size: file.size,
        percent: 0,
        chunkName: `${files.name}-${index}`,
        fileName: files.name,
        index
    }))
    //发请求，调用函数
    uploadFile(uploadList)
})

// 创建切片
function createChunk(file, size = 20 * 1024 * 1024) {//两个形参：file是大文件，size是切片的大小
    if (!file) return;
    const chunkList = [];
    let cur = 0;
    while (cur < file.size) {
        chunkList.push({
            file: file.slice(cur, cur + size)  //使用slice()进行切片
        })
        cur += size;
    }
    return chunkList;
}

// 通知后端去做切片合并
function merge(size, fileName) {
    console.log("开始合并");
    axiosRequest({
        method: 'post',
        url: 'http://localhost:3000/merge',//后端合并请求
        data: JSON.stringify({
            size,
            fileName,
        }),
    })
}

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

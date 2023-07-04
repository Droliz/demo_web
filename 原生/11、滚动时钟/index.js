
let size = document.querySelector('.time').getAttribute('data-size');

let columns = Array.from(document.querySelectorAll('.column'));

let class_list = ['visible', 'near', 'far', 'far', 'far', 'distant', 'distant', 'distant', 'distant', 'distant'];

let is_24_hour_clock = true;

/**
 * 获取时间 hour min sec
 * @returns {string} 时间字符串
 */
const getClock = () => {
    let d = new Date();
    let hour = is_24_hour_clock ? d.getHours() : d.getHours() % 12 || 12;
    hour = hour < 10 ? '0' + hour : hour;
    let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    return `${hour}${minute}${second}`;
}

/**
 * 获取对应节点的样式名
 * @param {number} n 当前列选中的数字
 * @param {number} i 每个数字的索引
 * @returns 
 */
const getClass = (n, i) => {
    return class_list.find((_class, class_index) => {

        return i - class_index === n || i + class_index === n;
    }) || '';
}

/**
 * 定时器回调
 */
const RUN = () => {
    let c = getClock();
    columns.forEach((ele, i) => {
        let n = parseInt(c[i]);
        let offset = -n * size;
        ele.style.transform = `translateY(calc(50vh + ${offset}px - ${size / 2}px))`;
        Array.from(ele.children).forEach((e, index) => {
            e.className = `num ${getClass(n, index)}`;
        });
    });
}

RUN();

setInterval(RUN, 1000);
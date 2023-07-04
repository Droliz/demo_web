
// 获取浏览器可见区域高度
var window_height = document.documentElement.clientHeight;
// 用户手动修改浏览器可见区域高度时修改变量
window.onresize = function () {
    window_height = document.documentElement.clientHeight;
};

// 获取所需效果元素
var myBox = document.querySelectorAll('.box');
// 滚动前（用于计算滚动方向）
var beforeScrollTop = document.body.scrollTop || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    // 当前滚动高度
    let _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 鼠标滚轮的方向  e.wheelDelta < 0 || e.detail > 0
    let flag = _scrollTop - beforeScrollTop > 0; // 滚动条方向
    beforeScrollTop = _scrollTop;

    const arr = ['left', 'top', 'bottom', 'right'];

    for (let i in arr) {
        let item = myBox[i];
        let dir = arr[i];
        if (!item.classList.contains(dir) && flag && _scrollTop >= getOffsetTop(item) - window_height * 0.5) {
            item.classList.add(dir);
        } else if (!flag && item.classList.contains(dir) && _scrollTop <= getOffsetTop(item) - window_height * 0.5) {
            item.classList.remove(dir);
        }
    }
});

// 获取当前元素到页面顶部（非视口）的距离
function getOffsetTop(ele) {
    var rtn = ele.offsetTop;
    var o = ele.offsetParent;
    while (o != null) {
        rtn += o.offsetTop;
        o = o.offsetParent;
    }
    return rtn;
}

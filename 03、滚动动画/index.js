
// 获取浏览器可见区域高度
var window_height = document.documentElement.clientHeight;
// 用户手动修改浏览器可见区域高度时修改变量
window.onresize = function () { 
    window_height = document.documentElement.clientHeight; 
};

// 获取所需效果元素
var My_vanwee = document.getElementsByClassName('vanwee');

// 鼠标滚轮滚动执行方法
window.onscroll = my_animation

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

// 初始时 使用动画
function my_animation() {
    var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 效果方法
    for (var k = 0; k < My_vanwee.length; k++) {
        // 进入视口添加动画
        if (~My_vanwee[k].classList.contains("f-up") && _scrollTop >= getOffsetTop(My_vanwee[k]) - window_height && _scrollTop <= getOffsetTop(My_vanwee[k])) {
            My_vanwee[k].classList.add("f-up");
        }
    }
}
my_animation();
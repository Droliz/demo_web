const card = document.querySelector('.card');
const span = document.querySelector('.card .span');

const rect = card.getBoundingClientRect();
// 位置
const [x, y] = [rect.left, rect.top];

// 事件
card.addEventListener('mousemove', function (e) {
    // 计算当前鼠标在 card 中的偏移量
    const x_offset = e.clientX - x;
    const y_offset = e.clientY - y;
    // 设置背景
    span.style.left = x_offset + 'px';
    span.style.top = y_offset + 'px';
    span.classList.add('show');
    card.style.transform = 'perspective(700px) rotateX(-0.93deg) rotateY(-1.33deg)';
    // 计算倾斜角度
    const _y = -((x_offset - rect.width / 2) / rect.width) * 3;
    const _x = ((y_offset - rect.height / 2) / rect.height) * 2;
    card.style.transform = `perspective(700px) rotateX(${_x}deg) rotateY(${_y}deg)`;
});

card.addEventListener('mouseout', function (e) {
    span.classList.remove('show');
    card.style.transform = 'perspective(700px) rotateX(0.03deg) rotateY(-0.03deg)';
});
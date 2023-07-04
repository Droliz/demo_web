const btn = document.querySelector('.btn');

const [x, y] = [btn.getBoundingClientRect().left, btn.getBoundingClientRect().top];
let time = getComputedStyle(btn).getPropertyValue('--animation-delay');
time = parseInt(time.slice(0, time.length - 2));

btn.addEventListener('click', function(e) {

    let ripples = document.createElement('span');
    ripples.style.left = `${e.clientX - x}px`;
    ripples.style.top = `${e.clientY - y}px`;
    btn.appendChild(ripples);

    setTimeout(() => ripples.remove(), time);
});

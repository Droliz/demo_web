const menu = document.querySelector('.menu-box');
const btn = document.querySelector('.menu-btn');
btn.addEventListener('click', () => {

    menu.classList.toggle('active');
});

let spans = document.querySelectorAll('.row-is-visible');

setTimeout(() => {
    spans.forEach(item => {
        item.classList.add('show');
    });

}, 2000);


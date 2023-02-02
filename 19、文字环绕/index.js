const text = document.querySelector('.text');

let texts = text.getAttribute('data-text').split("");
const temp = 360 / texts.length;

texts = texts.map((item, i) => {
    return `
    <span style='transform:rotate(${i * temp}deg)'>
        ${item}
    </span>
    `;
});
    
text.innerHTML = texts.join("");


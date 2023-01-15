const list = document.querySelector(".list");

let sourceNode;  // 记录拖动的元素

list.ondragstart = (e) => {
    setTimeout(() => {
        e.target.classList.add("moving");
    }, 0);
    sourceNode = e.target;
}

// 拖动
list.ondragenter = e => {
    if (e.target === list || e.target === sourceNode) {
        return;
    }
    const children = Array.from(list.children);
    const sourceIndex = children.indexOf(sourceNode);
    const targetIndex = children.indexOf(e.target);
    if (sourceIndex < targetIndex) {
        // 向下拖动
        list.insertBefore(sourceNode, e.target.nextElementSibling);
    } else {
        // 向上拖动
        list.insertBefore(sourceNode, e.target)
    }
}

// 拖动完成
list.ondragend = e => {
    e.target.classList.remove("moving");
}



# 瀑布流布局


## column-count属性实现

这种布局是从上往下，从左往右来分配子项目。所以在更新列表时，就会导致排列的格式不对

```css
.container {
    column-count: 6;
    column-gap: 0;
}

.container div {
    box-sizing: border-box;
    padding: 10px;
}

.container img {
    width: 100%;
    display: block;
}
```

```html
<div class="container">
    <div><img src="./image/1.jpg" alt=""></div>
    <div><img src="./image/2.jpg" alt=""></div>
    <div><img src="./image/4.jpg" alt=""></div>
    <div><img src="./image/3.jpg" alt=""></div>
    <div><img src="./image/7.jpg" alt=""></div>
    <div><img src="./image/5.jpg" alt=""></div>
    <div><img src="./image/6.jpg" alt=""></div>
    <div><img src="./image/9.jpg" alt=""></div>
    <div><img src="./image/10.jpg" alt=""></div>
    <div><img src="./image/14.jpg" alt=""></div>
    <div><img src="./image/11.jpg" alt=""></div>
    <div><img src="./image/12.jpg" alt=""></div>
    <div><img src="./image/8.jpg" alt=""></div>
    <div><img src="./image/13.jpg" alt=""></div>
    <div><img src="./image/15.jpg" alt=""></div>
    <div><img src="./image/16.jpg" alt=""></div>
    <div><img src="./image/17.jpg" alt=""></div>
    <div><img src="./image/17.jpg" alt=""></div>
</div>
```

## grid布局

目前`grid-template-rows`的属性值`masonry`仅仅在火狐浏览器中适用

```css
.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-template-rows: masonry;
}

.container img {
    width: 100%;
    display: block;
}
```

```html
<div class="container">
    <img src="./image/1.jpg" alt="">
    <img src="./image/2.jpg" alt="">
    <img src="./image/4.jpg" alt="">
    <img src="./image/3.jpg" alt="">
    <img src="./image/7.jpg" alt="">
    <img src="./image/5.jpg" alt="">
    <img src="./image/6.jpg" alt="">
    <img src="./image/9.jpg" alt="">
    <img src="./image/10.jpg" alt="">
    <img src="./image/14.jpg" alt="">
    <img src="./image/11.jpg" alt="">
    <img src="./image/12.jpg" alt="">
    <img src="./image/8.jpg" alt="">
    <img src="./image/13.jpg" alt="">
    <img src="./image/15.jpg" alt="">
    <img src="./image/16.jpg" alt="">
    <img src="./image/17.jpg" alt="">
</div>
```
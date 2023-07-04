# 拖拽

h5新属性: `draggable`（设置为`draggable=true`）。（链接和图片默认是可拖动的，不需要 `draggable` 属性。）

## 拖动目标触发事件

dragstart  
要被拖拽的元素开始拖拽时触发，这个事件对象是被拖拽元素  
drag - 元素正在拖动时触发  
dragend - 用户完成元素拖动后触发  
在drop之后触发，就是拖拽完毕时触发，这个事件对象是被拖拽元素  
释放目标时触发的事件:  
dragenter  
拖拽元素进入目标元素时触发，这个事件对象是目标元素  
dragover  
拖拽某元素在目标元素上移动时触发，这个事件对象是目标元素  
dragleave  
拖拽某元素离开目标元素时触发，这个事件对象是目标元素  
drop  
ondrop 事件在可拖动元素或选取的文本放置在目标区域时触发。  
触发顺序：  
dragstart –> dragenter –> dragover –> drop –> dragend  

## 拖动事件对象  

### dataTransfer对象  

dataTransfer对象是事件对象的一个属性，用于从被拖拽元素相放置目标传递字符串格式的数据。

因为它是事件对象的属性，所以只能在拖放事件的事件处理程序中访问dataTransfer对象。在事件处理程序中，可以使用这个对象的属性和方法来完善拖放功能。

dataTransfer对象的属性：
dropEffect（重点）
拖放的操作类型，决定了浏览器如何显示鼠标形状，可能的值为copy、move、link和none。

1. 属性作用： 用于设置目标元素将执行的操作，若属性值属于 effectAllowed 范围内，则鼠标指针将显示对应的指针样式，否则则显示禁止的指针样式。

2. 取值范围
    1. copy ：被拖拽元素将被复制到目标元素内，若属于 effectAllowed 范围内时，则鼠标指针显示复制的样式，否2. 则则显示禁止的指针样式。
    3. link ：被拖拽元素将以超链接的形式打开资源，若属于 effectAllowed 范围内时，则鼠标指针显示超链接的样式，否则则显示禁止的指针样式。
    4. move ：被拖拽元素将被移动到目标元素内，若属于 effectAllowed 范围内时，则鼠标指针显示移动的样式，否则则显示禁止的指针样式。
    5. none ：被拖拽元素不能在目标元素上作任何操作，一直显示禁止的指针样式。除了文本框外其他元素的默认值均为none

3. 注意
   1. 仅能在 dragover 事件中设置该属性值，其他事件中设置均无效
   2. 当显示禁止的指针样式时，将无法触发目标元素的 drop 事件。 通过将effectAllowed 和 dropEffect两个属性进行匹配我们就可以很简单的根据拖拽行为即将要发生的事情，来设置对应的鼠标样式了。
   
### effectAllowed（重点）

指定所允许的操作，可能的值为copy、move、link、copyLink、copyMove、linkMove、all、none和uninitialized（默认值，等同于all，即允许一切操作）。
1. 属性作用：用于设置被拖拽元素可执行的操作。
2. 取值范围:
    1. copy ，限定dropEffect的属性值为copy，否则会鼠标指针为禁止样式
    2. link ，限定dropEffect的属性值为link，否则会鼠标指针为禁止样式
    3. move ，限定dropEffect的属性值为move，否则会鼠标指针为禁止样式
    4. copyLink ，限定dropEffect的属性值为copy和link，否则会鼠标指针为禁止样式
    5. copyMove ，限定dropEffect的属性值为copy和move，否则会鼠标指针为禁止样式
    6. linkMove ，限定dropEffect的属性值为link和move，否则会鼠标指针为禁止样式
    7. all ，允许dropEffect的属性值为任意值
    8. none ，鼠标指针一直为禁止样式，不管dropEffect的属性值是什么
    9. uninitialized ，没有限定dropEffect属性的值，效果和 all 一样。

3. 注意：仅能在 dragstart 事件中设置该属性，其他事件中设置均无效。
    - files：包含一个FileList对象，表示拖放所涉及的文件，主要用于处理从文件系统拖入浏览器的文件。
    - types：储存在DataTransfer对象的数据的类型。
    - dataTransfer对象的方法：
    - setData(format, data)：在dataTransfer对象上储存数据。第一个参数format用来指定储存的数据类型，比如- text、url、text/html等。
    - getData(format)：从dataTransfer对象取出数据。
    - clearData(format)：清除dataTransfer对象所储存的数据。如果指定了format参数，则只清除该格式的数据，否则清除所有数据。
    - setDragImage(imgElement, x, y)：指定拖动过程中显示的图像。默认情况下，许多浏览器显示一个被拖动元素的半透明版本。
    - imgElement必须是一个图像元素，而不是指向图像的路径，参数x和y表示图像相对于鼠标的位置。
// 获取 container
const container = document.querySelector('.container');

const boxs = container.children;

// 瀑布流类
class WaterFall {
    constructor(container, boxs, COL=5, GAP=10) {
        this.container = container;
        this.COL = COL;
        // 判断屏幕宽度，设置列数
        if (window.innerWidth < 768) {
            this.COL = 2;
        } else if (window.innerWidth < 992) {
            this.COL = 3;
        } else if (window.innerWidth < 1200) {
            this.COL = 4;
        } else {
            this.COL = 5;
        }
        this.GAP = GAP;
        this.WIDTH = (container.offsetWidth - (COL + 1) * GAP) / COL;
        this.boxs = boxs;
        this.colHeight = new Array(COL).fill(0);
    }

    /** 静态 计算图片的偏移量
     * @param {number} height 当前图片的高度
     * @returns 返回偏移量 {x, y}
     * */
    static getImgTransform(height) {
        // 计算最小高度
        const minHeight = Math.min(...this.colHeight);
        // 计算最小高度的索引
        const minIndex = this.colHeight.indexOf(minHeight);
        // 计算偏移量
        const transform = {
            x: minIndex * (this.WIDTH + this.GAP) + this.GAP,
            y: minHeight + this.GAP
        };
        // 更新最小高度
        this.colHeight[minIndex] += height + this.GAP;
        return transform;
    }

    // 计算图片的偏移量
    init() {
        for (let i = 0; i < this.boxs.length; i++) {
            // 获取图片高度
            const height = this.boxs[i].offsetHeight;
            const width = this.boxs[i].offsetWidth;
            // 计算图片缩放比例
            const scale = this.WIDTH / width;
            // 设置图片宽度
            this.boxs[i].style.width = `${this.WIDTH}px`;
            // 设置图片高度
            this.boxs[i].style.height = `${height * scale}px`;

            // 获取偏移量
            const transform = WaterFall.getImgTransform.call(this, height * scale);
            // 设置偏移量
            this.boxs[i].style.transform = `translate(${transform.x}px, ${transform.y}px)`;
        }
    }

    // 窗口大小改变时，重新计算偏移量
    resize() {
        // 重置 宽度
        this.WIDTH = (this.container.offsetWidth - (this.COL + 1) * this.GAP) / this.COL;
        // 重置 高度
        this.colHeight = new Array(this.COL).fill(0);

        // 重新计算偏移量
        this.init();
    }
}

// 实例化瀑布流类
const waterFall = new WaterFall(container, boxs);
// 初始化
waterFall.init();

// 窗口大小改变时，重新计算偏移量
window.onresize = () => {
    // 重新获取 col 
    if (window.innerWidth < 768) {
        waterFall.COL = 2;
    } else if (window.innerWidth < 992) {
        waterFall.COL = 3;
    } else if (window.innerWidth < 1200) {
        waterFall.COL = 4;
    } else {
        waterFall.COL = 5;
    }
    waterFall.resize();
}
window.onload = init;
// 屏蔽控制台的警告
console.warn = function () { };

// 初始化
function init() {
    let root = new THREERoot({
        createCameraControls: false,   // 是否创建相机控制器
        antialias: (window.devicePixelRatio === 1),  // antialias 抗锯齿
        fov: 80  // fov 视场
    });

    // 设置渲染器的背景色
    root.renderer.setClearColor(0x000000, 0);
    // 设置渲染器的像素比
    root.renderer.setPixelRatio(window.devicePixelRatio || 1);
    // 设置相机的位置
    root.camera.position.set(0, 0, 60);

    let width = 100;
    let height = 60;

    // 创建一个 Slide 对象
    let slide1 = new Slide(width, height, 'out');   // out：当前张，马上消失
    // 创建一个 ImageLoader 对象，用于加载图片
    let l1 = new THREE.ImageLoader();
    let src1 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/winter.jpg';
    // 设置图片的跨域属性
    l1.crossOrigin = 'anonymous';
    // 加载图片
    l1.load(src1, (img) => {
        console.log(img);
        slide1.setImage(img);
    });
    // 将 slide 添加到场景中
    root.scene.add(slide1);

    let slide2 = new Slide(width, height, 'in');   // in：下一张，马上出现
    let l2 = new THREE.ImageLoader();
    let src2 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/spring.jpg';
    l2.crossOrigin = 'anonymous';
    l2.load(src2, (img) => {
        slide2.setImage(img);
    });

    root.scene.add(slide2);

    // 创建一个 TimelineMax 对象，用于控制动画
    let tl = new TimelineMax({ repeat: -1, repeatDelay: 1.0, yoyo: true });

    tl.add(slide1.transition(), 0);
    tl.add(slide2.transition(), 0);

    createTweenScrubber(tl);

    window.addEventListener('keyup', function (e) {
        if (e.keyCode === 80) {
            tl.paused(!tl.paused());
        }
    });
}

class Slide extends THREE.Mesh {
    // 构造器
    constructor(width, height, animationPhase) {
        super();
        this.width = width;
        this.height = height;
        this.animationPhase = animationPhase;
        this.init();
    }

    init() {
        // 创建一个 THREE.Group 对象，用于存放平面和图片
        let plane = new THREE.PlaneGeometry(this.width, this.height, this.width * 2, this.height * 2);
        // 创建一个 THREE.Mesh 对象，用于存放平面
        THREE.BAS.Utils.separateFaces(plane);
        // 创建一个 THREE.Mesh 对象，用于存放图片
        let geometry = new SlideGeometry(plane);

        geometry.bufferUVs();

        let aAnimation = geometry.createAttribute('aAnimation', 2);
        let aStartPosition = geometry.createAttribute('aStartPosition', 3);
        let aControl0 = geometry.createAttribute('aControl0', 3);
        let aControl1 = geometry.createAttribute('aControl1', 3);
        let aEndPosition = geometry.createAttribute('aEndPosition', 3);

        let i, i2, i3, i4, v; // 用于遍历顶点

        let minDuration = 0.4; // 最小动画时间  （0.8）
        let maxDuration = 0.8; // 最大动画时间  （1.2）
        let maxDelayX = 0.9;  // 最大x延迟时间
        let maxDelayY = 0.125; // 最大y延迟时间
        let stretch = 0.11;  // 拉伸时间

        // 总时间
        this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

        // 用于存放平面的顶点坐标
        let startPosition = new THREE.Vector3();
        let control0 = new THREE.Vector3();
        let control1 = new THREE.Vector3();
        let endPosition = new THREE.Vector3();

        let tempPoint = new THREE.Vector3();

        // 获取起始点
        function getControlPoint0(centroid) {
            let signY = Math.sign(centroid.y);

            tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
            tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
            tempPoint.z = THREE.Math.randFloatSpread(20);

            return tempPoint;
        }

        // 获取结束点
        function getControlPoint1(centroid) {
            let signY = Math.sign(centroid.y);

            tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
            tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
            tempPoint.z = THREE.Math.randFloatSpread(20);

            return tempPoint;
        }

        for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < geometry.faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
            let face = plane.faces[i];
            let centroid = THREE.BAS.Utils.computeCentroid(plane, face);

            // animation
            let duration = THREE.Math.randFloat(minDuration, maxDuration);
            let delayX = THREE.Math.mapLinear(centroid.x, -this.width * 0.5, this.width * 0.5, 0.0, maxDelayX);
            let delayY;

            if (this.animationPhase === 'in') {
                delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, this.height * 0.5, 0.0, maxDelayY)
            }
            else {
                delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, this.height * 0.5, maxDelayY, 0.0)
            }

            for (v = 0; v < 6; v += 2) {
                aAnimation.array[i2 + v] = delayX + delayY + (Math.random() * stretch * duration);
                aAnimation.array[i2 + v + 1] = duration;
            }

            // positions

            endPosition.copy(centroid);
            startPosition.copy(centroid);

            if (this.animationPhase === 'in') {
                control0.copy(centroid).sub(getControlPoint0(centroid));
                control1.copy(centroid).sub(getControlPoint1(centroid));
            }
            else { // out
                control0.copy(centroid).add(getControlPoint0(centroid));
                control1.copy(centroid).add(getControlPoint1(centroid));
            }

            for (v = 0; v < 9; v += 3) {
                aStartPosition.array[i3 + v] = startPosition.x;
                aStartPosition.array[i3 + v + 1] = startPosition.y;
                aStartPosition.array[i3 + v + 2] = startPosition.z;

                aControl0.array[i3 + v] = control0.x;
                aControl0.array[i3 + v + 1] = control0.y;
                aControl0.array[i3 + v + 2] = control0.z;

                aControl1.array[i3 + v] = control1.x;
                aControl1.array[i3 + v + 1] = control1.y;
                aControl1.array[i3 + v + 2] = control1.z;

                aEndPosition.array[i3 + v] = endPosition.x;
                aEndPosition.array[i3 + v + 1] = endPosition.y;
                aEndPosition.array[i3 + v + 2] = endPosition.z;
            }
        }

        // THREE.BAS.BasicAnimationMaterial 用于创建动画材质
        let material = new THREE.BAS.BasicAnimationMaterial(
            {
                shading: THREE.FlatShading,  // shading：着色模式
                side: THREE.DoubleSide,   // side：两面可见
                uniforms: {   // uniforms：着色器中的变量
                    uTime: { type: 'f', value: 0 } // uTime：时间，用于控制动画
                },
                shaderFunctions: [ // shaderFunctions：着色器函数，用于控制动画的进度
                    THREE.BAS.ShaderChunk['cubic_bezier'],  // 三次贝塞尔曲线
                    //THREE.BAS.ShaderChunk[(animationPhase === 'in' ? 'ease_out_cubic' : 'ease_in_cubic')],
                    THREE.BAS.ShaderChunk['ease_in_out_cubic'],
                    THREE.BAS.ShaderChunk['quaternion_rotation']
                ],
                shaderParameters: [  // shaderParameters：着色器参数
                    'uniform float uTime;',
                    'attribute vec2 aAnimation;',
                    'attribute vec3 aStartPosition;',
                    'attribute vec3 aControl0;',
                    'attribute vec3 aControl1;',
                    'attribute vec3 aEndPosition;',
                ],
                shaderVertexInit: [  // shaderVertexInit：着色器初始化
                    'float tDelay = aAnimation.x;',  // tDelay：延迟时间
                    'float tDuration = aAnimation.y;',
                    'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
                    'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
                    //'float tProgress = tTime / tDuration;'
                ],
                shaderTransformPosition: [  // shaderTransformPosition：着色器变换位置
                    (this.animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'),
                    'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);'
                ]
            },
            {
                map: new THREE.Texture(),
            }
        );
        // THREE.Mesh.call(this, geometry, material);

        // 设置纹理材质，已经继承了THREE.Mesh，所以可以直接设置材质
        this.geometry = geometry;
        this.material = material;

        this.frustumCulled = false;
    }

    setImage(image) {
        this.material.uniforms.map.value.image = image;
        this.material.uniforms.map.value.needsUpdate = true;
    };

    transition() {
        return TweenMax.fromTo(this, 3.0, { time: 0.0 }, { time: this.totalDuration, ease: Power0.easeInOut });
    };

    get time() {
        return this.material.uniforms['uTime'].value;
    }
    set time(v) {
        this.material.uniforms['uTime'].value = v;
    }
}

class SlideGeometry extends THREE.BAS.ModelBufferGeometry {
    constructor(model) {
        super(model);
        this.model = model;
        // THREE.BAS.ModelBufferGeometry.call(this, model);
    }

    bufferPositions() {
        // createAttribute 用于创建一个新的属性，例如uv，position等，itemSize是每个顶点的属性数量，例如uv是2，position是3
        let positionBuffer = this.createAttribute('position', 3).array;

        for (let i = 0; i < this.faceCount; i++) {
            let face = this.modelGeometry.faces[i];
            let centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

            let a = this.modelGeometry.vertices[face.a];
            let b = this.modelGeometry.vertices[face.b];
            let c = this.modelGeometry.vertices[face.c];

            positionBuffer[face.a * 3] = a.x - centroid.x;
            positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
            positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

            positionBuffer[face.b * 3] = b.x - centroid.x;
            positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
            positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

            positionBuffer[face.c * 3] = c.x - centroid.x;
            positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
            positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
        }
    }
}

// three的信息
class THREERoot {
    constructor(params) {

        this.params = utils.extend({
            fov: 60,
            zNear: 10,
            zFar: 100000,

            createCameraControls: true
        }, params);

        this.renderer = new THREE.WebGLRenderer({
            antialias: params.antialias,
            alpha: true
        });
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
        document.getElementById('three-container').appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
            params.fov,
            window.innerWidth / window.innerHeight,
            params.zNear,
            params.zfar
        );

        this.scene = new THREE.Scene();

        if (params.createCameraControls) {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        }

        this.resize = this.resize.bind(this);
        this.tick = this.tick.bind(this);

        this.resize();
        this.tick();

        window.addEventListener('resize', this.resize, false);
    }

    tick() {
        // console.log(this);
        this.update();
        this.render();
        requestAnimationFrame(this.tick);
    }
    update() {
        this.controls && this.controls.update();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

let utils = {
    extend: function (dst, src) {
        for (let key in src) {
            dst[key] = src[key];
        }

        return dst;
    },
    randSign: function () {
        return Math.random() > 0.5 ? 1 : -1;
    },
    ease: function (ease, t, b, c, d) {
        return b + ease.getRatio(t / d) * c;
    },
    fibSpherePoint: (function () {
        let vec = { x: 0, y: 0, z: 0 };
        let G = Math.PI * (3 - Math.sqrt(5));

        return function (i, n, radius) {
            let step = 2.0 / n;
            let r, phi;

            vec.y = i * step - 1 + (step * 0.5);
            r = Math.sqrt(1 - vec.y * vec.y);
            phi = i * G;
            vec.x = Math.cos(phi) * r;
            vec.z = Math.sin(phi) * r;

            radius = radius || 1;

            vec.x *= radius;
            vec.y *= radius;
            vec.z *= radius;

            return vec;
        }
    })(),
    spherePoint: (function () {
        return function (u, v) {
            u === undefined && (u = Math.random());
            v === undefined && (v = Math.random());

            let theta = 2 * Math.PI * u;
            let phi = Math.acos(2 * v - 1);

            let vec = {};
            vec.x = (Math.sin(phi) * Math.cos(theta));
            vec.y = (Math.sin(phi) * Math.sin(theta));
            vec.z = (Math.cos(phi));

            return vec;
        }
    })()
};

function createTweenScrubber(tween, seekSpeed) {
    seekSpeed = seekSpeed || 0.001;

    function stop() {
        TweenMax.to(tween, 1, { timeScale: 0 });
    }

    function resume() {
        TweenMax.to(tween, 1, { timeScale: 1 });
    }

    function seek(dx) {
        let progress = tween.progress();
        let p = THREE.Math.clamp((progress + (dx * seekSpeed)), 0, 1);

        tween.progress(p);
    }

    let _cx = 0;

    // desktop
    let mouseDown = false;
    document.body.style.cursor = 'pointer';

    window.addEventListener('mousedown', function (e) {
        mouseDown = true;
        document.body.style.cursor = 'ew-resize';
        _cx = e.clientX;
        stop();
    });
    window.addEventListener('mouseup', function (e) {
        mouseDown = false;
        document.body.style.cursor = 'pointer';
        resume();
    });
    window.addEventListener('mousemove', function (e) {
        if (mouseDown === true) {
            let cx = e.clientX;
            let dx = cx - _cx;
            _cx = cx;

            seek(dx);
        }
    });
    // mobile
    window.addEventListener('touchstart', function (e) {
        _cx = e.touches[0].clientX;
        stop();
        e.preventDefault();
    });
    window.addEventListener('touchend', function (e) {
        resume();
        e.preventDefault();
    });
    window.addEventListener('touchmove', function (e) {
        let cx = e.touches[0].clientX;
        let dx = cx - _cx;
        _cx = cx;

        seek(dx);
        e.preventDefault();
    });
}
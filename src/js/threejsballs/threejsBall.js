import React, {Component} from 'react';
import styles from 'css/threejsballs/main.css';
import * as THREE from 'three';

class ThreejsBall extends Component {
    state = {
        renderer: null,
        width: window.innerWidth - 10,
        height: window.innerHeight - 10,
        camera: null,
        scene: null,
        light: null,

    }
    componentDidMount() {

        // this.initBaseThreejsBall();
        this.initStructuredThreejsLine();
    }

    

    // Lesson 2 . 渲染结构化的threejs的线
    initStructuredThreejsLine() {
        let renderer = this.initRenderer();
        let camera = this.initCamera(this.state.width, this.state.height);
        let scene = this.initScene();
        let light = this.initLight(scene);
        this.initLineObject(scene);
        this.initCoordinateSystem(scene);
        renderer.clear();
        renderer.render(scene, camera);
    }

    // 初始化渲染器
    initRenderer() {
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(this.state.width, this.state.height);
        const container = this.refs.canvasContainer;
        if(container) {
            container.appendChild(renderer.domElement);
        }else {
            console.log('缺失容器元素');
        }
        renderer.setClearColor(0xFFFFFF, 1.0);
        this.state.renderer = renderer;
        return renderer;
    }

    // 初始化摄像机
    initCamera(width, height) {
        let camera = new THREE.PerspectiveCamera(75, width/height, 1, 1000);
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 100;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt(new THREE.Vector3(0,0,0))
        this.state.camera = camera;
        return camera;
    }

    // 初始化场景
    initScene() {
        let scene = new THREE.Scene();
        this.state.scene = scene;
        return scene;
    }

    // 初始化灯光
    initLight(scene) {
        let light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 100);
        scene.add(light);
        this.state.light = light;
        return light;
    }

    initLineObject(scene) {
        let geometry = new THREE.Geometry();
        /*
         * LineBasicMaterial( parameters )
         * Parameters是一个定义材质外观的对象，它包含多个属性来定义材质，这些属性是：
         * Color：线条的颜色，用16进制来表示，默认的颜色是白色。
         * Linewidth：线条的宽度，默认时候1个单位宽度。
         * Linecap：线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。
         * Linejoin：两个线条的连接点处的外观，默认是“round”，表示圆角。
         * VertexColors：定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。
         * Fog：定义材质的颜色是否受全局雾效的影响。
         */
        let material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });
        let color1 = new THREE.Color(0x0000FF),
        color2 = new THREE.Color(0xFF0000);

        // 线的材质可以由两点的颜色决定
        let p1 = new THREE.Vector3( -100, 0, 100),
        p2 = new THREE.Vector3( 100, 10, -100);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.colors.push(color1, color2);

        let line = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line);
    }

    initCoordinateSystem(scene) {
        let material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors
        });
        let color1 = new THREE.Color(0x111111),
        color2 = new THREE.Color(0xFFFFFF);
        let p0 = new THREE.Vector3( 0, 0, 0),
        px = new THREE.Vector3( 100, 0, 0),
        py = new THREE.Vector3( 0, 100, 0),
        pz = new THREE.Vector3( 0, 0, 100),
        ps = [px, py, pz];

        for(let i=0, iLen=ps.length; i<iLen; i++) {
            let geometry = new THREE.Geometry();
            geometry.vertices.push(p0);
            geometry.vertices.push(ps[i]);
            geometry.colors.push(color1, color2);
            let line = new THREE.Line(geometry, material, THREE.LinePieces);
            scene.add(line);
        }
    }


    // Lesson 1 . 渲染简单的threejs构造的球
    initBaseThreejsBall() {
        // 创建场景
        var scene = new THREE.Scene();
        // 创建摄像头
        /* PerspectiveCamera(fov, aspect, near, far)
         * Fov – 相机的视锥体的垂直视野角
         * Aspect – 相机视锥体的长宽比
         * Near – 相机视锥体的近平面
         * Far – 相机视锥体的远平面
         */
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        // 创建渲染器
        var renderer = new THREE.WebGLRenderer();
        // 设置渲染器大小
        renderer.setSize( window.innerWidth, window.innerHeight );
        const container = this.refs.canvasContainer;
        if(container) {
            container.appendChild(renderer.domElement);
        }else {
            console.log('缺失容器元素');
        }
        // 添加物体到场景中
        // var geometry = new THREE.CubeGeometry(1, 1, 1);
        var geometry = new THREE.SphereGeometry(2, 8, 8);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        // 
        camera.position.z = 5;
        function render() {
            var raf = window.requestAnimationFrame(render);
            // cube.rotation.x += 0.1;
            cube.rotation.y += 0.05;
            /* render( scene, camera, renderTarget, forceClear )
             * renderTarget：渲染的目标，默认是渲染到前面定义的render变量中
             * forceClear：每次绘制之前都将画布的内容给清除，即使自动清除标志autoClear为false，也会清除。
             */
            renderer.render(scene, camera);
            console.log(raf);
        }
        render();
    }
    render() {
        return (<div ref="canvasContainer" style={{padding: '3px'}}></div>);
    }
}
export default ThreejsBall
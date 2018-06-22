import React, {Component} from 'react';
import styles from 'css/threejsballs/main.css';
import * as THREE from 'three';

class ThreejsBall extends Component {
    componentDidMount() {

        this.initBaseThreejsBall();
    }

    // 渲染拆解的threejs构造的球
    initSeparateThreejsBall() {
        
    }

    getRenderer() {
        
    }

    // 渲染简单的threejs构造的球
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
        // 添加物体
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
        return (<div ref="canvasContainer"></div>);
    }
}
export default ThreejsBall
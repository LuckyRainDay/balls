import React, {Component} from 'react';
import styles from 'css/threejsballs/main.css';
import * as THREE from 'three';

class ThreejsBall extends Component {
    componentDidMount() {
        // 创建画布
        var scene = new THREE.Scene();
        // 创建摄像头
        /* PerspectiveCamera(fov, aspect, near, far)
         * Fov – 相机的视锥体的垂直视野角
         * Aspect – 相机视锥体的长宽比
         * Near – 相机视锥体的近平面
         * Far – 相机视锥体的远平面 */
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
        var geometry = new THREE.SphereGeometry(2, 32, 8);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        // 
        camera.position.z = 5;
        function render() {
            var raf = window.requestAnimationFrame(render);
            // cube.rotation.x += 0.1;
            cube.rotation.y += 0.01;
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
import React, {Component} from 'react';
import styles from 'css/threejsballs/main.css';
import * as THREE from 'three';

class ThreejsBall extends Component {
    componentWillMount() {
        // var scene = new three.Scene();
        // var camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        // var renderer = new three.WebGLRenderer();

        // renderer.setSize( window.innerWidth, window.innerHeight );
        var scene = new THREE.Scene();
    }

    render() {
        return <div>
            <canvas id="main-canvas" className={styles["main-canvas"]}></canvas>
        </div>;
    }
}
export default ThreejsBall
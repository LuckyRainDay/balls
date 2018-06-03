import React, {Component} from 'react';
import styles from 'css/baseballs/main.css';
import {dropBall} from './utils'
import {Ball} from './ball'

class BaseBall extends Component {
    initBaseBallCancas() {
        var canvas = document.getElementById('main-canvas');
        canvas.width = 900;
        canvas.height= 900;
        var context = canvas.getContext('2d');
        context.scale(0.5, 0.5);
        // dropBall(context, 10, 10, 10);
        var ball = new Ball(context, 10, 10, 10);
        ball.setGravity(true);
        ball.setAnimationBefore(function(){
            context.clearRect(0, 0, 1800, 1800);
        });
        ball.start();
    }
    componentDidMount() {
        this.initBaseBallCancas();
    }

    render() {
        return <canvas id="main-canvas" class={styles["main-canvas"]}></canvas>;
    }
}
export default BaseBall
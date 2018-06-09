import React, {Component} from 'react';
import styles from 'css/baseballs/main.css';
import {dropBall} from './utils'
import {Ball} from './ball'

class BaseBall extends Component {
    initBaseBallCancas() {
        const width = 900;
        const height = 900;
        const scale = 0.5;

        var canvas = document.getElementById('main-canvas');
        canvas.width = width;
        canvas.height= height;
        var context = canvas.getContext('2d');
        context.scale(scale, scale);
        // dropBall(context, 10, 10, 10);
        var ball = new Ball(context, 100, 10, 10);
        ball.setGravity(true);
        ball.setAnimationBefore(function(){
            context.clearRect(50, 0, 150, 1800);
        });
        this.setStepCallback(ball, width/scale, height/scale);
        ball.start();
    }
    setStepCallback(ball, width, height) {
        ball.setStepCallback(function(currentTimestamp) {
            // 这里的this为ball
            if(this.y+this.radius >= height) {
                this.velocity.y = -0.9 * Math.abs(this.velocity.y);
                if(Math.abs(this.velocity.y) < 5) {
                    this.stop();
                }
            }
        });
    }
    componentDidMount() {
        this.initBaseBallCancas();
    }

    render() {
        return <canvas id="main-canvas" class={styles["main-canvas"]}></canvas>;
    }
}
export default BaseBall
import React, {Component} from 'react';
import styles from 'css/baseballs/main.css';
import {Ball} from './ball'

class BaseBall extends Component {
    state = {
        widthCanvas: window.innerWidth - 50,
        heightCanvas: window.innerHeight - 50,
        scaleCanvas: 0.5
    }
    
    initBaseBallCancas() {
        var canvas = document.getElementById('main-canvas');
        canvas.width = this.state.widthCanvas;
        canvas.height= this.state.heightCanvas;
        canvas.style.width = this.state.widthCanvas + 'px';
        canvas.style.height = this.state.heightCanvas + 'px';
        var context = canvas.getContext('2d');
        context.scale(this.state.scaleCanvas, this.state.scaleCanvas);

        this.dropBall(context, 100, 10, 10);
    }

    dropBall(context, x, y, radius) {
        const width = this.state.widthCanvas / this.state.scaleCanvas;
        const height = this.state.heightCanvas / this.state.scaleCanvas;

        var ball = new Ball(context, x, y, radius);
        ball.setGravity(true);
        ball.setAnimationBefore(function(){
            context.clearRect(0, 0, width, height);
        });
        this.setStepCallback(ball, width, height);
        ball.start();
    }

    setStepCallback(ball, width, height) {
        ball.setStepCallback(function(currentTimestamp) {
            // 这里的this为ball
            if(this.y+this.radius >= height) {
                this.velocity.y = -0.9 * Math.abs(this.velocity.y);
                if(Math.abs(this.velocity.y) < 5) {
                    console.log(this);
                    this.stop();
                }
            }
        });
    }

    componentDidMount() {
        this.initBaseBallCancas();
    }

    render() {
        return <div>
            <canvas id="main-canvas" className={styles["main-canvas"]}></canvas>
        </div>;
    }
}
export default BaseBall
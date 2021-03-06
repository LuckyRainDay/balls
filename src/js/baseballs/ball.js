const GRAVITY = 500;
const GRAVITY_ANIMATION = 'gravity_animation';

export class Ball {
    /*
     * 初始化Ball类
     * Args:
     *  context: 画笔对象
     *  x,y : Ball起始坐标
     *  radius: Ball半径
    */
    constructor(context, x, y, radius, isHidden) {
        this.context = context;
        this.radius =  typeof radius === 'number' ? radius : 10;
        this.x = typeof x === 'number' ? x : radius;
        this.y = typeof y === 'number' ? y : radius;
        this.animate = {};
        this.velocity = {x:0, y:0, z:0};
        this.cacheCanvas = document.createElement("canvas");
        this.cacheCtx = this.cacheCanvas.getContext("2d");
        if(!isHidden) {
            this.show();
        }
    }

    setStepCallback(callback) {
        if(typeof callback === 'function') {
            this.stepCallback = callback;
        }
    }

    show() {
        const context = this.context;
        if(this.isLegalContext(context)) {
            context.beginPath();
            context.fillStyle = 'green';
            context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            context.fill();
        }
    }

    hide() {
        const context = this.context;
        if(this.isLegalContext(context)) {
            context.clearRect(this.x-this.radius, this.y-this.radius, this.x+this.radius, this.y+this.radius);
        }
    }

    setGravity(isGravity, animateGravity) {
        this.isGravity = isGravity;
        if(isGravity) {
            if(typeof animateGravity === 'function') {
                this.animate[GRAVITY_ANIMATION] = animateGravity;
            }else {
                this.animate[GRAVITY_ANIMATION] = this.animateGravity;
            }
            
        }else {
            this.animate[GRAVITY_ANIMATION] = void 0;
        }
    }

    animateGravity(lastTimestamp, currentTimestamp) {
        // 如果两次调用时间间隔大于50ms，则不做处理，维持原状态
        if(currentTimestamp - lastTimestamp > 50) {
            // 防止窗口长时间失焦时，小球运动不受控制。
            return ;
        }
        var gap = (currentTimestamp - lastTimestamp) / 1000;
        const velocityInc = gap * GRAVITY;
        this.y += (this.velocity.y + velocityInc/2) * gap;
        this.velocity.y += velocityInc;
        console.log('y = '+this.y + 
            '; velocity.y = '+this.velocity.y + 
            '; velocityInc = '+velocityInc + 
            '; lastTimestamp = '+lastTimestamp + 
            '; currentTimestamp = '+currentTimestamp);
    }

    start() {
        const _this = this;
        /*
         * requestAnimationFrame在MacOS的Safari中，window失去焦点时（比如：切换tab、切换到其他分屏），
         * requestAnimationFrame的回调函数不会按照显示屏的刷新帧率调用，而是停止调用，知道再次聚焦时，
         * 才会恢复正常的回调。
         */
        this.raf = window.requestAnimationFrame(function(timestamp) {
            _this.step.call(_this, timestamp, _this.stepCallback);
            _this.show();
        });
    }

    stop() {
        window.cancelAnimationFrame(this.raf);
    }

    step(currentTimestamp, stepCallback) {
        // 记录当前时间
        const lastTimestamp = this.lastTimestamp;
        this.lastTimestamp = currentTimestamp;

        // 启动下一帧
        this.start();

        // 如果这是第一帧则不做动画
        if(typeof lastTimestamp !== 'number') {
            return ;
        }

        // 运行动画队列
        const _this = this;
        if(this.isAnimationBefore()) {
            this.animationBefore();
        }
        for(var key in this.animate) {
            const animate = this.animate[key];
            if(typeof animate === 'function') {
                animate.call(_this, lastTimestamp, currentTimestamp);
            }
        }
        if(typeof stepCallback === 'function') {
            stepCallback.call(this, currentTimestamp);
        }
    }

    isAnimationBefore() {
        return typeof this.animationBefore === 'function';
    }

    setAnimationBefore(animationBefore) {
        if(typeof animationBefore === 'function') {
            this.animationBefore = animationBefore;
        }
    }

    isLegalContext(context) {
        return context && (context instanceof CanvasRenderingContext2D);
    }


}
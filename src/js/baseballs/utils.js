/* 
 * 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
 * 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值。
 * 明度（V），亮度（L），取0-100%。
 * 0 <= h, s, v <= 1
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function getRandomColor(seed, isReverse) {

}

export function dropBall(context, x, y, radius, isGravity, isbound) {
    if(!context) {
        return;
    }
    // 初始化变量
    radius = radius || 10;
    x = x || radius;
    y = y || radius;
    
    context.beginPath();
    context.fillStyle = 'green';
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fill();
}

export function setBallGravity() {
    
}
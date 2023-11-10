const card = document.querySelector('.card');

function barHeight() {
    return window.outerHeight - window.innerHeight;
}

function clientToScreen(x, y) {
    const screenX = x + window.screenX;
    const screenY = y + window.screenY + barHeight();
    return [screenX, screenY];
}

function screenToClient(x, y) {
    const clientX = x - window.screenX;
    const clientY = y - window.screenY - barHeight();
    return [clientX, clientY];
}

const channel = new BroadcastChannel('card');

// 其他窗口收到的信息
channel.onmessage = (e) => {
    // 将屏幕坐标转换为视口坐标
    const clientPoints = screenToClient(...e.data);
    // 重新设置元素的偏移量，保证不同视口的img元素在屏幕坐标系中其实是重合的
    card.style.left = clientPoints[0] + 'px';
    card.style.top = clientPoints[1] + 'px';

};

// e：鼠标点击这个点的视口坐标（浏览器视口内部的坐标）
card.onmousedown = (e) => {
    // 鼠标点击的点在img元素的位置；offsetLeft和offsetTop是指元素左上角相对于视口的坐标
    let x = e.pageX - card.offsetLeft;
    let y = e.pageY - card.offsetTop;
    // 移动后的鼠标点的位置
    window.onmousemove = (e) => {
        // 移动后的新的img左上角相对视口的坐标
        const cx = e.pageX - x;
        const cy = e.pageY - y;
        card.style.left = cx + 'px';
        card.style.top = cy + 'px';
        // 将视口坐标转换为屏幕坐标
        const screenPoints = clientToScreen(cx, cy);
        channel.postMessage(screenPoints);
    };
    window.onmouseup = (e) => {
        window.onmousemove = null;
        window.onmouseup = null;
    };
};

function init() {
    const url = new URL(location.href);
    const type = url.searchParams.get('type') || 'Q';
    card.src = `../static/img/${type}.png`;
}

init();
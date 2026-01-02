
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
var num_points = width * height / 9000;

canvas.width = width;
canvas.height = height;
canvas.style.position = 'fixed';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

var points = [];

function Point(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
}

Point.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
};

Point.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
        this.vx = -this.vx;
    }

    if (this.y < 0 || this.y > height) {
        this.vy = -this.vy;
    }
};

function init() {
    for (var i = 0; i < num_points; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var radius = Math.random() * 2 + 1;
        var color = 'rgba(230, 194, 191, 0.5)';
        points.push(new Point(x, y, radius, color));
    }
}

function animate() {
    context.clearRect(0, 0, width, height);

    for (var i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw();
    }

    requestAnimFrame(animate);
}

init();
animate();

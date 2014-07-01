(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
  window.requestAnimFrame = window.requestAnimationFrame;

  var gravity = 0.4
  // canvas and context
  var canvas
  var ctx
  var football
  var ballimage

  function Ball (ballimage, options) {
    this.vy = 0
    this.vx = 3
    this.vyAdjust = -13
    this.vxAdjust = 10
    this.width = options.width
    this.height = options.height
    this.x = options.left
    this.y = options.top
    this.ballimage = ballimage
    this.bounceFactor = options.factor
  }

   Ball.prototype.draw = function () {
    ctx.drawImage(this.ballimage,
      0, 0,
      100, 100,
      this.x, this.y,
      this.width, this.height
    )
  }

  Ball.prototype.hit = function () {
    this.vy = this.vyAdjust
  }

  Ball.prototype.move = function () {
    this.y += this.vy
    this.vy += gravity

    if ((this.y + this.height) > canvas.height) {
      this.hit()
      this.vyAdjust = (this.vyAdjust * this.bounceFactor)
      if (this.vx) {
        this.vx = this.vx - 0.5
      }
    }

    if ((this.x + this.width) < canvas.width - 50) {
      if (this.vx) {
        this.x += this.vx
      }
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function update() {
    clearCanvas()
    football.move()
    football.draw()
  }

  function loop() {
    update()
    window.requestAnimFrame(loop)
  }

  function loadball() {
    var iBallTop
    var top = (0 - Math.floor((Math.random() * 10) + 1))

    football = new Ball(ballimage, {
      factor: 0.65,
      top: top,
      left: 0,
      height: 100,
      width: 100
    })

    loop()
  }

  function init() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    ballimage = new Image()
    ballimage.onload = loadball
    ballimage.src = 'football.png'
  }

  window.addEventListener('load', function () {
    init()
  }, false)
}());
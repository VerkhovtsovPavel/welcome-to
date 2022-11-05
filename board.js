const urlParams = new URLSearchParams(window.location.search);
const game = urlParams.get('game');

var canvas;

var drawHistory = {
    undoList: [],

    saveState: function() {
      this.undoList.push(canvas.toDataURL());   
    },

    undo: function() {
      if(this.undoList.length) {
        var restore_state = this.undoList.pop();
        var image = new Image()
        image.src = restore_state
        drawer.drawImage(image)
      }
    }
}

var dice = {
    sides: 6,
    roll: function () {
        var randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
    }
}

var drawer = {
    lastX: 0,
    lastY: 0,
    mousePressed: false,
    strokeStyle: "",
    lineWidth: "",
    canvasContext: null,


    init: function() {
        this.canvasContext = canvas.getContext('2d');
        this.updateOptions();
    },

    updateOptions: function() {
        var valueFromSelect = function(id) {
            var select = document.getElementById(id);
            return select.options[select.selectedIndex].value;
        }

        this.strokeStyle = valueFromSelect('color')
        this.lineWidth = valueFromSelect('width')
    },

    start: function() {
        this.mousePressed = true;
    },

    stop: function() {
        this.mousePressed = false;
    },

    draw: function (pageX, pageY, isDown) {
        if (this.mousePressed) {
            x = pageX - canvas.offsetLeft;
            y = pageY - canvas.offsetTop;
            if (isDown) {
                this.canvasContext.beginPath();
                this.canvasContext.strokeStyle = this.strokeStyle
                this.canvasContext.lineWidth = this.lineWidth
                this.canvasContext.lineJoin = "round";
                this.canvasContext.moveTo(this.lastX, this.lastY);
                this.canvasContext.lineTo(x, y);
                this.canvasContext.closePath();
                this.canvasContext.stroke();
            }
            this.lastX = x;
            this.lastY = y;
        }
    },  

    drawImage: function (image) {
        if(!image) {
            var image = new Image();
            image.src = game+'-map.png';
        }
        let context = this.canvasContext
        image.onload = function () {
            context.drawImage(image, 0, 0, 1091, 711);
        }    
    }  
}

function init() {
    canvas = document.getElementById('canvas')
    let undo = document.getElementById('undo')
    let clear = document.getElementById('clear')
    let color = document.getElementById('color')
    let width = document.getElementById('width')
    let button = document.getElementById('button');
    
    canvas.addEventListener('mousedown', function (e) {
        drawer.start()
        drawer.draw(e.pageX, e.pageY, false);
        drawHistory.saveState();
    });

    canvas.addEventListener('mousemove', function (e) {
        drawer.draw(e.pageX, e.pageY, true);
    });

    canvas.addEventListener('mouseup' ,function (e) {
        drawer.stop()
    });

    canvas.addEventListener('mouseleave', function (e) {
        drawer.stop()
    });

    undo.addEventListener('click', function () {
        drawHistory.undo();
    });

    clear.addEventListener('click', function () {
        drawer.drawImage();
    });

    color.addEventListener('change', function() {
        drawer.updateOptions()
    });

    width.addEventListener('change', function() {
        drawer.updateOptions()
    });

    button.onclick = function() {
        var result = dice.roll();
        var placeholder = document.getElementById('placeholder');
        placeholder.innerHTML = result;
    };

    drawer.init();
    drawer.drawImage();
}
var mousePressed = false;
var lastX, lastY;
var ctx;
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
        drawImage(image)
      }
    }
  }

function init() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) {
        mousePressed = true;
        mouseX = e.pageX - $(this).offset().left;
        mouseY = e.pageY - $(this).offset().top
        draw(mouseX, mouseY, false);
        drawHistory.saveState();
    });

    $('#canvas').mousemove(function (e) {
        if (mousePressed) {
            mouseX = e.pageX - $(this).offset().left;
            mouseY = e.pageY - $(this).offset().top
            draw(mouseX, mouseY,  true);
        }
    });

    $('#canvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#canvas').mouseleave(function (e) {
        mousePressed = false;
    });

    $('#undo').click(function () {
        undoLast();
    });
    drawImage();
}

function drawImage(image) {
    if(!image) {
        var image = new Image();
        //image.crossOrigin = "Anonymous";
        image.src = 'map.png';
    }
    $(image).load(function () {
        ctx.drawImage(image, 0, 0, 1091, 711);
    });    
}

function undoLast() {
    drawHistory.undo();
}    

function draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}
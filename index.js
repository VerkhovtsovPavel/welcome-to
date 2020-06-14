class Game {
  constructor(icon, path) {
    this.icon = icon;
    this.path = path;
  }
}

var data = [new Game("raging-bulls-icon.png", "board.html?game=raging-bulls"),
            new Game("solo-tower-hack-logo.png", "board.html?game=solo-tower-hack"),
            new Game("welcome-to-icon.jpg", "board.html?game=welcome-to")];

var perRow = 2,
    count = 0,
    table = document.createElement("table"),
    row = table.insertRow();

  for (var i of data) {
    var cell = row.insertCell();
    var image = document.createElement("img");
    image.src = i.icon
    cell.appendChild(image);

    cell.addEventListener("click", (function(path) {
      return function () {
        window.location.href = path;
      }
    }(i.path)));

    count++;
    if (count%perRow==0) {
      row = table.insertRow();
    }
  }

function init() {
  document.getElementById("container").appendChild(table);
}
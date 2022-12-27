const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);

// ejecuta la funcion de render sin recargar el navegador
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('height', canvasSize);
  canvas.setAttribute('width', canvasSize);
  elementSize = (canvasSize / 10) - 2;
  startGame();
}
function startGame() {
  game.font = elementSize + 'px Verdana';
  game.textAlign = 'center';

  const map = maps[2];
  //.trim() funciona para eliminar los espacios vacios al inicio y al final
  //.split('\n') funciona para identificar los saltos de lineas y hacerlos strings independientes
  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map(row => row.trim().split(''))
  console.log({ map, mapRows, mapRowsCols });

  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);
      game.fillText(emoji, posX, posY);
    });
  });

  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowsCols[row - 1][col - 1]], elementSize * col, elementSize * row);

  //   }

  // }


  //game.fillRect(0, 50, 100, 100);
  // game.clearRect(50, 50, 50, 50);

  // game.font = "25px Verdana";
  // game.fillStyle = "blue";
  // game.textAlign = "center";
  // game.fillText("Carlos", 100, 100)
}



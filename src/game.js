const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
//buttons
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRigth = document.querySelector('#right');
const btnDown = document.querySelector('#down');

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

//eventos de teclado
window.addEventListener('keydown', moveByKeys);
//eventos botones en pantalla
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRigth.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//funcion evento teclado
function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();

}
//funcion para moviento 
function moveUp() {
  console.log('te moviste hacia arriba');
}
function moveLeft() {
  console.log('te moviste hacia la izquierda');
}
function moveRight() {
  console.log('te moviste hacia la derecha');
}
function moveDown() {
  console.log('te moviste hacia abajo');
}
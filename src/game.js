const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
//buttons
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRigth = document.querySelector('#right');
const btnDown = document.querySelector('#down');
//items
let livesSpan = document.querySelector('#lives');
let timeSpan = document.querySelector('#time');
let recordSpan = document.querySelector('#record');
let pResult = document.querySelector('#result');
//
let finalDiv = document.querySelector('#final-div');
let finalP = document.querySelector('#finalP');
let btnReiniciar = document.querySelector('#btn-reiniciar');
let boomDisplay = document.querySelector('#boomDisplay');


let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let enemyPosition = [];


window.addEventListener('load', setCanvasSize);

// ejecuta la funcion de render sin recargar el navegador
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed(0))
  canvas.setAttribute('height', canvasSize);
  canvas.setAttribute('width', canvasSize);
  elementSize = (canvasSize / 10) - 2;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}
function startGame() {
  boomDisplay.style.display = 'none'
  game.font = elementSize + 'px Verdana';
  game.textAlign = 'center';

  const map = maps[level];

  if (!map) {
    gameWinAndSetRecord();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100)
    showRecord();
  }

  //.trim() funciona para eliminar los espacios vacios al inicio y al final
  //.split('\n') funciona para identificar los saltos de lineas y hacerlos strings independientes
  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map(row => row.trim().split(''))

  showLives();

  enemyPosition = []
  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {
        enemyPosition.push({
          x: posX, y: posY
        })
      }

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
  movePlayer();
}

//render del player
function movePlayer() {
  const giftCollisionX = Number(playerPosition.x.toFixed(3)) == Number(giftPosition.x.toFixed(3));
  const giftCollisionY = Number(playerPosition.y.toFixed(3)) == Number(giftPosition.y.toFixed(3));
  const giftCollision = giftCollisionX && giftCollisionY;
  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPosition.find(enemy => {
    const enemyCollisionX = Number(enemy.x.toFixed(3)) == Number(playerPosition.x.toFixed(3));
    const enemyCollisionY = Number(enemy.y.toFixed(3)) == Number(playerPosition.y.toFixed(3));
    return enemyCollisionX && enemyCollisionY;
  });
  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
//ganar nivel
function levelWin() {
  //console.log('subiste de nivel');
  level++
  startGame();
}
//rgameWinAndSetRecordeiniciar juego tras collision
function levelFail() {
  //console.log('chocaste con un enemigo');
  boomDisplay.style.display = 'flex'
  console.log(lives);
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
    endDisplay(2)
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  setTimeout(startGame, 300);
}
//ganar Juego
function gameWinAndSetRecord() {
  //console.log('terminaste el juego');
  clearInterval(timeInterval);
  const playerTime = Date.now() - timeStart;

  const recordTime = localStorage.getItem('record_time');
  if (recordTime) {
    if (recordTime > playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'SUPERTASTE EL RECORD';
    } else {
      pResult.innerHTML = 'no superaste el record';
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.innerHTML = 'Excelente, acabas de marcar tu primer record, trata de superarte!'

  }
  // console.log({ recordTime, playerTime });
  endDisplay(1);
}
//pantalla de victoria
function endDisplay(n) {
  finalDiv.style.display = 'flex'

  if (n === 1) {
    finalP.innerHTML = 'GANASTE'
  } else if (n === 2) {
    finalDiv.style.backgroundColor = 'var(--lose)'
    finalP.innerHTML = 'PERDISTE'
    return
  }

}
//reload
btnReiniciar.addEventListener('click', event => location.reload())

//manipulacion de vidas
function showLives() {
  const heartArr = Array(lives).fill(emojis['HEART'])// [crea un arra con las posiciones que diga la variable lives]
  livesSpan.innerHTML = '';
  heartArr.forEach(heart => livesSpan.append(heart))
  //livesSpan.innerHTML = heartArr

}
function showTime() {
  timeSpan.innerHTML = Date.now() - timeStart
}
function showRecord() {
  recordSpan.innerHTML = localStorage.getItem('record_time')
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
  // console.log('te moviste hacia arriba');

  if ((playerPosition.y - elementSize) < elementSize) {
    console.log('out');
  } else {
    playerPosition.y -= elementSize;
    startGame();

  }
}
function moveLeft() {
  // console.log('te moviste hacia la izquierda');
  if ((playerPosition.x - elementSize) < elementSize) {
    console.log('out');
  } else {
    playerPosition.x -= elementSize;
    startGame();

  }
}
function moveRight() {
  // console.log('te moviste hacia la derecha');
  if ((playerPosition.x + elementSize) > canvasSize) {
    console.log('out');
  } else {
    playerPosition.x += elementSize;
    startGame();

  }
}
function moveDown() {
  //console.log('te moviste hacia abajo');
  if ((playerPosition.y + elementSize) > canvasSize) {
    console.log('out');
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}
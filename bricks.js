var nbBricksY = [3, 7];
var nbBricksX = [5, 8];
var bricksWidth = 10;
var bricksHeight = 20;
var bricksPaddingX = 15;
var bricksPaddingY = 10;
bricksWidth = ctx.canvas.width / bricksWidth;
bricksHeight = ctx.canvas.height /  bricksHeight;

var startX = 0;
var startY = 0;

var bricksX = [];
var bricksY = [];
function setBricks() {
  bricksX = [];
  bricksY = [];
  startX = canvas.width / 2 - nbBricksX[level]/2 * (bricksWidth + bricksPaddingX) + bricksPaddingX/2;
  startY = 50;
  ballSpeedIncrease = (finalBallSpeed - ballSpeed) / (nbBricksY[level] * nbBricksX[level]);
  for (var ly = 0; ly < nbBricksY[level]; ly++ ) {
    for (var lx = 0; lx < nbBricksX[level]; lx++) {

        brickX = startX + lx * (bricksWidth + bricksPaddingX);
        brickY = startY + ly * (bricksHeight + bricksPaddingY);

        bricksX.push(brickX);
        bricksY.push(brickY);
      }
    }
    maxScore += nbBricksX[level] * nbBricksY[level] * pointsPerBrick;
}
setBricks();


var colorIndex = 0;
function drawBricks() {
  colorIndex = 0;
  for (var i = 0; i < bricksX.length; i++) {
    if (i % nbBricksX[level] == 0 && i != 0) {
      colorIndex += 1;
    }
    if (bricksX[i] == -1 || bricksY[i] == -1) {
      continue;
    }
    ctx.beginPath();
    ctx.rect(
      bricksX[i],
      bricksY[i],
      bricksWidth,
      bricksHeight
    );
    ctx.fillStyle = colors[colorIndex];
    ctx.fill();
    ctx.closePath();
  }
}

function collisionChecker() {
  colorIndex = 0;
  for (var i = 0; i < bricksX.length; i++) {
    if (i % nbBricksX[level] == 0 && i != 0) {
      colorIndex += 1;
    }
    if (bricksX[i] == -1 || bricksY[i] == -1) {
      continue;
    }
    if (y + dy < bricksY[i] + bricksHeight) {
      if (y + dy + ballRadius > bricksY[i])
        if (x + dx + ballRadius > bricksX[i]) {
          if (x + dx < bricksX[i] + bricksWidth) {
            if (x < bricksX[i]) {
              dx = -1;
            } else if (x > bricksX[i] + bricksWidth) {
              dx = 1;
            } else  {
              dy = -dy;
            }
              bricksX[i] = -1;
              bricksY[i] = -1;
              //bricksX.splice(i, 1);
              //bricksY.splice(i, 1);

              ballSpeed += ballSpeedIncrease;
              increaseScore();
              for (var i = 0; i < settings.density; i++) {
                new Particle(x, y, colors[colorIndex]);
              }

              playSound(bip1);
          }
        }
    }

    /*if (x + dx + ballRadius > bricksX[i] &&
      x + dx < bricksX[i] + bricksWidth &&
      y + dy  + ballRadius > bricksY[i] &&
      y + dy < bricksY[i] + bricksHeight) {
        bricksX.splice(i, 1);
        bricksY.splice(i, 1);

        console.log(x + " " + (bricksX[i] - bricksWidth));

        if (x < bricksX[i] - bricksWidth) {
          dx = -1;
        } else if (x > bricksX[i]) {
          dx = 1;
        }
        dy = -dy;
    }*/
  }
}

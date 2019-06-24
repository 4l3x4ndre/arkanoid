var isGameOver = false;
var isVictory = false;
var isWaitingforContinue = true;
var waitForReloadSpace = false;
var hasStarted = false;
var startLife = 3;
var life = startLife;
var score = 0;
var drawVictoryParticle = true;
var level = 0;
var maxScore = 0;

function drawStats() {
 ctx.font = textSize + "px Arial";
 ctx.fillStyle = statsColor;
 ctx.textAlign = "left";
 var lifetext = "Life " + life;
 var scoretext = "Score " + score;
 ctx.fillText(lifetext, 10, 50);
 ctx.fillText(scoretext, 10, 90);
}

function gameOver() {
  ctx.font = textSize + "px Arial";
  ctx.fillStyle = gameOverColor;
  ctx.textAlign = "center";
  ctx.fillText("You loose", canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText("Press space to restart", canvas.width / 2, canvas.height / 2 + 60);
  dx = 0;
  dy = 0;
  paddleDx = 0;
  isGameOver = true;
  waitForReloadSpace = true;
}


function showText(text) {
  ctx.font = textSize + "px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  for (var i = 0; i < text.length; i++) {
    ctx.fillText(text[i], canvas.width / 2, canvas.height / 2 + 60 * i);
  }

}

function looseLife() {
  if (life - 1 > 0) {
    life --;
    isWaitingforContinue = true;
    resetObjectsPosition();
    playSound(bipLooseLife);
  } else {
    playSound(bipGameOver);
    life = 0;
    gameOver();
  }
}

function resetObjectsPosition() {
  paddleX = (canvas.width - paddleWidth)/2;
  launchBall();
  dx = 0;
  dy = 0;
  paddleDx = 0;
}

function increaseScore() {
  score += pointsPerBrick;
  if (score >= maxScore) {
    victoryHandler();
    console.log("Victory");
  }
}

function victoryHandler() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i in particles) {
    particles[i].draw();
  }
  if (level + 1 >= nbBricksX.length) {
    var t = ["Victory", "Press space to restart"];
    waitForReloadSpace = true;
  } else {
    isWaitingforContinue = true;
    var t = ["Victory", "Press space to continue"]
  }
  showText(t);
  drawStats();
  isVictory = true;
}

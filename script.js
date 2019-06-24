var rightPressed;
var leftPressed;

function keyDownHandler(event) {
  if (event.keyCode == 32) {
    if (waitForReloadSpace) {
      document.location.reload();
      return;
    } else if (isWaitingforContinue) {
      if (isVictory && level + 1 < nbBricksX.length) {
        isVictory = false;
        level += 1;
        life = startLife;
        resetObjectsPosition();
        ballSpeed = startSpeed;
        finalBallSpeed += finaleBallSpeedIncreasebyLevel;
        setBricks();
      } else if (!hasStarted) {
        hasStarted = true;
      }
      isWaitingforContinue = false;
      paddleDx = paddleSpeed;
      launchBall();
    }
  }
  if (event.keyCode == 39 && !isWaitingforContinue) {
    rightPressed = true;
  } else if (event.keyCode == 37 && !isWaitingforContinue) {
    leftPressed = true;
  }
}
function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPanel() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = panelColor;
  ctx.fill();
  ctx.closePath();
}

function launchBall() {
  x = canvas.width/2;
  y = canvas.height/2  + canvas.height/3;
  if (Math.random() > 0.5) {
    dx = -1;
  } else {
    dx = 1;
  }
  dy = -1;
}

//launchBall();
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPanel();
  drawBricks();
  drawStats();
  collisionChecker();

  for (var i in particles) {
    particles[i].draw();
  }
  if (waitForReloadSpace) {
    if (isVictory) {
      victoryHandler();
      if (drawVictoryParticle) {
        for (var i = 0; i < 1; i++) {
          new Particle(canvas.width/2, canvas.height/2, colors[Math.floor(Math.random() * 6)]);
        }
      }
    } else if (isGameOver) {
      gameOver();
      for (var i = 0; i < 1; i++) {
        new Particle(canvas.width/2, canvas.height/2, "red");
      }
    }
    requestAnimationFrame(draw);
    return;
  } else if (isWaitingforContinue) {
    if (isVictory) {
      victoryHandler();
      resetObjectsPosition();
      if (drawVictoryParticle) {
        for (var i = 0; i < 1; i++) {
          new Particle(canvas.width/2, canvas.height/2, colors[Math.floor(Math.random() * 6)]);
        }
      }
    } else {
      if (!hasStarted) {
        var t = ["Press space to start"];
      } else {
        var t = ["Press space to continue"];
      }
      showText(t);
    }
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    for (var i = 0; i < settings.density; i++) {
      new Particle(x, y, ballColor);
    }
    playSound(bip1);
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    for (var i = 0; i < settings.density; i++) {
      new Particle(x, y, ballColor);
    }
    playSound(bip1);
  } else if (y + dy > canvas.height) {
    for (var i = 0; i < settings.density; i++) {
      new Particle(x, y, ballColor);
    }
    looseLife();
    //document.location.reload(true);
    //dy = -1;
  }

  if (y + dy > canvas.height - paddleHeight - ballRadius &&
      x + dx > paddleX &&
      x + dx < paddleX + paddleWidth) {
        if (x < paddleX) {
          dx = -1;
        } else if (x > paddleX + paddleWidth + ballRadius) {
          dx = 1;
        } else {
          dy = -1;
        }
        for (var i = 0; i < settings.density; i++) {
          new Particle(x, y, panelColor);
        }
        playSound(bip2);
  }

  if (rightPressed && (paddleX + paddleWidth) < canvas.width) {
    paddleX += paddleDx;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleDx;
  }

  x += dx * ballSpeed;
  y += dy * ballSpeed;


  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

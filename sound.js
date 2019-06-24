var bip1 = "bipbas.mp3";
var bip2 = "biphaut.mp3";
var bip3 = "bipmoyen.mp3";
var bipLooseLife = "bipsshort.mp3";
var bipGameOver = "bipslong.mp3";
var bipJingle = "bipJingle.mp3";

function playSound(soundpath) {
  var audio = new Audio(soundpath);
  audio.play();
}

function backgroundMusic() {
  myAudio = new Audio('Game.mp3');
  myAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);

  setTimeout(function() {
  	myAudio.play();
  }, 0.1);
}

backgroundMusic();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var x = canvas.width/2;
var y = canvas.height/2 + canvas.height/3;
var percentageofscreenPerSecond = 20;
var speedFactor = .015;
var startSpeed = percentageofscreenPerSecond / 100 * canvas.width * speedFactor;
var ballSpeed = startSpeed;
var ballSpeedIncrease = 0;
var finalBallSpeed = 7;
var finaleBallSpeedIncreasebyLevel = 1;
var ballMinSpeed = 3;
var dx = 0;
var dy = 0;
var ballRadius = 125;
ballRadius = canvas.width / ballRadius;

var paddleHeight = 35;
paddleHeight = canvas.height / paddleHeight;
var paddleWidth = 10;
paddleWidth = canvas.width / paddleWidth;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleSpeed = (percentageofscreenPerSecond + 20) / 100 * canvas.width * speedFactor;
var paddleDx = paddleSpeed;

var textSize = .05 * canvas.height;
var ballColor = "white";
var panelColor = "#800000";
var gameOverColor = "black";
var statsColor = "white";
var colors = ["#c0c0c0", "red", "#ffff00", "DodgerBlue", "#ff33cc", "#00ff00", "brown"];

var pointsPerBrick = 10;

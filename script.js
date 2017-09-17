// variables
var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

        // Math.floor(Math.random() * ((y-x)+1) + x);
var enemySpeedX = Math.floor(Math.random()*6 +7);
var enemySpeedY = Math.floor(Math.random()*6 +5);

    // life point count
var lifeLeft = ["*","*","*","*","*","*","*","*","*","*"];

    // score
var score = 0;

// define objects
    // canvas - game screen size
var gameScreen = {
    x: 0,
    y: 0,
    width: 1000,
    height: 500,
    color: "black"
};
    // set game screen
ctx.fillStyle = gameScreen.color;
ctx.fillRect(gameScreen.x,gameScreen.y,gameScreen.width,gameScreen.height);

    // circles - enemies to avoid
var enemies = [
    {
        x: 20,
        y: 300,
        rad: 15,
        color: "red",
        speedX: 2 * enemySpeedX,
        speedY: enemySpeedY
    }, {
        x: 50,
        y: 100,
        rad: 20,
        color: "green",
        speedX: enemySpeedX,
        speedY: 1.2 * enemySpeedY
    }, {
        x: 350,
        y: 300,
        rad: 25,
        color: "blue",
        speedX: 1.3 * enemySpeedX,
        speedY: enemySpeedY
    }, {
        x: 200,
        y: 70,
        rad: 30,
        color: "yellow",
        speedX: enemySpeedX,
        speedY: 1.1 * enemySpeedY
    }
];

    // player
var player = {
    x: 30,
    y: 30,
    width: 15,
    height: 15,
    color: "white"
};


// functions

    // move player with mouse
function calcMousePosition(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
};

    // game start function
function setGame() {
    // draw game screen
    ctx.fillStyle = gameScreen.color;
    ctx.fillRect(gameScreen.x,gameScreen.y,gameScreen.width,gameScreen.height);
    
    // draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x,player.y,player.width,player.height);
    
    // draw enemies with loop
    for (var i = 0; i < 4; i++) {
        // draw enemies
        ctx.fillStyle = (enemies[i].color);
        ctx.beginPath();
        ctx.arc(enemies[i].x,enemies[i].y,enemies[i].rad,0,Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
        
        // move enemies
        enemies[i].x += enemies[i].speedX;
        enemies[i].y += enemies[i].speedY;
        
        // update enemies positions
        if (enemies[i].x >= gameScreen.width - enemies[i].rad) {
            enemies[i].speedX = -enemies[i].speedX;
        }
        else if (enemies[i].x <= enemies[i].rad) {
            enemies[i].speedX = -enemies[i].speedX;
        }
        else if (enemies[i].y >= gameScreen.height - enemies[i].rad) {
            enemies[i].speedY = -enemies[i].speedY;
        }
        else if (enemies[i].y <= enemies[i].rad) {
            enemies[i].speedY = -enemies[i].speedY;
        }
        
        // collision check
        if (player.x >= enemies[i].x - enemies[i].rad && player.x <= enemies[i].x + enemies[i].rad) {
            if (player.y >= enemies[i].y - enemies[i].rad && player.y <= enemies[i].y + enemies[i].rad) {
                if (lifeLeft.length >0) {
                    lifeLeft.splice(0,1);
                    document.getElementById("life").innerHTML = "LIFE POINT : " + lifeLeft.length;
                }
                else {
                    alert("GAME OVER. YOUR SCORE IS : " + score);
                }
            }
        }
    };
    setTimeout(countScore, 7);
};

// count score
function countScore() {
    score++
    document.getElementById("score").innerHTML = "SCORE : " + score;
};

// initiate game
function startGame() {
    var framesPerSec = 20;
    setInterval(setGame, 800/framesPerSec);
    canvas.addEventListener("mousemove", function(e) {
        var mousePosition = calcMousePosition(e);
        player.x = mousePosition.x;
        player.y = mousePosition.y;
    });
    calcMousePosition();
};
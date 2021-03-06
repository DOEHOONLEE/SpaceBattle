// variables
var canvas;
var ctx;

var canvasCntrl;
var ctxCntrl;

// Math.floor(Math.random() * ((y-x)+1) + x);
var enemySpeedX;
var enemySpeedY;

// score
var score;

// score count
var scoreCnt;

// game Pause
var gamePause;

// contoller
var controlX;
var controlY;

// player's collision position adjusted
var playerPosAdjustX;
var playerPosAdjustY;

// define objects
    // canvas - game screen size
var gameScreen = {
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    color: "beige"
};

// canvas - game screen size
var gameScreen;

// circles - enemies to avoid
var enemies;

// player
var player;


init();

// functions

function init() {
    canvas = document.getElementById("gameBoard");
    ctx = canvas.getContext("2d");

    canvasCntrl = document.getElementById("gameControl");
    ctxCntrl = canvasCntrl.getContext("2d");

    enemySpeedX = Math.floor(Math.random()*6 +7);
    enemySpeedY = Math.floor(Math.random()*6 +5);

    score = 0;

    scoreCnt = true;

    gamePause = false;

    controlX = 250;
    controlY = 250;

    // set game screen
    ctx.fillStyle = gameScreen.color;
    ctx.fillRect(gameScreen.x,gameScreen.y,gameScreen.width,gameScreen.height);

    enemies = [
    {
        x: 20,
        y: 300,
        rad: 15,
        color: "red",
        speedX: 2 * enemySpeedX,
        speedY: enemySpeedY,
        lifepoint : 100
    }, {
        x: 50,
        y: 100,
        rad: 20,
        color: "green",
        speedX: enemySpeedX,
        speedY: 1.2 * enemySpeedY,
        lifepoint: 150
    }, {
        x: 350,
        y: 300,
        rad: 25,
        color: "blue",
        speedX: 1.3 * enemySpeedX,
        speedY: enemySpeedY,
        lifepoint: 200
    }, {
        x: 200,
        y: 70,
        rad: 30,
        color: "yellow",
        speedX: enemySpeedX,
        speedY: 1.1 * enemySpeedY,
        lifepoint: 250
    }];
}
    // player

var player = {
    x: 30,
    y: 30,
    width: 35,
    height: 35,
    color: "white",
    lifepoint: 200,
    attackpoint: 20
};

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

    // move controller
function calMousePos(e) {
    var rect = canvasCntrl.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
};

function touchPos(e) {
    var rect = canvasCntrl.getBoundingClientRect();
    var root = document.documentElement;
    for (i=0; i<e.changedTouches.length;i++) {
        var touchPosX = e.changedTouches[i].pageX - rect.left - root.scrollLeft;
        var touchPosY = e.changedTouches[i].pageY - rect.top - root.scrollTop;
    }
    return {
        x:touchPosX,
        y:touchPosY
    }
}

function controller() {
    ctxCntrl.fillStyle = "lightgrey";
    ctxCntrl.beginPath();
    ctxCntrl.arc(controlX,controlY,60,0,Math.PI*2,false);
    ctxCntrl.fill();
    ctxCntrl.closePath();
}

    // FUNCTION - DRAW ENEMIES
function drawEnemies() {
    for (var i = 0; i < 4; i++) {
        // draw enemies
        if (gamePause == false) {
            ctx.fillStyle = (enemies[i].color);
            ctx.beginPath();
            ctx.arc(enemies[i].x,enemies[i].y,enemies[i].rad,0,Math.PI*2,false);
            ctx.fill();
            ctx.closePath();
        }
        
        // move enemies
        if (gamePause == false) {
            enemies[i].x +=(enemies[i].speedX * score*0.001);
            enemies[i].y += (enemies[i].speedY * score*0.001);
        }
        
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
        playerPosAdjustX = player.x + 17;
        playerPosAdjustY = player.y + 17;
        
        if (playerPosAdjustX >= enemies[i].x - enemies[i].rad && playerPosAdjustX <= enemies[i].x + enemies[i].rad) {
            if (playerPosAdjustY >= enemies[i].y - enemies[i].rad && playerPosAdjustY <= enemies[i].y + enemies[i].rad) {
                if (player.lifepoint >0) {
                    enemies[i].speedX = -enemies[i].speedX
                    enemies[i].speedY = -enemies[i].speedY
                    player.lifepoint--;
                    document.getElementById("life").innerHTML = "LIFE POINT : " + player.lifepoint;
                }
                else {
                    pauseGame();
                }
            }
        }
    };
}


    // game start function
function setGame() {
    // draw game screen
    ctx.fillStyle = gameScreen.color;
    ctx.fillRect(gameScreen.x,gameScreen.y,gameScreen.width,gameScreen.height);
    
    // draw player
    //ctx.fillStyle = player.color;
    //ctx.fillRect(player.x,player.y,player.width,player.height);
    
    var spaceship = new Image();
    spaceship.src = 'nightraiderfixed.png';
    
    
    ctx.drawImage(spaceship, player.x, player.y, player.width, player.height);
    
    // draw controller
    ctxCntrl.fillStyle = "grey";
    ctxCntrl.fillRect(0,0,500,500);
    
        // draw shade
    ctxCntrl.fillStyle = "aliceblue";
    ctxCntrl.beginPath();
    ctxCntrl.arc(250,250,100,0,Math.PI*2,false);
    ctxCntrl.fill();
    ctxCntrl.closePath();
    
    controller();
    
    // draw enemies
    drawEnemies();
    
    setTimeout(countScore, 7);
};

// game control
    // draw controller
function controlPad() {
    ctxCntrl.fillStyle = "grey";
    ctxCntrl.fillRect(0,0,500,500);

    function shade() {
        ctxCntrl.fillStyle = "aliceblue";
        ctxCntrl.beginPath();
        ctxCntrl.arc(250,250,100,0,Math.PI*2,false);
        ctxCntrl.fill();
        ctxCntrl.closePath();
    }
    function controller() {
        ctxCntrl.fillStyle = "lightgrey";
        ctxCntrl.beginPath();
        ctxCntrl.arc(controlX,controlY,60,0,Math.PI*2,false);
        ctxCntrl.fill();
        ctxCntrl.closePath();
    }
    shade();
    controller();
}

controlPad();

// pause game
function pauseGame() {
    gamePause = true;
    scoreCnt = false;
    enemies[i].speedX = 0;
    enemies[i].speedY = 0;
}

// count score
function countScore() {
    if (scoreCnt) {
        score++
    }
    else {
        score = score;
    }
    document.getElementById("score").innerHTML = "SCORE : " + score;
};

// initiate game
function startGame() {
    init();
    
    playerPosAdjustX = player.x + 17;
    playerPosAdjustY = player.y + 17;

    var framesPerSec = 20;
    setInterval(setGame, 800/framesPerSec);
    canvas.addEventListener("mousemove", function(e) {
        var mousePosition = calcMousePosition(e);
        player.x = mousePosition.x - 17;
        player.y = mousePosition.y + 3;
    });
    canvasCntrl.addEventListener("mousemove", function(e) {
        var mousePosition = calMousePos(e);
        controlX = mousePosition.x;
        controlY = mousePosition.y;
        player.x = mousePosition.x;
        player.y = mousePosition.y;
    });
    canvasCntrl.addEventListener("touchmove", function(e) {
        player.x = touchPos(e).x;
        player.y = touchPos(e).y;
        controlX = touchPos(e).x;
        controlY = touchPos(e).y;
        if (e.target == canvasCntrl) {
            e.preventDefault();
        }
    });
    calcMousePosition();
    calMousePos();
    touchPos();
};
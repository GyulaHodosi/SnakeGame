// global variables for session
let snakeAdd = {x: 17, y: 9};
let snakeDel = {x: 16, y: 8};
var moveRight;
var moveLeft;
var moveUp;
var moveDown;

function snakeMoveRight() {
    snakeAdd.x ++;
    getCoordinates(snakeAdd, snakeDel);
}

function snakeMoveLeft() {
    snakeAdd.x --;
    getCoordinates(snakeAdd, snakeDel);
}

function snakeMoveUp() {
    snakeAdd.y --;
    getCoordinates(snakeAdd, snakeDel);
}

function snakeMoveDown() {
    snakeAdd.y ++;
    getCoordinates(snakeAdd, snakeDel);
}

function deleteSnake() {
    snakeDel.x = snakeAdd.x;
    snakeDel.y = snakeAdd.y;
}

function checkHitApple(gameCell) {
    if (gameCell.classList.contains("snake") && gameCell.classList.contains("apple")) {
        gameCell.classList.remove("apple");
        placeApple()
    }
}


function placeApple() {
    let cordAppleX = Math.floor(Math.random() * 36);
    let cordAppleY = Math.floor(Math.random() * 19);
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        let cordY = parseInt(gameCell.dataset.coordinateY);
        let cordX = parseInt(gameCell.dataset.coordinateX);
        if (cordY === cordAppleY && cordX === cordAppleX) {
            gameCell.classList.add("apple")
        }
    }
}


function controls() {

    var arrowKeys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        space: 32
    };

    document.onkeydown = function () {

        switch (window.event.keyCode) {

            case arrowKeys.left:
                clearInterval(moveRight);
                clearInterval(moveLeft);
                clearInterval(moveDown);
                clearInterval(moveUp);
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                moveLeft = setInterval(snakeMoveLeft, 100);
                setInterval(deleteSnake, 100);

                break;
            case arrowKeys.up:
                clearInterval(moveRight);
                clearInterval(moveLeft);
                clearInterval(moveDown);
                clearInterval(moveUp);
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                moveUp = setInterval(snakeMoveUp, 100);
                setInterval(deleteSnake, 100);

                break;
            case arrowKeys.right:
                clearInterval(moveRight);
                clearInterval(moveLeft);
                clearInterval(moveDown);
                clearInterval(moveUp);
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                moveRight = setInterval(snakeMoveRight, 100);
                setInterval(deleteSnake, 100);

                break;
            case arrowKeys.down:
                clearInterval(moveRight);
                clearInterval(moveLeft);
                clearInterval(moveDown);
                clearInterval(moveUp);
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                moveDown = setInterval(snakeMoveDown, 100);
                setInterval(deleteSnake, 100);

                break;
            case arrowKeys.space:
                clearInterval(moveRight)
                clearInterval(moveLeft);
                clearInterval(moveDown);
                clearInterval(moveUp);
        }
    };

}



function getCoordinates() {
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        let cordY = parseInt(gameCell.dataset.coordinateY);
        let cordX = parseInt(gameCell.dataset.coordinateX);
        //gameCell.textContent = cordY + ',' + cordX;
        if (snakeAdd.x > 35) {
            snakeAdd.x = 0;
        }
        if (snakeAdd.x < 0) {
            snakeAdd.x = 35;
        }
        if (snakeAdd.y > 18) {
            snakeAdd.y = 0;
        }
        if (snakeAdd.y < 0) {
            snakeAdd.y = 18;
        }
        if (cordX === snakeAdd.x && cordY === snakeAdd.y) {
            gameCell.classList.add("snake")
        }
        if (cordX === snakeDel.x && cordY === snakeDel.y){
            gameCell.classList.remove("snake")
        }
        checkHitApple(gameCell);
    }
}



function game() {
    placeApple();
    //let snakeAdd = controls()[0];
    let snakeDel = controls()[1];
    getCoordinates();
}



game();
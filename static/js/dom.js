// global variables for session
let snakeAdd = [{x: 17, y: 9}];
let snakeDel = [{x: 16, y: 8}];
let direction = '';
var moveRight;
var moveLeft;
var moveUp;
var moveDown;

function checkHitApple(gameCell) {
    if (gameCell.classList.contains("snake") && gameCell.classList.contains("apple")) {
        gameCell.classList.remove("apple");
        increaseSnakeLength();

        placeApple()
    }
}


function increaseSnakeLength() {
    let snakeLastElement = snakeAdd[snakeAdd.length - 1];
    if (direction === 'left') {
        snakeAdd.push({x: snakeLastElement.x + 1, y: snakeLastElement.y});
    } else if (direction === 'up') {
        snakeAdd.push({x: snakeLastElement.x, y: snakeLastElement.y + 1});
    } else if (direction === 'right') {
        snakeAdd.push({x: snakeLastElement.x - 1, y: snakeLastElement.y});
    } else {
        snakeAdd.push({x: snakeLastElement.x, y: snakeLastElement.y - 1});
    }
    snakeDel.push({x: 0, y: 0});
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

    let arrowKeys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        space: 32
    };

    document.onkeydown = function () {

        switch (window.event.keyCode) {

            case arrowKeys.left:
                if (direction === 'right') {
                    break;
                }
                stopMovement();
                direction = 'left';
                changeDelCoordinates();
                moveLeft = setInterval(changeSnakeCoordinates, 100);
                setInterval(changeDelCoordinates, 100);
                break;

            case arrowKeys.up:
                if (direction === 'down') {
                    break;
                }
                stopMovement();
                direction = 'up';
                changeDelCoordinates();
                moveUp = setInterval(changeSnakeCoordinates, 100);
                setInterval(changeDelCoordinates, 100);
                break;

            case arrowKeys.right:
                if (direction === 'left') {
                    break;
                }
                stopMovement();
                direction = 'right';
                changeDelCoordinates();
                moveRight = setInterval(changeSnakeCoordinates, 100);
                setInterval(changeDelCoordinates, 100);
                break;

            case arrowKeys.down:
                if (direction === 'up') {
                    break;
                }
                stopMovement();
                direction = 'down';
                changeDelCoordinates();
                moveDown = setInterval(changeSnakeCoordinates, 100);
                setInterval(changeDelCoordinates, 100);
                break;

            case arrowKeys.space:
                stopMovement();
        }
    };
}

function stopMovement() {
    clearInterval(moveRight);
    clearInterval(moveLeft);
    clearInterval(moveDown);
    clearInterval(moveUp);
}

function changeSnakeCoordinates() {
    let snakeFirstElement = snakeAdd[0];
    console.log(snakeFirstElement)
    if (direction === 'left') {
        snakeAdd.unshift({x: snakeFirstElement.x - 1, y: snakeFirstElement.y});
    } else if (direction === 'up') {
        snakeAdd.unshift({x: snakeFirstElement.x, y: snakeFirstElement.y - 1});
    } else if (direction === 'right') {
        snakeAdd.unshift({x: snakeFirstElement.x + 1, y: snakeFirstElement.y});
    } else {
        snakeAdd.unshift({x: snakeFirstElement.x, y: snakeFirstElement.y + 1});
    }
    snakeAdd.pop();
    getCoordinates();
}

function changeDelCoordinates() {
    for (let coordIdx = 0; coordIdx < snakeAdd.length; coordIdx++) {
        snakeDel[coordIdx].x = snakeAdd[coordIdx].x;
        snakeDel[coordIdx].y = snakeAdd[coordIdx].y;
    }
}

function getCoordinates() {
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        let cordY = parseInt(gameCell.dataset.coordinateY);
        let cordX = parseInt(gameCell.dataset.coordinateX);
        gameCell.textContent = cordY + ',' + cordX;

        if (snakeAdd[0].x > 35) {
            snakeAdd[0].x = 0;
        }
        if (snakeAdd[0].x < 0) {
            snakeAdd[0].x = 35;
        }
        if (snakeAdd[0].y > 18) {
            snakeAdd[0].y = 0;
        }
        if (snakeAdd[0].y < 0) {
            snakeAdd[0].y = 18;
        }

        for (let coordIdx = 0; coordIdx < snakeAdd.length; coordIdx++) {
            if (cordX === snakeAdd[coordIdx].x && cordY === snakeAdd[coordIdx].y) {
                gameCell.classList.add("snake")
            }
            if (cordX === snakeDel[coordIdx].x && cordY === snakeDel[coordIdx].y) {
                gameCell.classList.remove("snake")
            }

            checkHitApple(gameCell);
        }
    }
}

function game() {

    placeApple();
    getCoordinates();
    controls();

}


game();
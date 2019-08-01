// global variables for session
let snake = [{x: 17, y: 9}];
let direction = '';
var intVal;
var isPaused = true;
var score = 0;
var appleCounter = 0;

function removeBoost(cordAppleX, cordAppleY) {
    getGameCell(cordAppleX, cordAppleY).classList.remove("boost");
    appleCounter = 0;
}

function showScore() {
    let scoreCurrent = document.getElementById("score");
    scoreCurrent.textContent = score;
}

function checkHitApple(gameCell) {
    if (gameCell.classList.contains("apple")) {
        gameCell.classList.remove("apple");

        return true
    }
    return false
}
function checkHitBoost(gameCell) {
    if (gameCell.classList.contains("boost")) {
        gameCell.classList.remove("boost");

        return true
    }
    return false
}

function placeApple() {
    let emptyCells = getEmptyCells();
    let rndEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    getGameCell(rndEmptyCell[0].x, rndEmptyCell[0].y).classList.add("apple");
}

function getEmptyCells() {
    let gameBoard = document.querySelectorAll('.board-cell');
    let result = [];

    for (let gameCell of gameBoard) {
        if (gameCell.classList.contains('snake') === false) {

            result.push([{x: parseInt(gameCell.dataset.coordinateX), y: parseInt(gameCell.dataset.coordinateY)}]);
        }
    }
    return result
}

function placeBoost() {
    let cordAppleX = Math.floor(Math.random() * 21);
    let cordAppleY = Math.floor(Math.random() * 19);

    getGameCell(cordAppleX, cordAppleY).classList.add("boost");
    setTimeout(removeBoost, 3000, cordAppleX, cordAppleY);
}

function controls() {

    let keys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        space: 32
    };

    document.onkeydown = function () {

        if (window.event.keyCode !== keys.space && isPaused === true) {
            hidePauseModal();
            isPaused = false;
        }

        switch (window.event.keyCode) {

            case keys.left:
                if (direction === 'right') {
                    break;
                }
                clearInterval(intVal);
                direction = 'left';
                intVal = setInterval(changeSnakeCoordinates, 100);
                break;

            case keys.up:
                if (direction === 'down') {
                    break;
                }
                clearInterval(intVal);
                direction = 'up';
                intVal = setInterval(changeSnakeCoordinates, 100);
                break;

            case keys.right:
                if (direction === 'left') {
                    break;
                }
                clearInterval(intVal);
                direction = 'right';
                intVal = setInterval(changeSnakeCoordinates, 100);
                break;

            case keys.down:
                if (direction === 'up') {
                    break;
                }
                clearInterval(intVal);
                direction = 'down';
                intVal = setInterval(changeSnakeCoordinates, 100);
                break;

            case keys.space:
                if (isPaused === false) {
                    isPaused = true;
                    clearInterval(intVal);
                    showPauseModal();
                }
        }
    };
}

function changeSnakeCoordinates() {
    getNewCoords();
    sideTransition();
    headCell = getGameCell(snake[0].x, snake[0].y);
    checkSelfHit(headCell);

    if (checkHitBoost(headCell)) {
        score += 3;
        appleCounter = 0;
        showScore()
    }

    if (checkHitApple(headCell) === false) {
        getGameCell(snake[snake.length - 1].x, snake[snake.length - 1].y).classList.remove("snake");
        snake.pop();
    } else {
        score++;
        appleCounter++;
        showScore();
        if (appleCounter % 5 === 0 && appleCounter !== 0) {
        placeBoost()
        }
        placeApple();
    }



    headCell.classList.add('snake');
}

function getNewCoords() {
    if (direction === 'left') {
        snake.unshift({x: snake[0].x - 1, y: snake[0].y});
    } else if (direction === 'up') {
        snake.unshift({x: snake[0].x, y: snake[0].y - 1});
    } else if (direction === 'right') {
        snake.unshift({x: snake[0].x + 1, y: snake[0].y});
    } else {
        snake.unshift({x: snake[0].x, y: snake[0].y + 1});
    }
}

function sideTransition() {
    if (snake[0].x > 21) {
        snake[0].x = 0;
    }
    if (snake[0].x < 0) {
        snake[0].x = 21;
    }
    if (snake[0].y > 18) {
        snake[0].y = 0;
    }
    if (snake[0].y < 0) {
        snake[0].y = 18;
    }
}

function checkSelfHit(gameCell) {
    if (gameCell.classList.contains('snake')) {
        post('/gameOver', {score: score})
    }
}

function getGameCell(x, y) {
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        if (parseInt(gameCell.dataset.coordinateY) === y &&
            parseInt(gameCell.dataset.coordinateX) === x) {
            return gameCell
        }
    }
}

function showPauseModal() {
    var modal = document.getElementById("pauseModal");
    modal.style.display = "block";
}

function hidePauseModal() {
    var modal = document.getElementById("pauseModal");
    modal.style.display = "none";
}

function game() {

    showPauseModal();
    placeApple();
    getGameCell(snake[0].x, snake[0].y).classList.add('snake');
    controls();
}

function post(path, params, method = 'post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

game();
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


function controls(direction) {
    let snakeAdd = [{x: 17, y: 9}, {x: 16, y: 9}];
    let snakeDel = [{x: 16, y: 8}, {x: 0, y: 0}];

    let arrowKeys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    document.onkeydown = function () {

        switch (window.event.keyCode) {
            case arrowKeys.left:
                if (direction === 'right'){
                    break;
                }
                direction = 'left';
                snakeDel = changeDelCoordinates(snakeAdd,snakeDel);
                snakeAdd = changeSnakeCoordinates(snakeAdd, direction);
                getCoordinates(snakeAdd, snakeDel);
                break;
            case arrowKeys.up:
                if (direction === 'down'){
                    break;
                }
                direction = 'up';
                snakeDel = changeDelCoordinates(snakeAdd,snakeDel);
                snakeAdd = changeSnakeCoordinates(snakeAdd, 'up');
                getCoordinates(snakeAdd, snakeDel);
                break;
            case arrowKeys.right:
                if (direction === 'left'){
                    break;
                }
                direction = 'right';
                snakeDel = changeDelCoordinates(snakeAdd,snakeDel);
                snakeAdd = changeSnakeCoordinates(snakeAdd, 'right');
                getCoordinates(snakeAdd, snakeDel);
                break;
            case arrowKeys.down:
                if (direction === 'up'){
                    break;
                }
                direction = 'down';
                snakeDel = changeDelCoordinates(snakeAdd,snakeDel);
                snakeAdd = changeSnakeCoordinates(snakeAdd, 'down');
                getCoordinates(snakeAdd, snakeDel);
                break;
        }
    };
    return [snakeAdd, snakeDel]
}


function changeSnakeCoordinates(snake, direction){
    let snakeFirstElement = snake[0];
    if (direction === 'left'){
        snake.unshift({x: snakeFirstElement.x -1, y: snakeFirstElement.y});
    } else if (direction === 'up'){
        snake.unshift({x: snakeFirstElement.x, y: snakeFirstElement.y -1});
    } else if (direction === 'right'){
        snake.unshift({x: snakeFirstElement.x + 1, y: snakeFirstElement.y});
    } else {
        snake.unshift({x: snakeFirstElement.x, y: snakeFirstElement.y + 1});
    }
    snake.pop();
    return snake;
}

function changeDelCoordinates(snake, snakeDel) {
    for (let coordIdx = 0; coordIdx < snake.length; coordIdx ++){
        snakeDel[coordIdx].x = snake[coordIdx].x;
        snakeDel[coordIdx].y = snake[coordIdx].y;
    }
    return snakeDel;
}

function getCoordinates(snakeAdd, snakeDel) {
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        let cordY = parseInt(gameCell.dataset.coordinateY);
        let cordX = parseInt(gameCell.dataset.coordinateX);
        let cordCell = {x: cordX, y: cordY};
        gameCell.textContent = cordY + ',' + cordX;
        for ( let coordIdx = 0; coordIdx < snakeAdd.length; coordIdx ++) {
            if (cordX === snakeAdd[coordIdx].x && cordY === snakeAdd[coordIdx].y) {
                gameCell.classList.add("snake")
            }
            if (cordX === snakeDel[coordIdx].x && cordY === snakeDel[coordIdx].y) {
                gameCell.classList.remove("snake")
            }
        }
        checkHitApple(gameCell);
    }
}


function game() {
    let direction = '';
    let cordApple = placeApple();
    let snakeAdd = controls(direction)[0];
    let snakeDel = controls(direction)[1];
    getCoordinates(snakeAdd, snakeDel);


}


game();
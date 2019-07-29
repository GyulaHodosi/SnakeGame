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
    let snakeAdd = {x: 17, y: 9};
    let snakeDel = {x: 16, y: 8};

    var arrowKeys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    document.onkeydown = function () {

        switch (window.event.keyCode) {

            case arrowKeys.left:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.x -= 1;
                getCoordinates(snakeAdd, snakeDel);
                break;
            case arrowKeys.up:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.y -= 1;
                getCoordinates(snakeAdd, snakeDel);
                break;
            case arrowKeys.right:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.x += 1;
                getCoordinates(snakeAdd, snakeDel);
                break;
            case arrowKeys.down:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.y += 1;
                getCoordinates(snakeAdd, snakeDel);
                break;
        }
    };
    return [snakeAdd, snakeDel]
}



function getCoordinates(snakeAdd, snakeDel) {
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        let cordY = parseInt(gameCell.dataset.coordinateY);
        let cordX = parseInt(gameCell.dataset.coordinateX);
        let cordCell = {x: cordX, y: cordY}
        gameCell.textContent = cordY + ',' + cordX;
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
    let cordApple = placeApple();
    let snakeAdd = controls()[0];
    let snakeDel = controls()[1];
    getCoordinates(snakeAdd, snakeDel);


}


game();
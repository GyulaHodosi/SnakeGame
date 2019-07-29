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
                getCoordinates(snakeAdd.x, snakeAdd.y, snakeDel.x, snakeDel.y);
                break;
            case arrowKeys.up:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.y -= 1;
                getCoordinates(snakeAdd.x, snakeAdd.y, snakeDel.x, snakeDel.y);
                break;
            case arrowKeys.right:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.x += 1;
                getCoordinates(snakeAdd.x, snakeAdd.y, snakeDel.x, snakeDel.y);
                break;
            case arrowKeys.down:
                snakeDel.x = snakeAdd.x;
                snakeDel.y = snakeAdd.y;
                snakeAdd.y += 1;
                getCoordinates(snakeAdd.x, snakeAdd.y, snakeDel.x, snakeDel.y);
                break;
        }
    }
    return [snakeAdd, snakeDel]
}



function getCoordinates(snakeAddX, snakeAddY, snakeDelX, snakeDelY) {
    let gameBoard = document.querySelectorAll('.board-cell');

    for (let gameCell of gameBoard) {
        let cordY = parseInt(gameCell.dataset.coordinateY);
        let cordX = parseInt(gameCell.dataset.coordinateX);
        gameCell.textContent = cordY + ',' + cordX;
        if (cordX === snakeAddX && cordY === snakeAddY) {
            gameCell.classList.add("snake")
        }
        if (cordX === snakeDelX && cordY === snakeDelY){
            gameCell.classList.remove("snake")
        }
    }
}


function game() {
    let snakeAdd = controls()[0];
    let snakeDel = controls()[1];
    getCoordinates(snakeAdd.x, snakeAdd.y, snakeDel.x, snakeDel.y);


}


game();
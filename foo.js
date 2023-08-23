
const ROWS = 50;
const COLS = 50;
let food = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)];
const container = document.querySelector('.container');
const mp = new Map();
function drawCells() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('div');
            cell.style.position = 'absolute';
            cell.style.top = i * 10 + 'px';
            cell.style.left = j * 10 + 'px';
            cell.style.width = '10px';
            cell.style.height = '10px';
            cell.style.border = '1px solid #aaa';
            container.appendChild(cell);
            mp.set('' + i + '-' + j, cell);
        }
    }
}
drawCells();
const head = [5, 8];


let moveLeft = 1, moveRight = 2, moveUp = 3, moveDown = 4;
let previousDirection = null;
let currentDirection = moveRight;
let snake = [[5, 5], [5, 6], [5, 7], [5, 8]];
drawSnake(snake);

function drawSnake(snake) {
    snake.forEach(([x, y]) => {
        const cell = mp.get('' + x + '-' + y);
        cell.style.background = 'black';
    });
    drawFood();
}


let isEnd = false;

function generateFood() {
    const [x, y] = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)];
    snake.forEach(([x1, y1]) => {
        if (x1 === x && y1 === y) {
            return generateFood();
        }
    });
    return food = [x, y];
}
function drawFood() {
    const [x, y] = generateFood();
    const cell = mp.get(x + '-' + y);
    cell.style.background = 'red';
}


setInterval(() => {
    if (isEnd) {
        return;
    }
    const unique = new Map();
    if (currentDirection === moveRight) {
        const removed = snake.shift();
        const removedCell = mp.get(removed[0] + '-' + removed[1]);
        removedCell.style.background = 'none'; 
        const lastElement = snake[snake.length - 1];
        lastElement[1] + 1 >= 50 ? snake.push([lastElement[0], 0]) : snake.push([lastElement[0], lastElement[1] + 1]);
        const newLast = snake[snake.length - 1];
        const newCell = mp.get(newLast[0] + '-' + newLast[1]);
        newCell.style.background = 'black';
    } else if (currentDirection === moveLeft) {
        const removed = snake.shift();
        const removedCell = mp.get(removed[0] + '-' + removed[1]);
        removedCell.style.background = 'none';
        const firstElement = snake[snake.length - 1];
        firstElement[1] - 1 < 0 ? snake.push([firstElement[0], 49]) : snake.push([firstElement[0], firstElement[1] - 1]);
        const newElem = snake[snake.length - 1];
        const newCell = mp.get(newElem[0] + '-' + newElem[1]);
        newCell.style.background = 'black';
    } else if (currentDirection === moveDown) {
        const removed = snake.shift();
        const removedCell = mp.get(removed[0] + '-' + removed[1]);
        removedCell.style.background = 'none'; 
        const lastElement = snake[snake.length - 1];
        lastElement[0] + 1 >= 50 ? snake.push([0, lastElement[1]]) : snake.push([lastElement[0] + 1, lastElement[1]]);
        const newLast = snake[snake.length - 1];
        const newCell = mp.get(newLast[0] + '-' + newLast[1]);
        newCell.style.background = 'black';
    } else if (currentDirection === moveUp) {
        const removed = snake.shift();
        const removedCell = mp.get(removed[0] + '-' + removed[1]);
        removedCell.style.background = 'none'; 
        const lastElement = snake[snake.length - 1];
        lastElement[0] - 1 < 0 ? snake.push([49, lastElement[1]]) : snake.push([lastElement[0] - 1, lastElement[1]]);
        const newLast = snake[snake.length - 1];
        const newCell = mp.get(newLast[0] + '-' + newLast[1]);
        newCell.style.background = 'black';
    }
    let hasEatenFood = false;
    let bumpedIntoItself = false;
    snake.forEach((elem) => {
        // if (unique.has(elem[0]) && unique.get(elem[0]).find(elem[1])) {
        //     bumpedIntoItself = true;
        // }
        // unique.set(elem[0], [...unique.get(elem[0]), elem[1]]);
        if (food && elem[0] === food[0] && elem[1] === food[1]) {
            hasEatenFood = true;
        }
    });
    if (bumpedIntoItself) {
        isEnd  = true;
        alert('end game');
        return;
    }
    const lastElement = snake[snake.length - 1];
    if (hasEatenFood) {
        drawFood();
        if (currentDirection === moveRight) {
            lastElement[1] + 1 >= 50 ? snake.push([lastElement[0], 0]) : snake.push([lastElement[0], lastElement[1] + 1])
        } else if (currentDirection === moveLeft) {
            lastElement[1] - 1 < 0 ? snake.push([lastElement[0], 49]) : snake.push([lastElement[0], lastElement[1] - 1]);
        } else if (currentDirection === moveDown) {
            lastElement[0] + 1 >= 50 ? snake.push([0, lastElement[1]]) : snake.push([lastElement[0] + 1, lastElement[1]]);
        } else if (currentDirection === moveUp) {
            lastElement[0] - 1 < 0 ? snake.push([49, lastElement[1]]) : snake.push([lastElement[0] - 1, lastElement[1]]);
        }
        const newLast = snake[snake.length - 1];
        const newCell = mp.get(newLast[0] + '-' + newLast[1]);
        newCell.style.background = 'black';
    }
}, 100)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        if (currentDirection !== moveLeft) {
            previousDirection = currentDirection
            currentDirection = moveRight
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentDirection !== moveRight) {
            previousDirection = currentDirection
            currentDirection = moveLeft;
        }
    } else if (e.key === 'ArrowDown') {
        if (currentDirection !== moveUp) {
            previousDirection = currentDirection
            currentDirection = moveDown;
        }
    } else if (e.key === 'ArrowUp') {
        if (currentDirection !== moveDown) {
            previousDirection = currentDirection
            currentDirection = moveUp;
        }
    }
})
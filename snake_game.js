const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let food = { x: 0, y: 0 };
let snake = [{ x: 5, y: 10 }];
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
let gameOver = false; 

highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    food.x = Math.floor(Math.random() * 30) + 1;
    food.y = Math.floor(Math.random() * 30) + 1;
};

const updateGame = () => {
    snake[0].x += velocityX;
    snake[0].y += velocityY;

    if (snake[0].x <= 0 || snake[0].x > 30 || snake[0].y <= 0 || snake[0].y > 30) {
        handleGameOver();
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            handleGameOver();
            return;
        }
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        changeFoodPosition();
        score++;
        highScore = Math.max(score, highScore);
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
        snake.push({ ...snake[snake.length - 1] });
    }

    renderGame();
};

const handleGameOver = () => {
    alert("Game Over! Press OK to replay...");
    clearInterval(setIntervalId);  // Stop the game loop
    location.reload();
};



const renderGame = () => {
    let htmlMarkup = '';

    htmlMarkup += `<div class="food" style="grid-area: ${food.y} / ${food.x}"></div>`;

    for (let i = 0; i < snake.length; i++) {
        htmlMarkup += `<div class="${i === 0 ? 'head' : 'body'}" style="grid-area: ${snake[i].y} / ${snake[i].x}"></div>`;
    }

    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
});

document.getElementById("up").addEventListener("click", () => changeDirection("ArrowUp"));
document.getElementById("down").addEventListener("click", () => changeDirection("ArrowDown"));
document.getElementById("left").addEventListener("click", () => changeDirection("ArrowLeft"));
document.getElementById("right").addEventListener("click", () => changeDirection("ArrowRight"));

const changeDirection = (direction) => {
    if (direction === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (direction === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (direction === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (direction === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

const initGame = () => {
    if (gameOver) return handleGameOver();

    if (snake[0].x === food.x && snake[0].y === food.y) {
        changeFoodPosition();
        score++;
        highScore = Math.max(score, highScore);
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;

        
    }

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }

    snake[0] = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

    renderGame();
};



changeFoodPosition();

const setIntervalId = setInterval(initGame, 125);

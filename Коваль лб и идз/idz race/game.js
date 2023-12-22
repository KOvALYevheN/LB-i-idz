const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerCarSrc = "./assets/player.png";
const botCarSrc = "./assets/bot.png";

const playerImage = new Image();
playerImage.src = playerCarSrc;
const botImage = new Image();
botImage.src = botCarSrc;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 80,
    speed: 5
};

const cars = [];
const carWidth = 50;
const carHeight = 80;
const carSpeed = 4;
let score = 0;
let gameOver = false;
let offset = 0;

document.addEventListener("keydown", e => {
    keyState[e.key] = true;
});

document.addEventListener("keyup", e => {
    keyState[e.key] = false;
});

document.addEventListener("keydown", e => {
    keyState[e.key] = true;

    if (gameOver && e.key === " ") {
        restartGame();
    }
});

const keyState = {};

function isKeyPressed(key) {
    return keyState[key] === true;
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawCars() {
    for (const car of cars) {
        ctx.drawImage(botImage, car.x, car.y, carWidth, carHeight);
    }
}

function drawScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    const textWidth = 150;
    const textHeight = 50;

    ctx.fillRect(0, textHeight - 50, textWidth, textHeight);

    const textSize = 20;
    const textX = 10;
    const textY = 30;
    ctx.fillStyle = "black";
    ctx.font = `${textSize}px Arial`;

    ctx.fillText(`Бали: ${score}`, textX, textY);
}

function drawRoad() {
    ctx.fillStyle = "#404040";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#888";
    ctx.fillRect(0, 0, 30, canvas.height);
    ctx.fillRect(canvas.width - 30, 0, 30, canvas.height);

    ctx.fillStyle = "#fff";

    const dividerWidth = 5;
    const dividerHeight = 30;

    for (let y = offset; y < canvas.height; y += dividerHeight * 2) {
        ctx.fillRect(
            (canvas.width - dividerWidth) / 2,
            y,
            dividerWidth,
            dividerHeight
        );
    }

    for (
        let y = offset - dividerHeight * 2;
        y < canvas.height;
        y += dividerHeight * 2
    ) {
        ctx.fillRect(
            (canvas.width - dividerWidth) / 4,
            y,
            dividerWidth,
            dividerHeight
        );
    }

    for (
        let y = offset - dividerHeight * 4;
        y < canvas.height;
        y += dividerHeight * 2
    ) {
        ctx.fillRect(
            (canvas.width - dividerWidth) / 1.34,
            y,
            dividerWidth,
            dividerHeight
        );
    }

    offset += carSpeed;

    if (offset >= dividerHeight * 2) {
        offset = 0;
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();

    updatePlayer();
    updateCars();

    drawPlayer();
    drawCars();
    drawScore();
}

function updatePlayer() {
    if (isKeyPressed("ArrowLeft") && player.x > 0) {
        player.x -= player.speed;
    }
    if (isKeyPressed("ArrowRight") && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (isKeyPressed("ArrowUp") && player.y > 0) {
        player.y -= player.speed;
    }
    if (isKeyPressed("ArrowDown") && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

function updateCars() {
    for (const car of cars) {
        car.y += carSpeed;
        if (checkCollision(player, car)) {
            gameOver = true;
        }
        if (car.y > canvas.height) {
            score++;
            car.y = -carHeight;
            car.x = Math.random() * (canvas.width - carWidth);
        }
    }
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + carWidth &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + carHeight &&
        rect1.y + rect1.height > rect2.y
    );
}

function gameLoop() {
    if (!gameOver) {
        drawGame();
        requestAnimationFrame(gameLoop);
    } else {
        endGame();
    }
}

function restartGame() {
    score = 0;
    gameOver = false;
    player.x = canvas.width / 2 - 25;
    player.y = canvas.height - 80;

    for (let i = 0; i < 5; i++) {
        cars[i].x = Math.random() * (canvas.width - carWidth);
        cars[i].y = -i * 150;
    }

    gameLoop();
}

function endGame() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

    ctx.fillRect(
        canvas.width / 2 - 900 / 2,
        canvas.height / 2 + 10 - 100 / 2,
        900,
        100
    );

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(
        `Гра закінчена! Балів: ${score}`,
        canvas.width / 2 - 150,
        canvas.height / 2
    );
    ctx.fillText(
        `Натисніть SPACE щоб розпочати нову гру!`,
        canvas.width / 2 - 300,
        canvas.height / 1.8
    );
}

for (let i = 0; i < 5; i++) {
    cars.push({
        x: Math.random() * (canvas.width - carWidth),
        y: -i * 150
    });
}

gameLoop();

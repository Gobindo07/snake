const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;

let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box,
};

let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#fff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Food
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, box, box);

  // Move Snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // Game Over
  if (
    headX < 0 || headX >= canvas.width ||
    headY < 0 || headY >= canvas.height ||
    snake.some(seg => seg.x === headX && seg.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  // Eat Food
  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

let game = setInterval(draw, 100);

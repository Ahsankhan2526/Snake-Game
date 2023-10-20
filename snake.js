//query selectors
const boundary = document.querySelector(".boundary");
const startBtn = document.querySelector("#start-pause");

//set defaults
let points = default_points;
let speed = default_speed;
let cellSize = default_cellSize;
boundary.style.width = default_boundaryDims.width + "px";
boundary.style.height = default_boundaryDims.height + "px";

//variables
let interval;

function drawSnake(points) {
  let snakePoint = "";

  for (const point of points) {
    snakePoint += `<span class="snake-dot" style="bottom:${point.y}px;left:${point.x}px;width:${cellSize}px;height:${cellSize}px"></span>`;
  }
  boundary.innerHTML = snakePoint;
}
drawSnake(points);

function move(points, dir) {
  let prev = { ...points[0] };
  switch (dir) {
    case "right":
      points[0].x += cellSize;
      break;
    case "left":
      points[0].x -= cellSize;
      break;
    case "up":
      points[0].y += cellSize;
      break;
    case "down":
      points[0].y -= cellSize;
      break;
  }
  for (let i = 1; i < points.length; i++) {
    const temp = { ...points[i] };
    points[i].x = prev.x;
    points[i].y = prev.y;
    prev = temp;
  }
  return points;
}

function moveDir(dir) {
  move(points, dir);
  drawSnake(points);
}

function startGame() {
  if (interval) {
    //running
    startBtn.innerHTML = "Start";
    clearInterval(interval);
    interval = null;
  } else {
    //paused
    startBtn.innerHTML = "Pause";
    interval = setInterval(() => {
      moveDir(currentDir);
    }, speed * 10);
  }
}

let upDown = true;
let rightLeft = true;
document.addEventListener("keydown", (event) => {
  //if arrow up key is pressed
  let key = event.code;
  if (upDown === true && key === "ArrowUp") {
    currentDir = "up";
    upDown = false;
    rightLeft = true;
  }
  if (upDown === true && key === "ArrowDown") {
    currentDir = "down";
    upDown = false;
    rightLeft = true;
  } else if (rightLeft === true && key === "ArrowRight") {
    currentDir = "right";
    upDown = true;
    rightLeft = false;
  } else if (rightLeft === true && key === "ArrowLeft") {
    currentDir = "left";
    upDown = true;
    rightLeft = false;
  }
});

let currentDir = "up";

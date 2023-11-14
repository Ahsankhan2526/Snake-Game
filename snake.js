//query selectors
const boundary = document.querySelector(".boundary");
let startBtn = document.querySelector("#start-pause");

//set defaults
let points = default_points;
let speed = default_speed;
let cellSize = default_cellSize;
boundary.style.width = default_boundaryDims.width + "px";
boundary.style.height = default_boundaryDims.height + "px";

//variables
let upDown;
let rightLeft;
let interval;
let currentDir;
let gameHTML;
let SnakeCellNum;

let beadPointsGenerator = () => {
  bead = {
    x: Math.floor(Math.random() * 50) * 10,
    y: Math.floor(Math.random() * 50) * 10,
  };
  return bead;
};

let beadDot;
function getBeadHtml() {
  let isOverLap;
  do {
    isOverLap = false;
    beadDot = beadPointsGenerator();
    for (let i = 0; i < points.length; i++) {
      if (beadDot.x === points[i].x && beadDot.y === points[i].y) {
        console.log("overlap");
        isOverLap = true;
      }
    }
  } while (isOverLap === true);
  return `<span class="bead" style="left:${bead.x}px ;bottom:${bead.y}px; "></span>`;
}

let callingBead = getBeadHtml();

function drawSnake() {
  let snakeHtml = "";
  SnakeCellNum = 1;
  for (const point of points) {
    snakeHtml += `<span class="snake-dot" style="left:${point.x}px;
    bottom:${point.y}px;width:${cellSize}px;height:${cellSize}px">
    ${SnakeCellNum++}</span>`;
  }
  snakeHtml += callingBead;
  gameHTML = snakeHtml;
  boundary.innerHTML = gameHTML;
}
drawSnake();
let ref = {};

function move(dir) {
  // if sanke Head touches itself ??
  for (let i = 1; i < points.length; i++) {
    if (points[0].x === points[i].x && points[0].y === points[i].y) {
    clearInterval(interval);
    startBtn.setAttribute('disabled', 'disabled')
    points[0] = null
    startBtn = null;
    alert('out');
    }
  }

  // updating next to the previous cell
  for (let i = points.length - 1; i >= 1; i--) {
    points[i].x = points[i - 1].x;
    points[i].y = points[i - 1].y;
  }

  //update next location of head
  switch (dir) {
    case "right":
      // points[0].x +=
      //   points[0].x >= default_boundaryDims.width-cellSize ? -default_boundaryDims.width + cellSize : cellSize;
      points[0].x += cellSize;
      break;
    case "left":
      // points[0].x -=
      //   points[0].x <= 0 ? -default_boundaryDims.width + cellSize : cellSize;
      points[0].x -= cellSize;
      break;
    case "up":
      points[0].y += cellSize;
      break;
    case "down":
      points[0].y -= cellSize;
      break;
  }
  // *-*-* for transparent boundaries *-*-*
  for (const key in points[0]) {
    const val = points[0][key];
    if (val < 0) {
      points[0][key] = default_boundaryDims.width + val;
    } else if (val > 490) {
      points[0][key] = points[0][key] % default_boundaryDims.width;
    }
  }

  // *-*-* after snake eat bead *-*-*
  if (beadDot.x === points[0].x && beadDot.y === points[0].y) {
    ref = { ...points[points.length - 1] };
    points.push(ref);
    callingBead = getBeadHtml();
  }
}

function moveDir(dir) {
  move(dir);
  drawSnake();
}
currentDir = "up";

function start_pause() {
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
    }, speed);
  }
}

upDown = true;
rightLeft = true;
document.addEventListener("keydown", (event) => {
  //if arrow up key is pressed
  let key = event.code;
  if (upDown === true && key === "ArrowUp") {
    currentDir = "up";
    upDown = false;
    rightLeft = true;
    // console.log(JSON.stringify(points));
  } else if (upDown === true && key === "ArrowDown") {
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
  if (key === "Space") {
    start_pause();
  }
});

let points = [
  { x: 300, y: 200 },
  { x: 290, y: 200 },
  { x: 280, y: 200 },
  { x: 270, y: 200 },
  { x: 260, y: 200 },
  { x: 250, y: 200 },
  { x: 240, y: 200 },
  { x: 230, y: 200 },
  { x: 230, y: 190 },
  { x: 230, y: 180 },
];
// for (const point of points) {
//   point.x = point.x
// }
const boundary = document.querySelector(".boundary");

function drawSnake(points) {
  let snakePoint = "";

  for (const point of points) {
    snakePoint += `<span class="snake-dot" style="bottom:${point.y}px;left:${point.x}px;"></span>`;
  }
  boundary.innerHTML = snakePoint;
}
drawSnake(points);

// let prevv = { ...points[0] };
// console.log(prevv);
function move(points, dir) {
  let prev = { ...points[0] };
  switch (dir) {
    case "right":
      points[0].x += 10;
      break;
    case "left":
      points[0].x -= 10;
      break;
    case "up":
      points[0].y += 10;
      break;
    case "down":
      points[0].y -= 10;
      break;
  }
  for (let i = 1; i < points.length; i++) {
    const temp = { ...points[i] };
    // console.log(temp);
    points[i].x = prev.x;
    points[i].y = prev.y;
    prev = temp;
  }
  return points;
}

function moveDir(dir) {
  points = move(points, dir);
  drawSnake(points);
}

document.addEventListener("keydown", (event) => {
  //if arrow up key is pressed
  if (event.code === "ArrowUp") {
    moveDir("up");
  } else if (event.code === "ArrowDown") {
    moveDir("down");
  } else if (event.code === "ArrowRight") {
    moveDir("right");
  } else if (event.code === "ArrowLeft") {
    moveDir("left");
  }
});

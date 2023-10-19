let points = [
  { x: 200, y: 100 },
  { x: 200, y: 110 },
  { x: 200, y: 120 },
  { x: 200, y: 130 },
  { x: 200, y: 140 },
  { x: 200, y: 150 },
  { x: 200, y: 160 },
  { x: 200, y: 170 },
  { x: 200, y: 180 },
  { x: 200, y: 190 },
];
let boundary = document.querySelector(".boundary");
function drawSnake(points) {
  let snake = "";
  for (const point of points) {
    snake += `<span class="snake-dot" style="bottom:${point.y}px;left:${point.x}px;"></span>`;
  }
  boundary.innerHTML = snake;
}
drawSnake(points);

function move(dir, points) {
  let prev = { ...points[0] };
  switch (dir) {
    case "right":
      points[0].x += 10;
      break;
    case "left":
      points[0].x -= 10;
      break;
    case "top":
      points[0].y += 10;
      break;
    case "bottom":
      points[0].y -= 10;
      break;
  }
  for (let i = 1; i < points.length; i++) {
    let remaining = { ...points[i] };
    points[i].x = prev.x;
    points[i].y = prev.y;
    prev = remaining;
  }
  return points;
}

function moveDir(dir) {
  move(dir, points);
  drawSnake(points);
}




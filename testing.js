let p = { x: 500, y: 200 };
let q = [
  { x: 500, y: 200 },
  { x: 340, y: 120 },
  { x: 330, y: 120 },
];


if (p.x === q[0].x && p.y === q[0].y) {
    console.log('working');
}
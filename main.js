import { Vec2D, Circle2D } from './2d.js';

const player = new Circle2D(new Vec2D(400, 400), 100);
const platforms = [
  new Circle2D(new Vec2D(200, 200), 100),
  new Circle2D(new Vec2D(500, 200), 100),
]
let direction = new Vec2D(0, 0);

const pixelRatio = window.devicePixelRatio;
window.onload = start;
const width = 500 * pixelRatio;
const height = 500 * pixelRatio;
let canvasEl;
let ctx;

function start() {
  canvasEl = document.querySelector('canvas');
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  ctx = canvasEl.getContext('2d');

  canvasEl.width = width;
  canvasEl.height = width;
  canvasEl.style.width = width / 2 + 'px';
  canvasEl.style.height = height / 2 + 'px';
  requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  player.pos.x += direction.x * 10;
  player.pos.y += direction.y * 10;


  ctx.lineWidth = 2;

  for (let platform of platforms) {

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(platform.pos.x, platform.pos.y);
    ctx.lineTo(player.pos.x, player.pos.y);
    ctx.stroke();
    ctx.restore();
    
    const distance = player.pos.sub(platform.pos).mag();
    const radiusSum = player.radius + platform.radius;

    if (radiusSum > distance) {
      const overlap = radiusSum - distance;
      const x = player.pos.sub(platform.pos).normalize().mult(overlap);
      player.pos = player.pos.add(x);
    }

    ctx.beginPath();
    ctx.arc(platform.pos.x, platform.pos.y, platform.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(player.pos.x, player.pos.y, player.radius, 0, Math.PI * 2);
  ctx.stroke();

  requestAnimationFrame(draw);
}

function onKeyDown(e) {
  changeDir(e, 1);
}
function onKeyUp(e) {
  changeDir(e, 0);
}
function changeDir(e, d) {
  switch (e.key) {
    case "a":
      direction.x = -1 * d;
      break;
    case "d":
      direction.x = 1 * d;
      break;
    case "w":
      direction.y = -1 * d;
      break;
    case "s":
      direction.y = 1 * d;
      break;
    default:
      break;
  }
  direction = direction.normalize();
}
const scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
const c = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = c.getContext("2d") as CanvasRenderingContext2D;

c.width = window.innerWidth - 20;
c.height = window.innerHeight - 20;
c.style.background = "#333333";

const boundingRect = c.getBoundingClientRect();

const getRandomXY = () => [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

let [x, y] = [100, 200];

const radius = 100;
let velocity = 10;

const animate = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (x + radius > boundingRect.right || x - radius < 0) velocity = -velocity;

  x += velocity;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#ea92c1";
  ctx.fill();

  requestAnimationFrame(animate);
};

animate();

import Circle from "../abstractions/circle.ts";
import { canvas } from "./canvas.ts";
import { getRandomInRange, langrengeDistance } from "../utils.ts";
import BrownianMotion from "../abstractions/brownian-motion.ts";

let mousex: number = 0,
  mousey: number = 0;

canvas.addEventListener("mousemove", (ev) => {
  mousex = ev.x;
  mousey = ev.y;
});

const getRandomXY = () => [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

const colors = ["#08D9D6", "#252A34", "#FF2E63", "#EAEAEA"];

const circles: Circle[] = [];
const brownianMotions: BrownianMotion[] = [];

for (let i = 0; i < 1000; i++) {
  let [x, y] = getRandomXY();

  const maxRadius = 100;

  const radius = getRandomInRange(2, 9);

  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;

  const brownianMotion = new BrownianMotion({
    dx,
    dy,
  });

  const color = colors[Math.floor(Math.random() * colors.length)];

  const newCircle = new Circle({
    canvas,
    x,
    y,
    color: { fillStyle: color },
    radius,
    maxRadius,
    minRadius: radius,
  });

  circles.push(newCircle);
  brownianMotions.push(brownianMotion);
}

const getMeMovingAndReactiveBouncingCircles = () => {
  const animate = () => {
    requestAnimationFrame(animate);

    canvas.clearCanvas();
    circles.forEach((circle, i) => {
      if (mousex !== undefined && mousey !== undefined) {
        if (circle.maxRadius && langrengeDistance(mousex, mousey, circle.x, circle.y) < 50) {
          circle.radius = Math.min(circle.radius + 1, circle.maxRadius);
        } else if (circle.minRadius && circle.radius > circle.minRadius) {
          circle.radius = circle.radius - 1;
        }
      }

      brownianMotions[i].motion(circle);
      circle.draw();
    });
  };
  animate();
};

getMeMovingAndReactiveBouncingCircles();

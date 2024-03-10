import { canvas } from "./canvas.ts";
import Circle from "../abstractions/circle.ts";
import Physics from "../abstractions/physics.ts";
import { getRandomInRange } from "../utils.ts";

const circles: Circle[] = [];
const gravities: Physics[] = [];

const colors = ["#08D9D6", "#252A34", "#FF2E63", "#EAEAEA"];

for (let i = 0; i < 1; i++) {
  const radius = getRandomInRange(50, 60);
  // const radius = getRandomInRange(5, 9);
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const gravityValue = 0.9;

  const gravity = new Physics(gravityValue);

  const circle = new Circle({
    canvas,
    x,
    y,
    radius,
    color: {
      fillStyle: colors[Math.floor(Math.random() * colors.length)],
    },
  });

  circles.push(circle);
  gravities.push(gravity);
}

const animate = () => {
  canvas.clearCanvas();

  requestAnimationFrame(animate);

  circles.forEach((circle, i) => {
    gravities[i].drop(circle);

    circle.draw();
  });
};

animate();

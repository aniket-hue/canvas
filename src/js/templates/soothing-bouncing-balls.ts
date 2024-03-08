import Circle from "../abstractions/circle.ts";
import { canvas } from "./canvas.ts";
import { getRandomInRange, langrengeDistance } from "../utils.ts";

let mousex: number = 0,
  mousey: number = 0;
canvas.addEventListener("mousemove", (ev) => {
  mousex = ev.x;
  mousey = ev.y;
});

const getRandomXY = () => [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

const colors = ["#08D9D6", "#252A34", "#FF2E63", "#EAEAEA"];

const circles: Circle[] = [];

for (let i = 0; i < 1000; i++) {
  let [x, y] = getRandomXY();

  const maxRadius = 100;

  const radius = getRandomInRange(2, 9);

  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;

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

  newCircle.setVelocity({ dx, dy });

  circles.push(newCircle);
}

const getMeMovingAndReactiveBouncingCircles = () => {
  const animate = () => {
    requestAnimationFrame(animate);
    canvas.getContext().clearRect(0, 0, canvas.getCanvas().width, canvas.getCanvas().height);

    circles.forEach((circle) => {
      if (mousex !== undefined && mousey !== undefined) {
        if (langrengeDistance(mousex, mousey, circle.x, circle.y) < 50) {
          circle.radius = Math.min(circle.radius + 1, circle.maxRadius);
        } else if (circle.radius > circle.minRadius) {
          circle.radius = circle.radius - 1;
        }
      }

      circle.update();
    });
  };
  animate();
};

getMeMovingAndReactiveBouncingCircles();

import { canvas } from "./canvas.ts";
import Circle from "../abstractions/circle.ts";

const circle = new Circle({
  canvas,
  x: 200,
  y: 200,
  radius: 100,
  color: {
    fillStyle: "#FF2E63",
  },
});

circle.setVelocity({ dx: 0, dy: 10 });

circle.draw();

circle.update = () => {
  // const bottomBounds = circle.canvas.getBoundingRect().bottom;
  //
  // const x = circle.x;
  // const y = circle.y;
  // const radius = circle.radius;
  //
  // if (x + radius > rightBounds || x - radius < 0) circle.dx = -circle.dx;
  // if (y + radius > bottomBounds || y - radius < 0) circle.dy = -circle.dy;
  //
  // circle.move({ dx: circle.dx, dy: circle.dy });
  // circle.draw();
};

function animate() {
  requestAnimationFrame(animate);
  canvas.clearCanvas();
  circle.update();
}

animate();

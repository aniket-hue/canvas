import Canvas from "./js/canvas.ts";
import Circle from "./js/circle.ts";

const canvas = new Canvas("canvas");
canvas.setCanvasSize(window.innerWidth - 20, window.innerHeight - 20);
canvas.getCanvas().style.background = "#333333";

const getRandomXY = () => [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

const circles: Circle[] = [];
for (let i = 0; i < 10; i++) {
  let [x, y] = getRandomXY();

  const radius = 10;
  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;

  const newCircle = new Circle(canvas, radius, x, y, { fillStyle: "#ea92c1" });
  newCircle.move({ dx, dy });

  circles.push(newCircle);
}

const getMeBouncingCircle = () => {
  const animate = () => {
    requestAnimationFrame(animate);
    canvas.getContext().clearRect(0, 0, canvas.getCanvas().width, canvas.getCanvas().height);

    circles.forEach((circle) => {
      circle.update();
    });
  };
  animate();
};

getMeBouncingCircle();

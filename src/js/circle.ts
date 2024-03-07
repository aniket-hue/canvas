import { Color, Movable, Shapes, Velocity } from "./shapes.ts";
import { ICanvas } from "./canvas.ts";

class Circle implements Shapes, Color, Movable {
  canvas: ICanvas;

  radius: number;
  fillStyle: string | undefined;

  dx: number = 2;
  dy: number = 2;

  x: number;
  y: number;

  constructor(
    canvas: ICanvas,
    radius: number,
    x: number,
    y: number,
    color: {
      fillStyle?: string;
      strokeStyle?: string;
    }
  ) {
    this.canvas = canvas;

    this.radius = radius;
    this.x = x;
    this.y = y;

    if (color.fillStyle) this.fillStyle = color.fillStyle;
  }

  draw(): void {
    const ctx = this.canvas.getContext();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
      ctx.fill();
    }
  }

  move(velocity: Velocity) {
    this.dx = velocity.dx;
    this.dy = velocity.dy;
  }

  update(): void {
    const rightBounds = this.canvas.getBoundingRect().right;
    const bottomBounds = this.canvas.getBoundingRect().bottom;

    const x = this.x;
    const y = this.y;
    const radius = this.radius;

    if (x + radius > rightBounds || x - radius < 0) this.dx = -this.dx;
    if (y + radius > bottomBounds || y - radius < 0) this.dy = -this.dy;

    console.log(y + radius > bottomBounds || y - radius < 0);

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

export default Circle;

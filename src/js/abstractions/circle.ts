import { Circle as ICircle, Color, Interface, Movable, Velocity } from "./interface.ts";
import { ICanvas } from "./canvas.ts";

class Circle implements Interface, ICircle, Color, Movable {
  canvas: ICanvas;

  fillStyle: string | undefined;

  dx: number = 0;
  dy: number = 0;

  x: number;
  y: number;

  radius: number;
  maxRadius: number;
  minRadius: number;

  constructor({
    canvas,
    maxRadius,
    minRadius,
    y,
    color,
    radius,
    x,
  }: {
    canvas: ICanvas;
    radius: number;

    maxRadius: number;
    minRadius: number;

    x: number;
    y: number;
    color: {
      fillStyle?: string;

      strokeStyle?: string;
    };
  }) {
    this.canvas = canvas;

    this.radius = radius;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;

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

  setVelocity(velocity: Velocity) {
    this.dx = velocity.dx;
    this.dy = velocity.dy;
  }

  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(): void {
    const rightBounds = this.canvas.getBoundingRect().right;
    const bottomBounds = this.canvas.getBoundingRect().bottom;

    const x = this.x;
    const y = this.y;
    const radius = this.radius;

    if (x + radius > rightBounds || x - radius < 0) this.dx = -this.dx;
    if (y + radius > bottomBounds || y - radius < 0) this.dy = -this.dy;

    this.setXY(x + this.dx, y + this.dy);

    this.draw();
  }
}

export default Circle;

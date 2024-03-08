import { Circle as ICircle, Color, Gravity, Interface, Movable, Velocity } from "./interface.ts";
import { ICanvas } from "./canvas.ts";

class Circle implements Interface, ICircle, Color, Movable, Gravity {
  canvas: ICanvas;

  fillStyle: string | undefined;
  strokeStyle?: string | undefined;

  gravity: number = 0;

  dx: number = 0;
  dy: number = 0;

  x: number;
  y: number;

  radius: number;
  maxRadius: number | undefined;
  minRadius: number | undefined;

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

    maxRadius?: number;
    minRadius?: number;

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

  freeFall(): void {}

  setGravity(gravity: number): void {
    this.gravity = gravity;
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

  update(): void {}

  brownianMotion(): void {
    const circle = this;

    if (!circle) return;
    const rightBounds = circle.canvas.getBoundingRect().right;
    const bottomBounds = circle.canvas.getBoundingRect().bottom;

    const x = circle.x;
    const y = circle.y;
    const radius = circle.radius;

    if (x + radius > rightBounds || x - radius < 0) circle.dx = -circle.dx;
    if (y + radius > bottomBounds || y - radius < 0) circle.dy = -circle.dy;

    circle.setXY(x + circle.dx, y + circle.dy);
    circle.draw();
  }
}

export default Circle;

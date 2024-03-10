import { Color, Shape } from "./shape.ts";
import { ICanvas } from "./canvas.ts";

export interface ICircle {
  maxRadius: number | undefined;
  minRadius: number | undefined;
}

class Circle implements Shape, ICircle, Color {
  canvas: ICanvas;

  fillStyle: string | undefined;
  strokeStyle?: string | undefined;

  x: number = 0;
  y: number = 0;

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

    if (color.fillStyle) this.fillStyle = color.fillStyle;

    this.setXY(x, y);
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

  setXY(x: number, y: number) {
    const leftEdge = x - this.radius;
    const rightEdge = x + this.radius;
    const bottomEdge = y + this.radius;
    const topEdge = y - this.radius;

    const { right, top, left, bottom } = this.canvas.getBoundingRect();

    // console.log(bottom, bottomEdge);
    if (right < rightEdge) {
      this.x = right - this.radius;
    } else if (left > leftEdge) {
      this.x = left + this.radius;
    } else {
      this.x = x;
    }

    if (bottom <= bottomEdge) {
      this.y = bottom - this.radius;
    } else if (top >= topEdge) {
      this.y = top + this.radius;
    } else {
      this.y = y;
    }
  }

  isAtBoundary(): {
    left: boolean;
    right: boolean;
    bottom: boolean;
    top: boolean;
  } {
    const shape = this;
    const rightBounds = shape.canvas.getBoundingRect().right;
    const bottomBounds = shape.canvas.getBoundingRect().bottom;

    const x = shape.x;
    const y = shape.y;
    const radius = shape.radius;

    return {
      left: x - radius <= 0,
      right: x + radius >= rightBounds,
      bottom: y + radius >= bottomBounds,
      top: y - radius <= 0,
    };
  }
}

export default Circle;

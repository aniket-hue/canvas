import { Movable, Shape, Velocity } from "./shape.ts";

class BrownianMotion implements Movable {
  dx: number = 2;
  dy: number = 2;

  constructor(velocity: Velocity) {
    this.dx = velocity.dx;
    this.dy = velocity.dy;
  }

  setVelocity(velocity: Velocity): void {
    this.dx = velocity.dx;
    this.dy = velocity.dy;
  }

  motion(shape: Shape): void {
    if (!shape) return;
    const bounds = shape.isAtBoundary();

    if (bounds.right || bounds.left) this.dx = -this.dx;
    if (bounds.top || bounds.bottom) this.dy = -this.dy;

    shape.setXY(shape.x + this.dx, shape.y + this.dy);
  }
}

export default BrownianMotion;

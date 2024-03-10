import { Shape } from "./shape.ts";

export interface IPhysics {
  mass: number;
  time: number;
  frameRate: number;

  gravity: number;
  elasticity: number;

  setGravity(gravity: number): void;

  setFriciton(friction: number): void;

  freeFall(): void;

  drop(shape: Shape): void;
}

class Physics implements IPhysics {
  time = 0;
  mass = 1;
  frameRate = 1 / 10;

  elasticity = 0.5;
  gravity = 0.5;
  friction = 0.5;

  velX = 1;
  velY = 1;

  constructor(gravity: number) {
    this.gravity = gravity;
  }

  setGravity(gravity: number): void {
    this.gravity = gravity;
  }

  setFriciton(friction: number) {
    this.friction = friction;
  }

  freeFall(): void {}

  findVelocity(height: number) {
    return Math.sqrt(2 * this.gravity * height);
  }

  drop(shape: Shape): void {
    if (!shape) return;

    const bounds = shape.isAtBoundary();

    if (bounds.top || bounds.bottom) {
      this.velX -= this.velX * this.friction;
      this.velY -= this.velY * this.elasticity;
      this.velY = -this.velY;
    }

    if (bounds.left || bounds.right) {
      this.velX -= this.velX * this.elasticity;
      this.velX = -this.velX;
    }

    this.velY += this.gravity;

    shape.setXY(shape.x + this.velX, shape.y + this.velY);
  }
}

export default Physics;

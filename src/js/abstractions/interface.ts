import { ICanvas } from "./canvas.ts";

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Movable {
  dx: number;
  dy: number;
  setVelocity(velocity: Velocity): void;
  brownianMotion(): void;
}

export interface Gravity {
  gravity: number;
  setGravity(gravity: number): void;
  freeFall(): void;
}

export interface Interface {
  canvas: ICanvas;

  x: number;
  y: number;

  draw(): void;
  setXY(x: number, y: number): void;
}

export interface Circle {
  maxRadius: number | undefined;
  minRadius: number | undefined;
}

export interface Color {
  fillStyle?: string;
  strokeStyle?: string;
}

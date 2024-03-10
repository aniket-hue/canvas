import { ICanvas } from "./canvas.ts";

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Movable {
  dx: number;
  dy: number;

  setVelocity(velocity: Velocity): void;

  motion(shape: Shape): void;
}

export interface Shape {
  canvas: ICanvas;

  x: number;
  y: number;

  draw(): void;

  setXY(x: number, y: number): void;

  isAtBoundary(): {
    left: boolean;
    right: boolean;
    bottom: boolean;
    top: boolean;
  };
}

export interface Color {
  fillStyle?: string;
  strokeStyle?: string;
}

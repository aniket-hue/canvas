import { ICanvas } from "./canvas.ts";

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Movable {
  dx: number;
  dy: number;
  move(velocity: Velocity): void;
}

export interface Shapes {
  canvas: ICanvas;

  x: number;
  y: number;

  draw(): void;
  update(): void;
}

export interface Circle {
  maxRadius: number;
  minRadius: number;
}

export interface Color {
  fillStyle?: string;
  strokeStyle?: string;
}

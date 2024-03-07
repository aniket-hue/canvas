import { ICanvas } from "./canvas.ts";

export type Velocity = { dx: number; dy: number };

export type Movable = {
  dx: number;
  dy: number;
  move(velocity: Velocity): void;
};

export interface Shapes {
  canvas: ICanvas;

  x: number;
  y: number;

  draw(): void;
  update(): void;
}

export interface Color {
  fillStyle?: string;
  strokeStyle?: string;
}

import Canvas from "../abstractions/canvas.ts";

export const canvas = new Canvas("canvas");

canvas.setCanvasSize(window.innerWidth, window.innerHeight);
canvas.getCanvas().style.background = "#f5f5f5";

export interface ICanvas {
  getBoundingRect(): DOMRect;
  getCanvas(): HTMLCanvasElement;
  getContext(): CanvasRenderingContext2D;
  setCanvasSize(width: number, height: number): void;

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

class Canvas implements ICanvas {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly boundingRect: DOMRect;

  constructor(id: string) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.boundingRect = this.canvas.getBoundingClientRect();
  }

  public getBoundingRect(): DOMRect {
    return this.boundingRect;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public setCanvasSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.canvas.addEventListener(type, listener, options);
  }
}

export default Canvas;

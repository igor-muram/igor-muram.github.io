export let Context3D: WebGL2RenderingContext;
export let Context2D: CanvasRenderingContext2D;

export function InitContext3D(canvas: HTMLCanvasElement) {
  Context3D = canvas.getContext("webgl2");
}

export function InitContext2D(canvas2D: HTMLCanvasElement) {
  Context2D = canvas2D.getContext("2d")
}

import { Context3D, InitContext3D, InitContext2D } from "./Context";


import { BufferLayoutBuilder, InitCamera, InitPrivimtives, LoadShaders, Renderer2D, Renderer3D} from "./Renderer"

let Canvas3D: HTMLCanvasElement;
let Canvas2D: HTMLCanvasElement;

let DotNetWindowRef: any = null;

function OnCanvasSizeChanged() {
  let Rect: DOMRect = Canvas3D.getBoundingClientRect();

  Canvas3D.width = Rect.width;
  Canvas3D.height = Rect.height;

  Canvas2D.width = Rect.width;
  Canvas2D.height = Rect.height;

  Context3D.viewport(0, 0, Rect.width, Rect.height);
  DotNetWindowRef.invokeMethodAsync('CanvasSizeChanged', Rect.x, Rect.y, Rect.width, Rect.height);
}

module.exports = {
  Init: function (dotNetWindowRef: any): void {
    DotNetWindowRef = dotNetWindowRef;
    Canvas3D = document.getElementById("canvas") as HTMLCanvasElement;

    let observer: ResizeObserver = new ResizeObserver(OnCanvasSizeChanged);
    observer.observe(Canvas3D, { box: 'content-box' });

    InitContext3D(Canvas3D);
    Context3D.viewport(0, 0, Canvas3D.width, Canvas3D.height);

    LoadShaders();
    InitPrivimtives();
    InitCamera();

    Canvas2D = document.getElementById("canvas2D") as HTMLCanvasElement;
    InitContext2D(Canvas2D);

    Canvas2D.width = Canvas3D.width;
    Canvas2D.height = Canvas3D.width;

    OnCanvasSizeChanged();
  },

  Clear: function(): void {
    Renderer2D.Clear(); 
    Renderer3D.Clear();
  }
};

module.exports.Renderer2D = Renderer2D;
module.exports.Renderer3D = Renderer3D;
module.exports.BufferLayoutBuilder = BufferLayoutBuilder;
import { BufferElement, BufferLayout, IndexBuffer, ShaderDataType, VertexBuffer } from "./Buffer";
import { Context2D, Context3D } from "./Context"
import { OrthographicCamera } from "./OrthographicCamera";
import { Shader } from "./shader";
import { Texture } from "./Texture";
import { VertexArray } from "./VertexArray";

import * as Shaders from "./ShaderSources";

let ShaderMap: Map<string, Shader> = new Map();
let TopologyMap: Map<string, GLenum> = new Map();
let Camera: OrthographicCamera;

let CurrentTopology: GLenum = null;
let CurrentShader: Shader;
let CurrentLayout: BufferLayout = null;
let CurrentVertexBuffer: VertexBuffer = null;
let CurrentIndexBuffer: IndexBuffer = null;
let CurrentTexture: Texture = null;

export let Scene: RenderingUnit[] = [];


export function LoadShaders(): void {
    ShaderMap.set("PointShader", new Shader(Shaders.PointVertexShader, Shaders.PointPixelShader));
    ShaderMap.set("LineShader", new Shader(Shaders.LineVertexShader, Shaders.LinePixelShader));
    ShaderMap.set("TriangleShader", new Shader(Shaders.TriangleVertexShader, Shaders.TrianglePixelShader));
    ShaderMap.set("SurfaceShader", new Shader(Shaders.SurfaceTriangleVertexShader, Shaders.SurfaceTrianglePixelShader));
}

export function InitPrivimtives(): void {
    TopologyMap.set("Points", Context3D.POINTS);
    TopologyMap.set("Lines", Context3D.LINES);
    TopologyMap.set("Triangles", Context3D.TRIANGLES);
}

export function InitCamera(): void {
    Camera = new OrthographicCamera(-1.0, 1.0, -1.0, 1.0);
}

export class Renderer2D {
    public static DrawLine(x1: number, y1: number, x2: number, y2: number): void {
        Context2D.strokeStyle = "black";
        Context2D.beginPath();
        Context2D.moveTo(x1, Context2D.canvas.height - y1);
        Context2D.lineTo(x2, Context2D.canvas.height - y2);
        Context2D.stroke();
    }

    public static DrawPoint(x: number, y: number): void {
        Context2D.ellipse(x, y, 20, 20, 0, 0, 0);
    }

    public static DrawRect(left: number, top: number, right: number, bottom: number): void {
        Context2D.fillStyle = "white";
        Context2D.fillRect(left, top, right - left, bottom - top);
    }

    public static DrawText(text: string, x: number, y: number, hexForegroundColor: string, vertical: boolean) {
        Context2D.fillStyle = hexForegroundColor;
        Context2D.font = `${13 * 1.3333}px serif`;
        Context2D.textAlign = 'center';
        
        if (vertical) {
            Context2D.save();
            Context2D.translate(x, Context2D.canvas.height - y);
            Context2D.rotate(Math.PI * 0.5);
            Context2D.fillText(text, 0, 0);
            Context2D.restore();
        }
        else {
            Context2D.fillText(text, x, Context2D.canvas.height - y);
        }
    }

    public static Clear(): void {
        Context2D.clearRect(0, 0, Context2D.canvas.width, Context2D.canvas.height);
    }
}

export class Renderer3D {
    public static SetClearColor(r: number, g: number, b: number, a: number): void {
        Context3D.clearColor(r, g, b, a);
    }

    public static Clear(): void {
        Scene = [];
        Context3D.clear(Context3D.COLOR_BUFFER_BIT);
    }

    public static SetViewport(x: number, y: number, w: number, h: number) {
        Context3D.viewport(x, y, w, h);
    }

    public static SetProjection(l: number, r: number, b: number, t: number, zmin: number, zmax: number): void {
        Camera.SetProjection(l, r, b, t, zmin, zmax);
    }

    public static SetView(matrix: number[]): void {
        Camera.SetView(matrix);
    }

    public static CreateTexture(width: number, height: number, data: number[]): void {
        CurrentTexture = new Texture(width, height);
        CurrentTexture.SetData(new Uint8Array(data));
    }

    public static SetShader(name: string): void {
        if (ShaderMap.has(name)) {
            CurrentShader = ShaderMap.get(name);
            CurrentShader.use();
        }
        else {
            console.error(`[Set Shader] Can't find shader with name: ${name}`);
        }
    }

    public static SetShaderUniform(uniformName: string, value: number[]): void {
        if (CurrentShader !== null) {
            CurrentShader.use();

            if (value.length === 1) {
                CurrentShader.setFloat(uniformName, value[0]);
            }
            else if (value.length === 4) {
                CurrentShader.setVec4(uniformName, new Float32Array(value));
            }
            else {
                console.warn(`[SetShaderUniform] Bad length (${value.length}) for uniform`);
            }
        }
    }

    public static SetVertexBuffer(data: Float32Array): void {
        CurrentVertexBuffer = new VertexBuffer(new Float32Array(data));
    }

    public static SetIndexBuffer(data: Int32Array): void {
        CurrentIndexBuffer = new IndexBuffer(new Int32Array(data));
    }

    public static SetPrimitiveTopology(topology: string): void {
        if (TopologyMap.has(topology)) {
            CurrentTopology = TopologyMap.get(topology);
        }
        else {
            console.error(`[SetPrimitiveTopology] Can't find topology: ${topology}`);
        }
    }

    public static DrawIndexed(count: number): void {

        if (CurrentVertexBuffer === null) {
            console.log("[DrawIndexed] CurrentVertexBuffer is null");
            return;
        }

        if (CurrentIndexBuffer === null) {
            console.log("[DrawIndexed] CurrentIndexBuffer is null");
            return;
        }

        let VAO: VertexArray = new VertexArray(CurrentVertexBuffer, CurrentIndexBuffer);
        Scene.push(new RenderingUnit(CurrentIndexBuffer.Count, CurrentTopology, VAO, CurrentShader, true, CurrentTexture));
    }

    public static Draw(count: number): void {
        if (CurrentVertexBuffer === null) {
            console.log("[Draw] CurrentVertexBuffer is null");
            return;
        }

        let VAO: VertexArray = new VertexArray(CurrentVertexBuffer, null);
        Scene.push(new RenderingUnit(count, CurrentTopology, VAO, CurrentShader, false, CurrentTexture));
    }

    public static SwapChain(): void {
        for (let unit of Scene) {
            unit.Shader.use();
            unit.Shader.setMat4("u_Transform", new Float32Array(Camera.GetViewProjection()));

            if (unit.Texture !== null) {
                unit.Texture.Bind();
            }

            unit.VAO.Bind();

            if (unit.IsIndexed) {
                Context3D.drawElements(unit.Topology, unit.Count, Context3D.UNSIGNED_INT, null);
            }
            else {
                Context3D.drawArrays(unit.Topology, 0, unit.Count);
            }
        }
    }
}

export class BufferLayoutBuilder {
    public static Create(): void {
        CurrentLayout = new BufferLayout();
    }

    public static AddFloat(): void {
        if (CurrentLayout != null) {
            CurrentLayout.Add(new BufferElement(ShaderDataType.Float, false));
        }
        else {
            console.error(`Can't add layout element because CurrentLayout is null`);
        }
    }

    public static AddFloat2(): void {
        if (CurrentLayout != null) {
            CurrentLayout.Add(new BufferElement(ShaderDataType.Float2, false));
        }
        else {
            console.error(`Can't add layout element because CurrentLayout is null`);
        }
    }

    public static AddFloat3(): void {
        if (CurrentLayout != null) {
            CurrentLayout.Add(new BufferElement(ShaderDataType.Float3, false));
        }
        else {
            console.error(`Can't add layout element because CurrentLayout is null`);
        }
    }

    public static AddFloat4(): void {
        if (CurrentLayout != null) {
            CurrentLayout.Add(new BufferElement(ShaderDataType.Float4, false));
        }
        else {
            console.error(`Can't add layout element because CurrentLayout is null`);
        }
    }

    public static Use(): void {
        CurrentLayout.Calculate();

        if (CurrentVertexBuffer != null) {
            CurrentVertexBuffer.Layout = CurrentLayout;
        }
        else {
            console.error(`Can't set layout because CurrentVertexBuffer is null`);
        }
    }
}

class RenderingUnit {
    public IsIndexed: boolean;
    public Topology: GLenum;
    public Count: number;
    public Shader: Shader;
    public VAO: VertexArray;
    public Texture: Texture;

    constructor(count: number, topology: number, vao: VertexArray, shader: Shader, isIndexed: boolean, texture: Texture = null) {
        this.Count = count;
        this.Topology = topology;
        this.VAO = vao;
        this.Shader = shader;
        this.IsIndexed = isIndexed;
        this.Texture = texture;
    }
}
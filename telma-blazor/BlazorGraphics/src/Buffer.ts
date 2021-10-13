import { Context3D, Context2D } from "./Context";

function ShaderDataTypeSize(type: ShaderDataType): number {
  switch (type) {
    case ShaderDataType.Float:
      return 4;
    case ShaderDataType.Float2:
      return 2 * 4;
    case ShaderDataType.Float3:
      return 3 * 4;
    case ShaderDataType.Float4:
      return 4 * 4;
  }
}

export enum ShaderDataType {
  Float,
  Float2,
  Float3,
  Float4,
}

export class BufferElement {
  public Type: ShaderDataType;
  public Offset: number;
  public Size: number;
  public Normalized: boolean;
  public ComponentCount: number;
  public BaseType: GLenum;

  constructor(type: ShaderDataType, normalized: boolean) {
    this.Type = type;
    this.Normalized = normalized;
    this.Size = ShaderDataTypeSize(type);

    switch (type) {
      case ShaderDataType.Float:
        this.ComponentCount = 1;
        break;
      case ShaderDataType.Float2:
        this.ComponentCount = 2;
        break;
      case ShaderDataType.Float3:
        this.ComponentCount = 3;
        break;
      case ShaderDataType.Float4:
        this.ComponentCount = 4;
        break;
    }

    switch (type) {
      case ShaderDataType.Float:
      case ShaderDataType.Float2:
      case ShaderDataType.Float3:
      case ShaderDataType.Float4:
        this.BaseType = Context3D.FLOAT;
        break;
    }
  }
}

export class BufferLayout {
  public Elements: BufferElement[] = [];
  public Stride: number = 0;

  public Add(element: BufferElement): void {
    this.Elements.push(element);
  }

  public Calculate(): void {
    let offset: number = 0;
    for (let element of this.Elements) {
      element.Offset = offset;
      offset += element.Size;
      this.Stride += element.Size;
    }
  }
}

export class VertexBuffer {
  readonly ID: WebGLBuffer;
  readonly Size: number = 0;
  public Layout: BufferLayout = null;

  constructor(vertices: Float32Array) {
    this.ID = Context3D.createBuffer();
    this.Size = vertices.length * 4;
    Context3D.bindBuffer(Context3D.ARRAY_BUFFER, this.ID);
    Context3D.bufferData(Context3D.ARRAY_BUFFER, vertices, Context3D.STATIC_DRAW);
    Context3D.bindBuffer(Context3D.ARRAY_BUFFER, null);
  }

  public Bind(): void {
    Context3D.bindBuffer(Context3D.ARRAY_BUFFER, this.ID);
  }

  public Unbind(): void {
    Context3D.bindBuffer(Context3D.ARRAY_BUFFER, null);
  }
}

export class IndexBuffer {
  readonly ID: WebGLBuffer;
  readonly Size: number = 0;
  readonly Count: number = 0;
  public Layout: BufferLayout = null;

  constructor(indices: Int32Array) {
    this.ID = Context3D.createBuffer();
    this.Count = indices.length;
    this.Size = this.Count * 4;
    Context3D.bindBuffer(Context3D.ELEMENT_ARRAY_BUFFER, this.ID);
    Context3D.bufferData(Context3D.ELEMENT_ARRAY_BUFFER, indices, Context3D.STATIC_DRAW);
    Context3D.bindBuffer(Context3D.ELEMENT_ARRAY_BUFFER, null);
  }

  public Bind(): void {
    Context3D.bindBuffer(Context3D.ELEMENT_ARRAY_BUFFER, this.ID);
  }

  public Unbind(): void {
    Context3D.bindBuffer(Context3D.ELEMENT_ARRAY_BUFFER, null);
  }
}
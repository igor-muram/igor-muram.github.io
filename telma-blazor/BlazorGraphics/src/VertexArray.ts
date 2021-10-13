import { Context3D } from "./Context";
import { VertexBuffer, BufferElement, BufferLayout, ShaderDataType, IndexBuffer } from "./Buffer";

export class VertexArray {
  readonly ID: WebGLVertexArrayObject;
  public VBO: VertexBuffer;
  public EBO: IndexBuffer;

  constructor(vbo: VertexBuffer, ebo: IndexBuffer) {
    this.ID = Context3D.createVertexArray();

    this.VBO = vbo;
    this.EBO = ebo;
    this.Bind()
    this.VBO.Bind();

    if (this.VBO.Layout === null) {
      console.log("Empty Layout!");
      return;
    }
    let index: number = 0;
    for (let element of this.VBO.Layout.Elements) {
      Context3D.enableVertexAttribArray(index);
      Context3D.vertexAttribPointer(
        index,
        element.ComponentCount,
        element.BaseType,
        element.Normalized,
        this.VBO.Layout.Stride,
        element.Offset
      );

      index++;
    }

    this.VBO.Unbind();

    if (this.EBO != null)
      this.EBO.Bind();
      
    this.Unbind();
  }

  public Bind(): void {
    Context3D.bindVertexArray(this.ID);
  }

  public Unbind(): void {
    Context3D.bindVertexArray(null);
  }
}

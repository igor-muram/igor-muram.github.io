import { Context3D } from "./Context";
import * as glm from "gl-matrix";

export class Shader {
  private program: WebGLProgram | null = null;

  constructor(vertexSource: string, fragmentSource: string) {
    this.program = Context3D.createProgram();

    let vertexShader: WebGLShader = this.compileShader(
      vertexSource,
      Context3D.VERTEX_SHADER
    );
    Context3D.attachShader(this.program as WebGLProgram, vertexShader);
    Context3D.deleteShader(vertexShader);

    let fragmentShader: WebGLShader = this.compileShader(
      fragmentSource,
      Context3D.FRAGMENT_SHADER
    );
    Context3D.attachShader(this.program as WebGLProgram, fragmentShader);
    Context3D.deleteShader(fragmentShader);

    Context3D.linkProgram(this.program as WebGLProgram);

    if (
      !Context3D.getProgramParameter(
        this.program as WebGLProgram,
        Context3D.LINK_STATUS
      )
    ) {
      console.log("Error linking shader program:");
      console.log(Context3D.getProgramInfoLog(this.program as WebGLProgram));
    }
  }

  private compileShader(source: string, type: number): WebGLShader {
    let shader: WebGLShader | null = Context3D.createShader(type);

    Context3D.shaderSource(shader as WebGLShader, source);
    Context3D.compileShader(shader as WebGLShader);

    if (
      !Context3D.getShaderParameter(shader as WebGLShader, Context3D.COMPILE_STATUS)
    ) {
      console.log(
        `Error compiling ${
          type === Context3D.VERTEX_SHADER ? "vertex" : "fragment"
        } shader:`
      );
      console.log(Context3D.getShaderInfoLog(shader as WebGLShader));
    }

    return shader as WebGLShader;
  }

  setMat4(uniform: string, mat: Float32Array) {
    let loc: WebGLUniformLocation = Context3D.getUniformLocation(
      this.program,
      uniform
    );
    Context3D.uniformMatrix4fv(loc, false, mat);
  }

  setVec4(uniform: string, vec: Float32Array) {
    let loc: WebGLUniformLocation = Context3D.getUniformLocation(
      this.program,
      uniform
    );
    Context3D.uniform4fv(loc, vec);
  }

  setFloat(uniform: string, value: number) {
    let loc: WebGLUniformLocation = Context3D.getUniformLocation(
      this.program,
      uniform
    );

    Context3D.uniform1f(loc, value);
  }

  use() {
    Context3D.useProgram(this.program);
  }
}

import * as glm from "gl-matrix";

export class OrthographicCamera {
  projectionMatrix: glm.mat4 = glm.mat4.create();
  viewMatrix: glm.mat4 = glm.mat4.create();
  viewProjectionMatrix: glm.mat4 = glm.mat4.create();

  position: glm.vec3;

  constructor(left: number, right: number, bottom: number, top: number) {
    glm.mat4.ortho(this.projectionMatrix, left, right, bottom, top, -1.0, 1.0);
    this.RecalculateViewMatrix();
  }

  public SetProjection(
    left: number,
    right: number,
    bottom: number,
    top: number,
    zmin: number,
    zmax: number
  ): void {
    glm.mat4.ortho(this.projectionMatrix, left, right, bottom, top, zmin, zmax);
    this.RecalculateViewMatrix();
  }

  public SetView(matrix: number[]) {
    if (matrix.length !== 16)
      console.warn("[SetView] Array size is not equal to 16");

    this.viewMatrix = glm.mat4.fromValues(
      matrix[0], matrix[1], matrix[2], matrix[3],
      matrix[4], matrix[5], matrix[6], matrix[7],
      matrix[8], matrix[9], matrix[10], matrix[11],
      matrix[12], matrix[13], matrix[14], matrix[15]
    );

    this.RecalculateViewMatrix();
  }

  public GetViewProjection(): glm.mat4 {
    return this.viewProjectionMatrix;
  }

  RecalculateViewMatrix(): void {
    glm.mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
  }
}

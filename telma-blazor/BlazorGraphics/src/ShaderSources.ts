export const PointVertexShader: string = `#version 300 es
    layout(location = 0) in vec3 a_Position;
    layout(location = 1) in float a_PointSize;
    layout(location = 2) in vec4 a_Color;

    uniform mat4 u_Transform;

    out vec4 v_Color;

    void main() {
      gl_Position = u_Transform * vec4(a_Position, 1.0);
      v_Color = a_Color;
      gl_PointSize = a_PointSize;
    }`;

export const PointPixelShader: string = `#version 300 es
    #ifdef GL_ES
        precision highp float;
    #endif

    in vec4 v_Color;
    out vec4 color;

    void main() {
            color = v_Color;
    }`;

export const LineVertexShader: string = `#version 300 es
    layout(location = 0) in vec3 a_Position;
    layout(location = 1) in vec4 a_Color;

    uniform mat4 u_Transform;
    out vec4 v_Color;

    void main() {
      gl_Position = u_Transform * vec4(a_Position, 1.0);
      v_Color = a_Color;
    }`;

export const LinePixelShader: string = `#version 300 es
    #ifdef GL_ES
        precision highp float;
    #endif

    in vec4 v_Color;
    out vec4 color;

    void main() {
            color = v_Color;
    }`;

export const TriangleVertexShader: string = `#version 300 es
    layout(location = 0) in vec3 a_Position;
    layout(location = 1) in vec3 a_Normal;
    layout(location = 2) in vec4 a_Color;

    uniform mat4 u_Transform;

    out vec4 v_Color;

    void main() {
      gl_Position = u_Transform * vec4(a_Position, 1.0);
      v_Color = a_Color;
    }`;

export const TrianglePixelShader: string = `#version 300 es
    #ifdef GL_ES
        precision highp float;
    #endif

    out vec4 color;
    in vec4 v_Color;

    void main() {
            color = v_Color;
    }`;

export const SurfaceTriangleVertexShader: string = `#version 300 es
    layout(location = 0) in vec3 a_Position;
    layout(location = 1) in vec4 a_Normal;
    layout(location = 2) in float a_Value;

    out float v_Value;

    uniform mat4 u_Transform;

    void main() {
      gl_Position = u_Transform * vec4(a_Position, 1.0);
      v_Value = a_Value;
    }`;

export const SurfaceTrianglePixelShader: string = `#version 300 es
    #ifdef GL_ES
        precision highp float;
    #endif

    uniform float u_MinValue;
    uniform float u_MaxValue;
    uniform vec4 u_MinColor;
    uniform vec4 u_MaxColor;

    in float v_Value;
    out vec4 color;

    uniform sampler2D u_Texture;

    void main() {
        float value = (v_Value - u_MinValue) / (u_MaxValue - u_MinValue);
        
        if (value < 0.0)
            color = u_MinColor;
        else if (value > 1.0)
            color = u_MaxColor;
        else
            color = texture(u_Texture, vec2(value, 0.5));
    }`;
import { Context3D } from "./Context"

export class Texture
{
    readonly ID: WebGLTexture;
    readonly Width: number;
    readonly Height: number;

    constructor(width: number, height: number)
    {
        this.Width = width;
        this.Height = height;

        this.ID = Context3D.createTexture();
        Context3D.bindTexture(Context3D.TEXTURE_2D, this.ID);

        Context3D.texParameteri(Context3D.TEXTURE_2D, Context3D.TEXTURE_MIN_FILTER, Context3D.NEAREST);
        Context3D.texParameteri(Context3D.TEXTURE_2D, Context3D.TEXTURE_MAG_FILTER, Context3D.NEAREST);
        Context3D.texParameteri(Context3D.TEXTURE_2D, Context3D.TEXTURE_WRAP_S, Context3D.CLAMP_TO_EDGE);
        Context3D.texParameteri(Context3D.TEXTURE_2D, Context3D.TEXTURE_WRAP_T, Context3D.CLAMP_TO_EDGE);

        Context3D.texImage2D(Context3D.TEXTURE_2D, 0, Context3D.RGBA, width, height, 0, Context3D.RGBA, Context3D.UNSIGNED_BYTE, null);
    }

    public SetData(data: Uint8Array)
    {
        Context3D.bindTexture(Context3D.TEXTURE_2D, this.ID);
        Context3D.texSubImage2D(Context3D.TEXTURE_2D, 0, 0, 0, this.Width, this.Height, Context3D.RGBA, Context3D.UNSIGNED_BYTE, data);
    }

    public Bind()
    {
        Context3D.bindTexture(Context3D.TEXTURE_2D, this.ID);
    }
}
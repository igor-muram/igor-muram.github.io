using System;
using System.Collections.Generic;
using Telma.BaseGraphic;
using TelmaQuasar;

namespace BlazorShared.Renderer
{
    public abstract class RenderingUnit
    {
        public float[] Buffer;
        public abstract void Render(BlazorRenderer renderer);
    }

    public class PointRenderingUnit : RenderingUnit
    {
        public int Count;

        public override void Render(BlazorRenderer renderer)
        {
            renderer.SetPrimitiveTopology(PrimitiveTopology.Points);
            renderer.SetShader(ShaderType.PointShader);
            renderer.SetVertexBuffer(Buffer);

            renderer.BufferLayoutBuilder.Create();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat();
            renderer.BufferLayoutBuilder.AddFloat4();
            renderer.BufferLayoutBuilder.Use();

            renderer.Draw(Count);
        }
    }

    public class LineRenderingUnit : RenderingUnit
    {
        public int Count;

        public override void Render(BlazorRenderer renderer)
        {
            renderer.SetPrimitiveTopology(PrimitiveTopology.Lines);
            renderer.SetShader(ShaderType.LineShader);
            renderer.SetVertexBuffer(Buffer);

            renderer.BufferLayoutBuilder.Create();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat4();
            renderer.BufferLayoutBuilder.Use();

            renderer.Draw(Count);
        }
    }

    public class IndexedLineRenderingUnit : RenderingUnit
    {
        public int[] Indices;

        public override void Render(BlazorRenderer renderer)
        {
            renderer.SetPrimitiveTopology(PrimitiveTopology.Lines);
            renderer.SetShader(ShaderType.LineShader);
            renderer.SetVertexBuffer(Buffer);

            renderer.BufferLayoutBuilder.Create();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat4();
            renderer.BufferLayoutBuilder.Use();

            renderer.SetIndexBuffer(Indices);

            renderer.DrawIndexed(Indices.Length);
        }
    }

    public class TriangleRenderingUnit : RenderingUnit
    {
        public int Count;
        public override void Render(BlazorRenderer renderer)
        {
            renderer.SetPrimitiveTopology(PrimitiveTopology.Triangles);
            renderer.SetShader(ShaderType.TriangleShader);
            renderer.SetVertexBuffer(Buffer);

            renderer.BufferLayoutBuilder.Create();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat4();
            renderer.BufferLayoutBuilder.Use();

            renderer.Draw(Count);
        }
    }

    public class SurfaceRenderingUnit : RenderingUnit
    {
        public float MinValue;
        public float MaxValue;
        public Color MinColor;
        public Color MaxColor;

        public int TextureWidth;
        public int TextureHeight;
        public int[] TextureData;

        public int[] Indices;

        public override void Render(BlazorRenderer renderer)
        {
            renderer.CreateTexture(TextureWidth, TextureHeight, TextureData);
            renderer.SetPrimitiveTopology(PrimitiveTopology.Triangles);
            renderer.SetShader(ShaderType.SurfaceShader);

            renderer.SetShaderUniform("u_MinValue", new float[1] { MinValue });
            renderer.SetShaderUniform("u_MaxValue", new float[1] { MaxValue });
            renderer.SetShaderUniform("u_MinColor", new float[4] { MinColor.R / 255.0f, MinColor.G / 255.0f, MinColor.B / 255.0f, MinColor.A / 255.0f });
            renderer.SetShaderUniform("u_MinColor", new float[4] { MaxColor.R / 255.0f, MaxColor.G / 255.0f, MaxColor.B / 255.0f, MaxColor.A / 255.0f });

            renderer.SetVertexBuffer(Buffer);
            renderer.BufferLayoutBuilder.Create();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat3();
            renderer.BufferLayoutBuilder.AddFloat();
            renderer.BufferLayoutBuilder.Use();
            renderer.SetIndexBuffer(Indices);
            renderer.DrawIndexed(Indices.Length);
        }
    }

    public class TextRenderingUnit : RenderingUnit
    {
        public IEnumerable<(Vector3D p, string text)> Texts;
        public AlignTypes AlignMode;
        public int AlignmentOffset = 15;

        public override void Render(BlazorRenderer renderer)
        {
            foreach (var (pos, text) in Texts)
            {
                Vector2D screenMMPos = renderer.Window.BackConvertMousePos(pos);
                Vector2D screenPos = new Vector2D(screenMMPos.X / renderer.Window.MMWidth * renderer.Window.BoundingRect.Width, (float)(screenMMPos.Y / renderer.Window.MMHeight * renderer.Window.BoundingRect.Height));

                if (((int)AlignMode & (int)AlignTypes.atBottom) != 0)
                    screenPos = new Vector2D(pos.X, pos.Y + AlignmentOffset);

                if (((int)AlignMode & (int)AlignTypes.atTop) != 0)
                    screenPos = new Vector2D(pos.X, pos.Y - AlignmentOffset);

                if (((int)AlignMode & (int)AlignTypes.atRight) != 0)
                    screenPos = new Vector2D(pos.X + AlignmentOffset, pos.Y);

                if (((int)AlignMode & (int)AlignTypes.atLeft) != 0)
                    screenPos = new Vector2D(pos.X - AlignmentOffset, pos.Y);

                bool vertical = false;
                if (((int)AlignMode & (int)AlignTypes.atVCenter) != 0)
                    vertical = true;

                renderer.RenderTarget2D.DrawText(text, screenPos.X, screenPos.Y, "#000000", vertical);
            }
        }
    }
}

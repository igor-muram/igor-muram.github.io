using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.JSInterop;
using Telma.BaseGraphic;
using TelmaQuasar;
using BlazorShared.Components;
using Telma.UniversalUI;

namespace BlazorShared.Renderer
{
    public enum PrimitiveTopology
    {
        Points,
        Lines,
        Triangles
    }

    public enum ShaderType
    {
        PointShader,
        LineShader,
        TriangleShader,
        SurfaceShader
    }

    public class RenderTarget2D
    {
        IJSRuntime JSInterop;

        public RenderTarget2D(IJSRuntime jsInterop) => JSInterop = jsInterop;

        public void DrawPoint(double x, double y) => JSInterop.InvokeVoidAsync("Renderer.Renderer2D.DrawPoint", x, y);
        public void DrawLine(double x1, double y1, double x2, double y2) => JSInterop.InvokeVoidAsync("Renderer.Renderer2D.DrawLine", x1, y1, x2, y2);
        public void DrawRect(double l, double t, double r, double b) => JSInterop.InvokeVoidAsync("Renderer.Renderer2D.DrawRect", l, t, r, b);
        public void DrawText(string text, double x, double y, string hexForegroundColor, bool vertical) => JSInterop.InvokeVoidAsync("Renderer.Renderer2D.DrawText", text, x, y, hexForegroundColor, vertical);
    }

    public class BufferLayoutBuilder
    {
        IJSRuntime JSInterop;

        public BufferLayoutBuilder(IJSRuntime jsInterop) => JSInterop = jsInterop;

        public void Create() => JSInterop.InvokeVoidAsync("Renderer.BufferLayoutBuilder.Create");
        public void AddFloat() => JSInterop.InvokeVoidAsync("Renderer.BufferLayoutBuilder.AddFloat");
        public void AddFloat2() => JSInterop.InvokeVoidAsync("Renderer.BufferLayoutBuilder.AddFloat2");
        public void AddFloat3() => JSInterop.InvokeVoidAsync("Renderer.BufferLayoutBuilder.AddFloat3");
        public void AddFloat4() => JSInterop.InvokeVoidAsync("Renderer.BufferLayoutBuilder.AddFloat4");
        public void Use() => JSInterop.InvokeVoidAsync("Renderer.BufferLayoutBuilder.Use");
    }

    public class BlazorRenderer
    {
        List<RenderingUnit> Scene = null;
        List<RenderingUnit> TempScene = null;

        public GraphWindow Window { get; set; }
        public RenderTarget2D RenderTarget2D { get; set; }
        public BufferLayoutBuilder BufferLayoutBuilder { get; set; }
        public IJSRuntime JSInterop { get; set; }

        public IBasePlaneGraphicForAxisAndGridDraw CreateGraphicsInterface(double width, double height) => new BlazorGraphics2D(this, width, height);
        public IBaseGraphic Create3DGraphicsInterface() => new BlazorGraphics3D();

        public BlazorRenderer(GraphWindow window, IJSRuntime jsInterop)
        {
            Window = window;
            JSInterop = jsInterop;

            RenderTarget2D = new RenderTarget2D(jsInterop);
            BufferLayoutBuilder = new BufferLayoutBuilder(jsInterop);
        }

        public void Init(DotNetObjectReference<GraphWindow> windowRef) => JSInterop.InvokeVoidAsync("Renderer.Init", windowRef);

        void ClearAll()
        {
            if (Scene != null)
                Scene.Clear();

            if (TempScene != null)
                TempScene.Clear();
        }

        void ClearTemp()
        {
            if (TempScene != null)
                TempScene.Clear();
        }

        public void UpdateFullScene(IBaseGraphic gi)
        {
            if (!(gi is BlazorGraphics3D gi3d)) throw new ArgumentOutOfRangeException();
            ClearAll();
            Scene = gi3d.Scene;
            foreach (var unit in Scene)
                unit.Render(this);
        }

        public void UpdateTempScene(IBaseGraphic gi)
        {
            if (!(gi is BlazorGraphics3D gi3d)) throw new ArgumentOutOfRangeException();
            ClearTemp();
            TempScene = gi3d.Scene;
        }

        public void RenderStart()
        {
            JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetClearColor", 1.0, 1.0, 1.0, 1.0);
            JSInterop.InvokeVoidAsync("Renderer.Clear");
        }

        public void RenderScene()
        {
            if (Scene != null)
            {
                foreach (var unit in Scene.ToArray())
                    unit.Render(this);
            }

            if (TempScene != null)
            {
                foreach (var unit in TempScene.ToArray())
                    unit.Render(this);
            }
        }

        public void RenderEnd()
        {
            SwapChain();
        }

        #region WebGL
        public void UpdateProjection(double xsize, double ysize, LocalViewCoor coor)
        {
            var XVector = coor.ViewPlane.ToGlobal(Vector3D.Vec(1, 0, 0));
            var YVector = coor.ViewPlane.ToGlobal(Vector3D.Vec(0, 1, 0));
            var ZVector = coor.ViewPlane.ToGlobal(Vector3D.Vec(0, 0, -1));
            var Zero = coor.ViewPlane.ToGlobal(Vector3D.Vec(0, 0, 0)) + coor.ViewZero;

            double NormCoefX = coor.ViewModel.GetNormCoef(0);
            double NormCoefY = coor.ViewModel.GetNormCoef(1);
            double NormCoefZ = coor.ViewModel.GetNormCoef(2);

            float[] mView = new float[16];

            mView[0] = (float)(XVector.X * NormCoefX);
            mView[1] = (float)(YVector.X * NormCoefX);
            mView[2] = (float)(ZVector.X * NormCoefX);
            mView[3] = 0;
            mView[4] = (float)(XVector.Y * NormCoefY);
            mView[5] = (float)(YVector.Y * NormCoefY);
            mView[6] = (float)(ZVector.Y * NormCoefY);
            mView[7] = 0;
            mView[8] = (float)(XVector.Z * NormCoefZ);
            mView[9] = (float)(YVector.Z * NormCoefZ);
            mView[10] = (float)(ZVector.Z * NormCoefZ);
            mView[11] = 0;
            mView[12] = (float)-(XVector * Zero);
            mView[13] = (float)-(YVector * Zero);
            mView[14] = (float)-(ZVector * Zero);
            mView[15] = 1;
            // mView.Transpose();

            var center = coor.ViewModel.CurrentViewCenter;
            double rad = coor.ViewModel.CurrentViewRadius * 10;

            var v2center = coor.ViewPlane.ToLocal(center);

            double zmin = v2center.Z - rad;
            double zmax = v2center.Z + rad;

            JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetView", mView);

            JSInterop.InvokeVoidAsync(
                "Renderer.Renderer3D.SetProjection",
                (float)coor.XAxis.V0,
                (float)coor.XAxis.VMax,
                (float)coor.YAxis.V0,
                (float)coor.YAxis.VMax,
                (float)zmin,
                (float)zmax
                );

        }
        public void SetPrimitiveTopology(PrimitiveTopology topology) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetPrimitiveTopology", topology.ToString());
        public void SetShader(ShaderType shader) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetShader", shader.ToString());
        public void SetShaderUniform(string name, float[] data) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetShaderUniform", name, data);
        public void SetVertexBuffer(float[] buffer) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetVertexBuffer", buffer);
        public void SetIndexBuffer(int[] buffer) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SetIndexBuffer", buffer);
        public void CreateTexture(int width, int height, int[] textureData) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.CreateTexture", width, 1, textureData);
        public void Draw(int count) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.Draw", count);
        public void DrawIndexed(int count) => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.DrawIndexed", count);
        public void SwapChain() => JSInterop.InvokeVoidAsync("Renderer.Renderer3D.SwapChain");
        public void Invalidate() => Window.Paint();

        #endregion
    }

    public class BlazorGraphics2D : IBasePlaneGraphicForAxisAndGridDraw
    {
        BlazorRenderer renderer;

        public BlazorGraphics2D(BlazorRenderer renderer, double width, double height)
        {
            this.renderer = renderer;
            screenSize = new Vector2D(width, height);
        }

        Vector2D screenSize;
        public Vector2D ScreenSize => screenSize;

        public Vector2D ToScreenCoords(Vector3D p)
        {
            return new Vector2D(p.X / screenSize.X * renderer.Window.BoundingRect.Width, p.Y / screenSize.Y * renderer.Window.BoundingRect.Height);
        }

        public void DrawIndexedLines(
            IList<Vector3D> vertices,
            IEnumerable<(int, int, Color)> lines,
            LineTypes type = LineTypes.ltSolid,
            Thickness thickness = Thickness.Small,
            bool IsTopMost = false)
        {
            List<(double, double)> points = new List<(double, double)>();

            foreach (var vertex in vertices)
            {
                var v = ToScreenCoords(vertex);
                points.Add((v.X, v.Y));
            }

            foreach (var line in lines)
            {
                (double, double) p1 = points[line.Item1];
                (double, double) p2 = points[line.Item2];

                renderer.RenderTarget2D.DrawLine(p1.Item1, p1.Item2, p2.Item1, p2.Item2);
            }
        }

        public void DrawIndexedTriangles(
            IList<Vector3D> vertices,
            Dictionary<GraphicsMaterialType, List<(int n1, int n2, int n3, Vector3D normal)>> triangles,
            bool Outline = false,
            bool Solid = true,
            Color outline = default) => throw new NotImplementedException();

        public void DrawPoints(
            IEnumerable<Vector3D> Points,
            Color color,
            PointTypes type,
            Thickness size,
            bool IsTopMost = true) => throw new NotImplementedException();

        public void DrawPoints(
            IEnumerable<(Vector3D, GraphicsMaterialType material)> Points,
            PointTypes type,
            Thickness size,
            bool IsTopMost = true) => throw new NotImplementedException();

        public void DrawSurface(
            ISurfaceDrawInfo surface,
            Func<int, GraphicsMaterialType> MaterialColorConverter,
            Func<int, (Color color, LineTypes type, Thickness thick, bool IsTop)> LineTypeConverter,
            bool IsMaterialFill = true,
            bool IsOutlineDraw = true,
            IColorGradePalette ColorTable = null) => throw new NotImplementedException();

        public void DrawTexts(
            IEnumerable<(Vector3D p, string text)> Text,
            TTFont font,
            AlignTypes mode = AlignTypes.atVCenter,
            Color Foregraund = default,
            bool DrawBackground = false,
            Color Backround = default,
            int BorderWidth = 0,
            Color BorderColor = default,
            bool DrawTitlePoint = false,
            int dx = 0,
            int dy = 0)
        {
            foreach (var value in Text)
            {
                Vector2D pos = ToScreenCoords(value.p);
                int alignmentOffset = 15;
                bool vertical = false;

                if (((int)mode & (int)AlignTypes.atBottom) != 0)
                    pos = new Vector2D(pos.X, pos.Y + alignmentOffset);

                if (((int)mode & (int)AlignTypes.atTop) != 0)
                    pos = new Vector2D(pos.X, pos.Y - alignmentOffset);

                if (((int)mode & (int)AlignTypes.atRight) != 0)
                    pos = new Vector2D(pos.X - alignmentOffset, pos.Y);

                if (((int)mode & (int)AlignTypes.atLeft) != 0)
                    pos = new Vector2D(pos.X + alignmentOffset, pos.Y);

                if (((int)mode & (int)AlignTypes.atVCenter) != 0)
                    vertical = true;

                string hexForegroundColor = "#" + Foregraund.R.ToString("X2") + Foregraund.G.ToString("X2") + Foregraund.B.ToString("X2");
                renderer.RenderTarget2D.DrawText(value.text, pos.X + dx, pos.Y + dy, hexForegroundColor, vertical);
            }
        }

        public void DrawVectors(
            IEnumerable<(Vector3D pos, Vector3D val, Color color)> Vectors,
            Color outcolor = default,
            bool IsBounded = true,
            bool IsFilled = true,
            VectorDrawMode mode = VectorDrawMode.Cone,
            double minValueLen = 0,
            double minLineValueLen = 0,
            double minVectorValue = 0,
            double maxValueLen = 0,
            double vectorDrawRatio = 0.3,
            double MinimumVal = 0,
            double MaximumVal = 3.4028234663852886E+38) => throw new NotImplementedException();

        public Vector2D GetTextSize(string text, TTFont font)
        {
            return new Vector2D(5.0, 5.0);
        }

        public void PlaneBar(double l, double t, double r, double b, Color color) => renderer.RenderTarget2D.DrawRect(l, t, r, b);
    }

    public class BlazorGraphics3D : IBaseGraphic
    {
        public List<RenderingUnit> Scene = new List<RenderingUnit>();

        public void DrawIndexedLines(IList<Vector3D> vertices,
                                     IEnumerable<(int, int, Color)> lines,
                                     LineTypes type = LineTypes.ltSolid,
                                     Thickness thickness = Thickness.Small,
                                     bool IsTopMost = false)
        {
            if (vertices.Count == 0) return;
            if (lines.Count() == 0) return;

            int i = 0;
            int stride = 7;
            float[] buffer = new float[2 * 7 * lines.Count()];

            foreach (var line in lines)
            {
                buffer[2 * i * stride + 0] = (float)vertices[line.Item1].X;
                buffer[2 * i * stride + 1] = (float)vertices[line.Item1].Y;
                buffer[2 * i * stride + 2] = (float)vertices[line.Item1].Z;
                buffer[2 * i * stride + 3] = line.Item3.R / 255.0f;
                buffer[2 * i * stride + 4] = line.Item3.G / 255.0f;
                buffer[2 * i * stride + 5] = line.Item3.B / 255.0f;
                buffer[2 * i * stride + 6] = line.Item3.A / 255.0f;

                buffer[(2 * i + 1) * stride + 0] = (float)vertices[line.Item2].X;
                buffer[(2 * i + 1) * stride + 1] = (float)vertices[line.Item2].Y;
                buffer[(2 * i + 1) * stride + 2] = (float)vertices[line.Item2].Z;
                buffer[(2 * i + 1) * stride + 3] = line.Item3.R / 255.0f;
                buffer[(2 * i + 1) * stride + 4] = line.Item3.G / 255.0f;
                buffer[(2 * i + 1) * stride + 5] = line.Item3.B / 255.0f;
                buffer[(2 * i + 1) * stride + 6] = line.Item3.A / 255.0f;

                i++;
            }

            LineRenderingUnit unit = new LineRenderingUnit();
            unit.Count = lines.Count() * 2;
            unit.Buffer = buffer;

            Scene.Add(unit);
        }

        public void DrawIndexedTriangles(IList<Vector3D> vertices,
                                         Dictionary<GraphicsMaterialType, List<(int n1, int n2, int n3, Vector3D normal)>> triangles,
                                         bool Outline = false,
                                         bool Solid = true,
                                         Color outline = default)
        {
            if (vertices.Count == 0) return;

            if (Solid)
            {
                List<float[]> buffer = new List<float[]>();

                foreach (var pair in triangles)
                {
                    foreach (var t in pair.Value)
                    {
                        foreach (var k in new[] { t.n1, t.n2, t.n3 })
                        {
                            buffer.Add(new float[]
                            {
                                (float)vertices[k].X,
                                (float)vertices[k].Y,
                                (float)vertices[k].Z,
                                (float)t.normal.X,
                                (float)t.normal.Y,
                                (float)t.normal.Z,
                                pair.Key.Color.R / 255.0f,
                                pair.Key.Color.G / 255.0f,
                                pair.Key.Color.B / 255.0f,
                                pair.Key.Color.A / 255.0f
                            });
                        }
                    }
                }

                TriangleRenderingUnit unit = new TriangleRenderingUnit();
                unit.Count = buffer.Count;
                unit.Buffer = buffer.SelectMany(v => v).ToArray();
                Scene.Add(unit);
            }

            if (Outline)
            {
                List<float[]> buffer = new List<float[]>();

                foreach (var pair in triangles)
                {
                    foreach (var t in pair.Value)
                    {
                        foreach (var line in new[] { (t.n1, t.n2), (t.n2, t.n3), (t.n3, t.n1) })
                        {
                            buffer.Add(new float[]
                            {
                                (float)vertices[line.Item1].X,
                                (float)vertices[line.Item1].Y,
                                (float)vertices[line.Item1].Z,
                                pair.Key.Color.R / 255.0f,
                                pair.Key.Color.G / 255.0f,
                                pair.Key.Color.B / 255.0f,
                                pair.Key.Color.A / 255.0f
                            });

                            buffer.Add(new float[]
                            {
                                (float)vertices[line.Item2].X,
                                (float)vertices[line.Item2].Y,
                                (float)vertices[line.Item2].Z,
                                pair.Key.Color.R / 255.0f,
                                pair.Key.Color.G / 255.0f,
                                pair.Key.Color.B / 255.0f,
                                pair.Key.Color.A / 255.0f
                            });
                        }
                    }
                }

                LineRenderingUnit unit = new LineRenderingUnit();
                unit.Count = buffer.Count;
                unit.Buffer = buffer.SelectMany(v => v).ToArray();
                Scene.Add(unit);
            }
        }


        public void DrawPoints(IEnumerable<Vector3D> Points,
                               Color color,
                               PointTypes type,
                               Thickness size,
                               bool IsTopMost = true)
        {
            if (Points.Count() == 0) return;

            float[] buffer = new float[Points.Count() * 8];

            float pointSize = 1.0f;

            if (size == Thickness.Large)
                pointSize = 7.0f;
            if (size == Thickness.Medium)
                pointSize = 4.0f;
            if (size == Thickness.Small)
                pointSize = 2.0f;

            int i = 0;
            int stride = 8;
            foreach (var point in Points)
            {
                buffer[i * stride + 0] = (float)point.X;
                buffer[i * stride + 1] = (float)point.Y;
                buffer[i * stride + 2] = (float)point.Z;
                buffer[i * stride + 3] = pointSize;
                buffer[i * stride + 4] = color.R / 255.0f;
                buffer[i * stride + 5] = color.G / 255.0f;
                buffer[i * stride + 6] = color.B / 255.0f;
                buffer[i * stride + 7] = color.A / 255.0f;

                i++;
            }

            PointRenderingUnit unit = new PointRenderingUnit();
            unit.Buffer = buffer;
            unit.Count = Points.Count();
            Scene.Add(unit);
        }

        public void DrawPoints(IEnumerable<(Vector3D, GraphicsMaterialType material)> Points,
                               PointTypes type,
                               Thickness size,
                               bool IsTopMost = true)
        {
            if (Points.Count() == 0) return;

            float[] buffer = new float[Points.Count() * 8];

            float pointSize = 1.0f;

            if (size == Thickness.Large)
                pointSize = 7.0f;
            if (size == Thickness.Medium)
                pointSize = 4.0f;
            if (size == Thickness.Small)
                pointSize = 2.0f;

            int i = 0;
            int stride = 8;
            foreach (var pair in Points)
            {
                buffer[i * stride + 0] = (float)pair.Item1.X;
                buffer[i * stride + 1] = (float)pair.Item1.Y;
                buffer[i * stride + 2] = (float)pair.Item1.Z;
                buffer[i * stride + 3] = pointSize;
                buffer[i * stride + 4] = pair.material.Color.R / 255.0f;
                buffer[i * stride + 5] = pair.material.Color.G / 255.0f;
                buffer[i * stride + 6] = pair.material.Color.B / 255.0f;
                buffer[i * stride + 7] = pair.material.Color.A / 255.0f;
                i++;
            }

            PointRenderingUnit unit = new PointRenderingUnit();
            unit.Buffer = buffer;
            unit.Count = Points.Count();
            Scene.Add(unit);

            var dict = new Dictionary<Color, List<(Vector3D p, string text)>>();
            foreach (var p in Points)
            {
                if (!dict.TryGetValue(p.material.Color, out var list))
                {
                    list = new List<(Vector3D p, string text)>();
                    dict.Add(p.material.Color, list);
                }
                list.Add((p.Item1, p.material.DisplayName));
            }
            foreach (var d in dict)
                DrawTexts(d.Value, TTFont.NormalFont, AlignTypes.atLeft | AlignTypes.atTop, d.Key, true, Color.WHITE, 1, d.Key);
        }

        public void DrawSurface(ISurfaceDrawInfo surface,
                                Func<int, GraphicsMaterialType> MaterialColorConverter,
                                Func<int, (Color color, LineTypes type, Thickness thick, bool IsTop)> LineTypeConverter,
                                bool isMaterialFill = true,
                                bool IsOutlineDraw = true,
                                IColorGradePalette? ColorTable = null)
        {
            (Color, double)[] colorsAndValues;

            if (isMaterialFill)
            {
                List<float> buffer = new List<float>();
                int count = 0;

                foreach (var pair in surface.Triangles)
                {
                    Color color = MaterialColorConverter(pair.Key).Color;
                    foreach (var t in pair.Value)
                    {
                        foreach (var index in new int[3] { t[0], t[1], t[2] })
                        {
                            (Vector3D, Vector3D, double) vertex = surface.Vertex[index];

                            buffer.Add((float)vertex.Item1.X);
                            buffer.Add((float)vertex.Item1.Y);
                            buffer.Add((float)vertex.Item1.Z);
                            buffer.Add((float)vertex.Item2.X);
                            buffer.Add((float)vertex.Item2.Y);
                            buffer.Add((float)vertex.Item2.Z);
                            buffer.Add(color.R / 255.0f);
                            buffer.Add(color.G / 255.0f);
                            buffer.Add(color.B / 255.0f);
                            buffer.Add(color.A / 255.0f);

                            count++;
                        }
                    }
                }

                Scene.Add(new TriangleRenderingUnit { Buffer = buffer.ToArray(), Count = count });
            }
            else if (ColorTable != null && (colorsAndValues = ColorTable.ColorAndBoundary()).Length >= 3)
            {
                const int TextureSize = 8192;

                double minValue = colorsAndValues.First().Item2;
                double maxValue = colorsAndValues[colorsAndValues.Length - 2].Item2;

                double step = TextureSize / (maxValue - minValue);

                Color minColor = colorsAndValues.First().Item1;
                Color maxColor = colorsAndValues.Last().Item1;

                int prev = 0;
                int size = 0;
                for (int k = 1; k < colorsAndValues.Length - 1; k++)
                {
                    int next = (int)((colorsAndValues[k].Item2 - minValue) * step);
                    size += next - prev;
                    prev = next;
                }

                List<int> textureData = new List<int>();

                prev = 0;
                for (int k = 1; k < colorsAndValues.Length - 1; k++)
                {
                    int next = (int)((colorsAndValues[k].Item2 - minValue) * step);
                    Color color = colorsAndValues[k].Item1;
                    int[] currentcolor = new int[4] { color.R, color.G, color.B, color.A };

                    for (int j = prev; j < next; j++)
                        foreach (var comp in currentcolor)
                            textureData.Add(comp);

                    prev = next;
                }

                SurfaceRenderingUnit unit = new SurfaceRenderingUnit();
                unit.MinValue = (float)minValue;
                unit.MaxValue = (float)maxValue;
                unit.MinColor = minColor;
                unit.MaxColor = maxColor;

                unit.TextureWidth = size;
                unit.TextureHeight = 1;
                unit.TextureData = textureData.ToArray();

                List<float> buffer = new List<float>();
                foreach (var v in surface.Vertex)
                {
                    buffer.Add((float)v.Item1.X);
                    buffer.Add((float)v.Item1.Y);
                    buffer.Add((float)v.Item1.Z);
                    buffer.Add((float)v.Item2.X);
                    buffer.Add((float)v.Item2.Y);
                    buffer.Add((float)v.Item2.Z);
                    buffer.Add((float)v.Item3);
                }

                unit.Buffer = buffer.ToArray();

                List<int[]> linear_triangles = surface.Triangles.SelectMany(kvp => kvp.Value.Where(t => t.Length == 3)).ToList();
                IEnumerable<int[]> quadratic_triangles = surface.Triangles.SelectMany(kvp => kvp.Value.Where(t => t.Length == 6));

                foreach (var t in quadratic_triangles)
                {
                    linear_triangles.Add(new int[3] { t[3], t[4], t[5] });
                    linear_triangles.Add(new int[3] { t[0], t[3], t[5] });
                    linear_triangles.Add(new int[3] { t[1], t[4], t[3] });
                    linear_triangles.Add(new int[3] { t[4], t[2], t[5] });
                }

                unit.Indices = linear_triangles.SelectMany(i => i).ToArray();

                Scene.Add(unit);
            }

            if (IsOutlineDraw && surface.OutLines.Count > 0)
            {
                List<float> buffer = new List<float>();

                var linearIndices = surface.OutLines.Where(i => i.Length == 2).SelectMany(i => i).ToArray();
                foreach (var index in linearIndices)
                {
                    Vector3D vertex = surface.Vertex[index].Item1;
                    buffer.Add((float)vertex.X);
                    buffer.Add((float)vertex.Y);
                    buffer.Add((float)vertex.Z);
                    buffer.Add(surface.OutLineColor.R / 255.0f);
                    buffer.Add(surface.OutLineColor.G / 255.0f);
                    buffer.Add(surface.OutLineColor.B / 255.0f);
                    buffer.Add(surface.OutLineColor.A / 255.0f);
                }

                var quadraticIndices = surface.OutLines.Where(i => i.Length == 3).SelectMany(i => new[] { i[0], i[2], i[2], i[1] });
                foreach (var index in quadraticIndices)
                {
                    Vector3D vertex = surface.Vertex[index].Item1;
                    buffer.Add((float)vertex.X);
                    buffer.Add((float)vertex.Y);
                    buffer.Add((float)vertex.Z);
                    buffer.Add(surface.OutLineColor.R / 255.0f);
                    buffer.Add(surface.OutLineColor.G / 255.0f);
                    buffer.Add(surface.OutLineColor.B / 255.0f);
                    buffer.Add(surface.OutLineColor.A / 255.0f);
                }


                Scene.Add(new LineRenderingUnit { Buffer = buffer.ToArray(), Count = linearIndices.Length + quadraticIndices.Count() });
            }

            {
                List<float> buffer = new List<float>();
                int count = 0;
                foreach (var pair in surface.Lines)
                {
                    Color color = LineTypeConverter(pair.Key).color;
                    var linearIndices = pair.Value.Where(i => i.Length == 2).SelectMany(i => i).ToArray();

                    foreach (var index in linearIndices)
                    {
                        Vector3D vertex = surface.Vertex[index].Item1;
                        buffer.Add((float)vertex.X);
                        buffer.Add((float)vertex.Y);
                        buffer.Add((float)vertex.Z);
                        buffer.Add(color.R / 255.0f);
                        buffer.Add(color.G / 255.0f);
                        buffer.Add(color.B / 255.0f);
                        buffer.Add(color.A / 255.0f);
                    }

                    var quadraticIndices = pair.Value.Where(i => i.Length == 3).SelectMany(i => new[] { i[0], i[2], i[2], i[1] });

                    foreach (var index in quadraticIndices)
                    {
                        Vector3D vertex = surface.Vertex[index].Item1;
                        buffer.Add((float)vertex.X);
                        buffer.Add((float)vertex.Y);
                        buffer.Add((float)vertex.Z);
                        buffer.Add(color.R / 255.0f);
                        buffer.Add(color.G / 255.0f);
                        buffer.Add(color.B / 255.0f);
                        buffer.Add(color.A / 255.0f);
                    }

                    count += linearIndices.Length + quadraticIndices.Count();
                }

                Scene.Add(new LineRenderingUnit { Buffer = buffer.ToArray(), Count = count });
            }
        }

        public void DrawTexts(IEnumerable<(Vector3D p, string text)> Text,
                      TTFont font,
                      AlignTypes mode = AlignTypes.atVCenter,
                      Color Foregraund = default,
                      bool DrawBackground = false,
                      Color Backround = default,
                      int BorderWidth = 0,
                      Color BorderColor = default,
                      bool DrawTitlePoint = false,
                      int dx = 0,
                      int dy = 0) => Scene.Add(new TextRenderingUnit { Texts = Text, AlignMode = mode });

        public void DrawVectors(IEnumerable<(Vector3D pos, Vector3D val, Color color)> Vectors,
                                Color outcolor = default,
                                bool IsBounded = true,
                                bool IsFilled = true,
                                VectorDrawMode mode = VectorDrawMode.Cone,
                                double minValueLen = 0,
                                double minLineValueLen = 0,
                                double minVectorValue = 0,
                                double maxValueLen = 0,
                                double vectorDrawRatio = 0.3,
                                double MinimumVal = 0,
                                double MaximumVal = 3.4028234663852886E+38)
        {
        }
    }
}

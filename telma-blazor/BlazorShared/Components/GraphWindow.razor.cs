using System;
using System.ComponentModel;
using System.Reactive;
using System.Reactive.Linq;
using System.Threading.Tasks;
using BlazorShared.Renderer;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using ReactiveUI;
using Telma;
using Telma.BaseGraphic;
using Telma.UniversalUI;
using Telma.ViewModels;
using TelmaQuasar;

namespace BlazorShared.Components
{
    public struct BoundingRect
    {
        public BoundingRect(int X, int Y, int Width, int Height)
        {
            this.X = X;
            this.Y = Y;
            this.Width = Width;
            this.Height = Height;
        }

        public int X, Y;
        public int Width, Height;
    }

    public partial class GraphWindow : IGraphWindow
    {
        [Inject] public IJSRuntime jsInterop { get; set; }

        public BoundingRect BoundingRect;

        MyDisposer disposer = new MyDisposer();
        BlazorRenderer renderer;

        public GraphWindow()
        {
            RedrawFull = TelmaCommandAssistant.CreateFromTask("RedrawFull", RedrawFullImpl).DisposeWith(disposer);
            RedrawSelected = TelmaCommandAssistant.CreateFromTask("RedrawSelected", RedrawSelectedImpl).DisposeWith(disposer);
            RedrawWithNewScale = TelmaCommandAssistant.Create("RedrawWithNewScale", () => renderer.Invalidate()).DisposeWith(disposer);

            OnGMFull = TelmaCommandAssistant.Create("OnGMFull", () => { if (Canvas != null) Canvas.GridMode = GraphicCanvas.GridModes.Full; }).DisposeWith(disposer);
            OnGMMain = TelmaCommandAssistant.Create("OnGMMain", () => { if (Canvas != null) Canvas.GridMode = GraphicCanvas.GridModes.Main; }).DisposeWith(disposer);
            OnGMNone = TelmaCommandAssistant.Create("OnGMNone", () => { if (Canvas != null) Canvas.GridMode = GraphicCanvas.GridModes.None; }).DisposeWith(disposer);
            OnGMZero = TelmaCommandAssistant.Create("OnGMZero", () => { if (Canvas != null) Canvas.GridMode = GraphicCanvas.GridModes.Zero; }).DisposeWith(disposer);

            OnGMFull.Command.Subscribe(_ => { renderer.Invalidate(); });
            OnGMMain.Command.Subscribe(_ => { renderer.Invalidate(); });
            OnGMNone.Command.Subscribe(_ => { renderer.Invalidate(); });
            OnGMZero.Command.Subscribe(_ => { renderer.Invalidate(); });
        }

        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                renderer = new BlazorRenderer(this, jsInterop);
                renderer.Init(DotNetObjectReference.Create(this));
            }

            base.OnAfterRender(firstRender);
        }

        TelmaCommand<Unit, Unit>? redrawWithNewScale;
        public TelmaCommand<Unit, Unit>? RedrawWithNewScale { get => redrawWithNewScale; private set => this.RaiseAndSetIfChanged(ref redrawWithNewScale, value); }
        TelmaCommand<Unit, Unit>? redrawFull;
        public TelmaCommand<Unit, Unit>? RedrawFull { get => redrawFull; private set => this.RaiseAndSetIfChanged(ref redrawFull, value); }
        TelmaCommand<Unit, Unit>? redrawSelected;
        public TelmaCommand<Unit, Unit>? RedrawSelected { get => redrawSelected; private set => this.RaiseAndSetIfChanged(ref redrawSelected, value); }

        async Task RedrawFullImpl()
        {
            var gi = renderer.Create3DGraphicsInterface();

            Canvas.LocalCoor.XAxis.Width = MMWidth;
            Canvas.LocalCoor.YAxis.Width = MMHeight;
            Canvas.LocalCoor.Update();
            var transform = ViewModel?.CurCoorSys.HasLog() ?? false ? Canvas.LocalCoor : (ICoorTransformation)new EmptyTransformation();
            await Task.Run(() => ViewModel?.ViewModel?.CreateFullScene(gi));
            renderer.UpdateFullScene(gi);
            await RedrawSelectedImpl();
        }

        async Task RedrawSelectedImpl()
        {
            var gi = renderer.Create3DGraphicsInterface();

            Canvas.LocalCoor.XAxis.Width = MMWidth;
            Canvas.LocalCoor.YAxis.Width = MMHeight;
            Canvas.LocalCoor.Update();
            var transform = ViewModel?.CurCoorSys.HasLog() ?? false ? Canvas.LocalCoor : (ICoorTransformation)new EmptyTransformation();
            await Task.Run(() => ViewModel?.DrawSelected(gi));
            renderer.UpdateTempScene(gi);
            renderer.Invalidate();
        }

        public void Paint()
        {
            if (MMHeight == 0 || MMWidth == 0)
                return;

            var gi = renderer.CreateGraphicsInterface(MMWidth, MMHeight);

            renderer.RenderStart();
            if (Canvas.LocalCoor.XAxis.Width != MMWidth || Canvas.LocalCoor.YAxis.Width != MMHeight)
            {
                Canvas.LocalCoor.XAxis.Width = MMWidth;
                Canvas.LocalCoor.YAxis.Width = MMHeight;

                Canvas.LocalCoor.Update();
            }

            this.PrepareCanvas(gi);
            renderer.UpdateProjection(MMWidth, MMHeight, Canvas.LocalCoor);
            renderer.RenderScene();
            this.PostDrawCanvas(gi);

            renderer.RenderEnd();
        }

        [JSInvokable("CanvasSizeChanged")]
        public async Task CanvasSizeChanged(int X, int Y, int Width, int Height)
        {
            BoundingRect = new BoundingRect(X, Y, Width, Height);
            await RedrawFullImpl();
        }

        bool is3DMode;
        public bool Is3DMode { get => is3DMode; set => this.RaiseAndSetIfChanged(ref is3DMode, value); }

        public Vector3D LocalMouseZero { get; set; }
        public GraphicCanvas Canvas { get; set; }

        public double GWCLeft => 0.0;

        public double GWCTop => 0.0;

        public double GWCRight => BoundingRect.Width;

        public double GWCBottom => BoundingRect.Height;

        public double GWCWidth => BoundingRect.Width;

        public double GWCHeight => BoundingRect.Height;

        public double MMWidth => GWCWidth / 96 * 25.4;

        public double MMHeight => GWCHeight / 96 * 25.4;

        TelmaCommand<Unit, Unit>? onGMFull;
        public TelmaCommand<Unit, Unit>? OnGMFull { get => onGMFull; private set => this.RaiseAndSetIfChanged(ref onGMFull, value); }
        TelmaCommand<Unit, Unit>? onGMMain;
        public TelmaCommand<Unit, Unit>? OnGMMain { get => onGMMain; private set => this.RaiseAndSetIfChanged(ref onGMMain, value); }
        TelmaCommand<Unit, Unit>? onGMNone;
        public TelmaCommand<Unit, Unit>? OnGMNone { get => onGMNone; private set => this.RaiseAndSetIfChanged(ref onGMNone, value); }
        TelmaCommand<Unit, Unit>? onGMZero;
        public TelmaCommand<Unit, Unit>? OnGMZero { get => onGMZero; private set => this.RaiseAndSetIfChanged(ref onGMZero, value); }
        TelmaCommand<Unit, Unit>? onGMAsAxis;
        public TelmaCommand<Unit, Unit>? OnGMAsAxis { get => onGMAsAxis; private set => this.RaiseAndSetIfChanged(ref onGMAsAxis, value); }

        Vector3D localMouseCoor;
        public Vector3D LocalMouseCoor { get => localMouseCoor; set => this.RaiseAndSetIfChanged(ref localMouseCoor, value); }
        double prevMouseX;
        public double PrevMouseX { get => prevMouseX; set => this.RaiseAndSetIfChanged(ref prevMouseX, value); }
        double prevMouseY;
        public double PrevMouseY { get => prevMouseY; set => this.RaiseAndSetIfChanged(ref prevMouseY, value); }

        public ButtonState PrevShiftState { get; set; }

        TelmaCommand<int, Unit>? IGraphWindow.OnMouseWheel { get; set; }

        TelmaCommand<int, Unit>? setStandartProjection;
        public TelmaCommand<int, Unit>? SetStandartProjection { get => setStandartProjection; set => this.RaiseAndSetIfChanged(ref setStandartProjection, value); }

        public TelmaCommand<Unit, Unit> OnPressMiddleButton { get; }
        public TelmaCheckCommand LightingEnabled { get; }
        public TelmaCheckCommand HandMode { get; }
        public TelmaCheckCommand AxisOnOff { get; }

        public event PropertyChangedEventHandler? PropertyChanged;

        public Vector2D BackConvertMousePos(Vector3D vector3D) => Canvas?.LocalCoor.BackConvertMousePos(vector3D) ?? vector3D.As2D();

        public void BlockBeforeClose() => throw new NotImplementedException();
        public void RaisePropertyChanged(PropertyChangedEventArgs args) => PropertyChanged?.Invoke(this, args);
        public void SetCursorPos(double x, double y) => x = 5;

        public void OnMouseMoveImpl(double x, double y)
        {
            var res = RegionOnMouse(x, y);
            if (res == MoveMode.mvNone)
            {
                this.DoMousePosCalc(ButtonState.Nothing, x, y);
            }
            else
            {

                switch (res)
                {
                    default:
                        break;
                    case MoveMode.mvLeft:

                        break;
                    case MoveMode.mvRigth:

                        break;
                    case MoveMode.mvUp:

                        break;
                    case MoveMode.mvDown:

                        break;
                    case MoveMode.mvDownLeft:

                        break;
                    case MoveMode.mvDownRigth:

                        break;
                    case MoveMode.mvUpLeft:

                        break;
                    case MoveMode.mvUpRigth:

                        break;
                }
            }
        }

        MoveMode RegionOnMouse(double x, double y)
        {
            int eX = (int)x, eY = (int)y;
            var mouseRegion = MoveMode.mvNone;
            int offset = 15;

            if (eX < offset)
            {
                if (eY < offset) mouseRegion = MoveMode.mvDownLeft;
                else if (eY > GWCHeight - offset) mouseRegion = MoveMode.mvUpLeft;
                else mouseRegion = MoveMode.mvLeft;
            }
            else
                if (eX > GWCWidth - offset && eX < GWCWidth)
            {
                if (eY < offset) mouseRegion = MoveMode.mvDownRigth;
                else if (eY > GWCWidth - offset) mouseRegion = MoveMode.mvUpRigth;
                else mouseRegion = MoveMode.mvRigth;
            }
            else
            {
                if (eY < offset) mouseRegion = MoveMode.mvUp;
                else if (eY > GWCWidth - offset && eY < GWCWidth) mouseRegion = MoveMode.mvDown;
            }
            return mouseRegion;
        }
    }
}

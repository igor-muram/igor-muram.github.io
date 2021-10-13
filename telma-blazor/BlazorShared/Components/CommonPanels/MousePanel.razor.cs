using System;
using System.ComponentModel;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Disposables;
using BlazorShared.Services;
using Microsoft.AspNetCore.Components;
using ReactiveUI;
using Telma;
using Telma.UniversalUI;
using Telma.ViewModels;

namespace BlazorShared.Components.CommonPanels
{
    public partial class MousePanel : IBaseMouse
    {
        [Inject] public MousePanelService service { get; set; }

        bool isFixX;
        public bool IsFixX { get => isFixX; set => this.RaiseAndSetIfChanged(ref isFixX, value); }

        bool isFixY;
        public bool IsFixY { get => isFixY; set => this.RaiseAndSetIfChanged(ref isFixY, value); }

        bool isFixZ;
        public bool IsFixZ { get => isFixZ; set => this.RaiseAndSetIfChanged(ref isFixZ, value); }

        int iXLogOrder;
        public int IXLogOrder { get => iXLogOrder; set => this.RaiseAndSetIfChanged(ref iXLogOrder, value); }

        int iYLogOrder;
        public int IYLogOrder { get => iYLogOrder; set => this.RaiseAndSetIfChanged(ref iYLogOrder, value); }

        int iZLogOrder;
        public int IZLogOrder { get => iZLogOrder; set => this.RaiseAndSetIfChanged(ref iZLogOrder, value); }

        bool logScaleX;
        public bool LogScaleX { get => logScaleX; set => this.RaiseAndSetIfChanged(ref logScaleX, value); }

        bool logScaleY;
        public bool LogScaleY { get => logScaleY; set => this.RaiseAndSetIfChanged(ref logScaleY, value); }

        bool logScaleZ;
        public bool LogScaleZ { get => logScaleZ; set => this.RaiseAndSetIfChanged(ref logScaleZ, value); }

        int coordinateSystemType;
        public int CoordinateSystemType { get => coordinateSystemType; set => this.RaiseAndSetIfChanged(ref coordinateSystemType, value); }

        public TelmaCommand<Unit, bool> CloseQuery => throw new NotImplementedException();

        public TelmaCommand<Unit, Unit> Close => throw new NotImplementedException();

        public string Title => throw new NotImplementedException();

        public object AsRibbon => throw new NotImplementedException();

        MyDisposer disposer = new MyDisposer();

        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                TelmaComponentUIAggregator.OnMouseUIActivation(this, disposer);

                this.WhenAnyValue(c => c.ViewModel.MouseEffect).Subscribe(eff =>
                    {
                        service.IsFixX = IsFixX = eff == MouseEffects.meFixedX;
                        service.IsFixY = IsFixY = eff == MouseEffects.meFixedY;
                        service.IsFixZ = IsFixZ = eff == MouseEffects.meFixedZ;
                    });
                this.WhenAnyValue(t => t.IsFixX).Subscribe(x =>
                {
                    if (x) ViewModel.MouseEffect = MouseEffects.meFixedX;
                    else if (ViewModel.MouseEffect == MouseEffects.meFixedX) ViewModel.MouseEffect = MouseEffects.meNormal;
                });
                this.WhenAnyValue(t => t.IsFixY).Subscribe(y =>
                {
                    if (y) ViewModel.MouseEffect = MouseEffects.meFixedY;
                    else if (ViewModel.MouseEffect == MouseEffects.meFixedY) ViewModel.MouseEffect = MouseEffects.meNormal;
                });
                this.WhenAnyValue(t => t.IsFixZ).Subscribe(z =>
                {
                    if (z) ViewModel.MouseEffect = MouseEffects.meFixedZ;
                    else if (ViewModel.MouseEffect == MouseEffects.meFixedZ) ViewModel.MouseEffect = MouseEffects.meNormal;
                });
                this.WhenAnyValue(t => t.ViewModel.VisibleMouseCoord).ObserveOn(RxApp.MainThreadScheduler).
                Subscribe(c =>
                {
                    service.MouseX = c.X;
                    service.MouseY = c.Y;
                    service.MouseZ = c.Z;
                });
                this.Bind(ViewModel, v => v.MouseCoorType, m => m.CoordinateSystemType, x => (int)x, x => (MouseCoorTypes)x);
                this.WhenAnyValue(v => v.ViewModel.CurCoorSys.Xname).Subscribe(name => service.XMouseLabel = name);
                this.WhenAnyValue(v => v.ViewModel.CurCoorSys.Yname).Subscribe(name => service.YMouseLabel = name);
                this.WhenAnyValue(v => v.ViewModel.CurCoorSys.Zname).Subscribe(name => service.ZMouseLabel = name);
                this.WhenAnyValue(v => v.ViewModel.MouseCoorType).Subscribe(m =>
                {
                    switch (m)
                    {
                        case MouseCoorTypes.mcGlobalDecart:
                            service.XMouseLabel = ViewModel.CurCoorSys.Xname;
                            service.YMouseLabel = ViewModel.CurCoorSys.Yname;
                            service.ZMouseLabel = ViewModel.CurCoorSys.Zname;
                            break;
                        case MouseCoorTypes.mcLocalDecart:
                            service.XMouseLabel = ViewModel.CurCoorSys.Xname + "l";
                            service.YMouseLabel = ViewModel.CurCoorSys.Yname + "l";
                            service.ZMouseLabel = ViewModel.CurCoorSys.Zname + "l";
                            break;
                        case MouseCoorTypes.mcLocalPolar:
                            service.XMouseLabel = "R";
                            service.YMouseLabel = "φ";
                            service.ZMouseLabel = ViewModel.CurCoorSys.Zname;
                            break;
                    }
                });
            }

            base.OnAfterRender(firstRender);
        }

        public void RaisePropertyChanged(PropertyChangedEventArgs args) => PropertyChanged?.Invoke(this, args);
        public event PropertyChangedEventHandler? PropertyChanged;
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using ReactiveUI;
using Telma;
using Telma.Geometry;
using Telma.UniversalUI;
using TelmaQuasar;

namespace BlazorShared.Components.Inputs
{
    public partial class PointInput : IReactiveNotifier
    {
        [Parameter] public ParameterPoint3D Source { get; set; } = default(Vector3D);
        [Parameter] public IGraphWindow Win { get; set; }

        public ParameterPoint3D PointValue
        {
            get => Source;
            set
            {
                Source = value;
                OnChange?.Invoke(value);
            }
        }

        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                this.WhenAnyValue(t => t.PointValue, t => t.LocalZero)
                .Where(p => p.Item1 != null & p.Item2 != null)
                .Select(parm => Win == null ? parm.Item1 : new ParameterPoint3D(Win.Canvas?.LocalCoor.ViewPlane.ToLocal(PointValue) ?? default(Vector3D) - (Vector3D)LocalZero))
                .Subscribe(p => this.RaiseAndSetIfChanged(ref _LocalDecart, p, "LocalDecart"));

                this.WhenAnyValue(t => t.LocalDecart)
                .Where(p => p != null)
                .Select(p => new ParameterPoint2D(Vector2D.Vec(p.Value.As2D().R(), p.Value.As2D().PhiDegrees())))
                .Subscribe(p => this.RaiseAndSetIfChanged(ref _LocalPolar, p, "LocalPolar"));

               // this.Bind(Win, w => w.LocalMouseZero, p => p.LocalZero, p => new ParameterPoint3D(p), p => p.Value);
            }

            base.OnAfterRender(firstRender);
        }

        private ParameterPoint3D _LocalDecart = default(Vector3D);
        public ParameterPoint3D LocalDecart
        {
            get => _LocalDecart;
            set => PointValue = new ParameterPoint3D(Win?.Canvas?.LocalCoor.ViewPlane.ToGlobal(value + LocalZero) ?? value);
        }

        private ParameterPoint2D _LocalPolar = default(Vector2D);
        public ParameterPoint2D LocalPolar { get => _LocalPolar; set => LocalDecart = new Vector2D(value.X, value.Y, AngleMeasureUnits.amuDegrees).As3D(); }

        ParameterPoint3D _LocalZero = default(Vector3D);
        public ParameterPoint3D LocalZero { get => _LocalZero; set => this.RaiseAndSetIfChanged(ref _LocalZero, value); }

        public event PropertyChangedEventHandler PropertyChanged;
        public void RaisePropertyChanged(PropertyChangedEventArgs args) => PropertyChanged?.Invoke(this, args);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using BlazorShared.Services;
using Microsoft.AspNetCore.Components;
using ReactiveUI;
using Telma.UniversalUI;
using Telma.ViewModels;

namespace BlazorShared.Components.Sections
{
    partial class AddSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public TelbasePanelService service { get; set; }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && (m.Item1 == PlaneView.AddObjectModes.HiperbolicCurve ||
                    m.Item1 == PlaneView.AddObjectModes.PolynomRFiCurve || m.Item1 == PlaneView.AddObjectModes.PolynomXYCurve)).
                            Subscribe(t => service.IsAddCurveMode = t);

            service.OnStateChanged += (sender, args) => StateHasChanged();
        }
    }
}

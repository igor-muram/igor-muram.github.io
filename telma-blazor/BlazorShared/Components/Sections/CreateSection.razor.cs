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
    partial class CreateSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public TelbasePanelService service { get; set; }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                     Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.Line).
                             Subscribe(t => service.IsAddLineMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.Arc).
                            Subscribe(t => service.IsAddArcMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.BoundaryPoint).
                            Subscribe(t => service.IsAddPointOnBoundaryMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.Nail).
                            Subscribe(t => service.IsAddNailMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.Group).
                            Subscribe(t => service.IsAddGroupMode = t);

            service.OnStateChanged += (sender, args) => StateHasChanged();
        }
    }
}

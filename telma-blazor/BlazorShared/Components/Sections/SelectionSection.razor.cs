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
    partial class SelectionSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public TelbasePanelService service { get; set; }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            ViewModel.WhenAnyValue(v => v.PlaneView.SelectObjectMode, v => v.WorkType).
                    Select(m => m.Item2 != TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.SelectObjectModes.Node).
                            Subscribe(t => service.IsNodeMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.SelectObjectMode, v => v.WorkType).
                    Select(m => m.Item2 != TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.SelectObjectModes.Boundary).
                            Subscribe(t => service.IsBoundaryMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.SelectObjectMode, v => v.WorkType).
                    Select(m => m.Item2 != TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.SelectObjectModes.Group).
                            Subscribe(t => service.IsGroupMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.SelectObjectMode, v => v.WorkType).
                    Select(m => m.Item2 != TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.SelectObjectModes.InternalNodesForCurvelinearBoundaries).
                            Subscribe(t => service.IsPositionPointMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.SelectObjectMode, v => v.WorkType).
                    Select(m => m.Item2 != TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.SelectObjectModes.Nail).
                            Subscribe(t => service.IsNailMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.SelectObjectMode, v => v.WorkType).
                    Select(m => m.Item2 != TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.SelectObjectModes.Polygon).
                            Subscribe(t => service.IsPolygonMode = t);

            ViewModel.PlaneView.SelectedNodes.CountChanged.Subscribe(t => service.SelectedNodesNumber = t);
            ViewModel.PlaneView.SelectedNails.CountChanged.Subscribe(t => service.SelectedNailsNumber = t);
            ViewModel.PlaneView.SelectedParts.CountChanged.Subscribe(t => service.SelectedBoundariesNumber = t);
            ViewModel.PlaneView.SelectedPositions.CountChanged.Subscribe(t => service.SelectedPositionPointNumber = t);

            service.OnStateChanged += (sender, args) => StateHasChanged();
        }
    }
}

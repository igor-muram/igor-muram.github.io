using System;
using System.Collections.ObjectModel;
using System.Reactive.Linq;
using BlazorShared.Data;
using BlazorShared.Services;
using DynamicData;
using DynamicData.Binding;
using Microsoft.AspNetCore.Components;
using ReactiveUI;
using Telma.BaseGraphic;
using Telma.UniversalUI;
using Telma.ViewModels;

namespace BlazorShared.Components.Telbase
{
    public partial class TelbasePanel
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public TelbasePanelService service { get; set; }

        public ReadOnlyObservableCollection<GraphicsMaterialType> MaterialCollection;
        public ReadOnlyObservableCollection<GraphicsMaterialType> BoundaryCollection;

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
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && (m.Item1 == PlaneView.AddObjectModes.HiperbolicCurve ||
                    m.Item1 == PlaneView.AddObjectModes.PolynomRFiCurve || m.Item1 == PlaneView.AddObjectModes.PolynomXYCurve)).
                            Subscribe(t => service.IsAddCurveMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.BoundaryPoint).
                            Subscribe(t => service.IsAddPointOnBoundaryMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.Nail).
                            Subscribe(t => service.IsAddNailMode = t);
            ViewModel.WhenAnyValue(v => v.PlaneView.AddObjectMode, v => v.WorkType).
                    Select(m => m.Item2 == TelmaComponent.WorkTypes.AddObjects && m.Item1 == PlaneView.AddObjectModes.Group).
                            Subscribe(t => service.IsAddGroupMode = t);
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

            //service.OnStateChanged += (sender, args) => StateHasChanged();
        }

        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                ViewModel.PlaneView.Catalog.MaterialsConnect().
                Sort(SortExpressionComparer<GraphicsMaterialType>.Ascending(e => e.DisplayName))
                .Bind(out MaterialCollection).Subscribe(_ => InvokeAsync(() => StateHasChanged()));

                ViewModel.PlaneView.Catalog.BoundariesConnect().
                    Sort(SortExpressionComparer<GraphicsMaterialType>.Ascending(e => e.DisplayName))
                    .Bind(out BoundaryCollection).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
            }

#if DEBUG
            Console.WriteLine("TelbasePanel_OnAfterRender");
#endif
        }

        void EditMaterialEvent(EditableListItemData data)
        {
            if (ViewModel.RenameMaterial != null)
                ViewModel.RenameMaterial.Command.Execute((data.OldValue, data.NewValue));
        }

        void AddMaterialEvent(EditableListItemData data)
        {
            if (ViewModel.AddMaterial != null)
                ViewModel.AddMaterial.Command.Execute(data.NewValue);
        }

        void DeleteMaterialEvent(EditableListItemData data)
        {
            if (ViewModel.DeleteMaterial != null)
                ViewModel.DeleteMaterial.Command.Execute(data.OldValue);
        }

        void MaterialColorEdit(string displayName, Color color)
        {
            GraphicsMaterialType mat = new GraphicsMaterialType(color, displayName);
            ViewModel.Catalog.MaterialsRemove(mat.DisplayName);
            ViewModel.Catalog.AddOrUpdateMaterial(mat);
            ViewModel.RedrawFull.OnNext(default);
        }

        void EditBoundaryEvent(EditableListItemData data)
        {
            if (ViewModel.RenameCondition != null)
                ViewModel.RenameCondition.Command.Execute((data.OldValue, data.NewValue));
        }

        void AddBoundaryEvent(EditableListItemData data)
        {
            if (ViewModel.AddCondition != null)
                ViewModel.AddCondition.Command.Execute(data.NewValue);
        }

        void DeleteBoundaryEvent(EditableListItemData data)
        {
            if (ViewModel.DeleteCondition != null)
                ViewModel.DeleteCondition.Command.Execute(data.OldValue);
        }

        void BoundaryColorEdit(string displayName, Color color)
        {
            GraphicsMaterialType boundary = new GraphicsMaterialType(color, displayName);
            ViewModel.Catalog.BoundariesRemove(boundary.DisplayName);
            ViewModel.Catalog.AddOrUpdateBoundary(boundary);
            ViewModel.RedrawFull.OnNext(default);
        }
    }
}

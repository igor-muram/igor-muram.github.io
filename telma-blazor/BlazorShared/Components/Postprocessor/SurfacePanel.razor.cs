using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using DynamicData;
using DynamicData.Binding;
using ReactiveUI;
using Telma;
using Telma.BaseGraphic;
using Telma.ViewModels;

namespace BlazorShared.Components.Postprocessor
{
    partial class SurfacePanel
    {
        public Dictionary<Color, string> ColorValueMap;

        private ParameterFloat cGvalIsolineMin = 0;
        public ParameterFloat CGvalIsolineMin { get => cGvalIsolineMin; set { cGvalIsolineMin = value; InvokeAsync(() => StateHasChanged()); } }

        private ParameterFloat cGvalIsolineMax = 1;
        public ParameterFloat CGvalIsolineMax { get => cGvalIsolineMax; set { cGvalIsolineMax = value; InvokeAsync(() => StateHasChanged()); } }

        public TelmaCheckCommand GradeDraw { get; } = new TelmaCheckCommand();
        public TelmaCheckCommand MaterialDraw { get; } = new TelmaCheckCommand();
        public TelmaCheckCommand MeshDraw { get; } = new TelmaCheckCommand();

        ReadOnlyObservableCollection<string>? activeSurfaceGroup;
        public ReadOnlyObservableCollection<string>? ActiveSurfaceGroup => activeSurfaceGroup;

        public TelmaCommand<Unit, Unit> OnEditSurfaceProperties { get; private set; }
        public TelmaCommand<Unit, Unit> OnDeleteSurface { get; private set; }
        public TelmaCommand<Unit, Unit> UpdateGradeView { get; private set; }

        ScalarValueSelector valueSelector;

        public SurfacePanel()
        {

        }

        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                ViewModel.SurfaceViews.Connect().Transform(t => t.Name).Sort(SortExpressionComparer<string>.Ascending(s => s)).Bind(out activeSurfaceGroup).Subscribe();

                OnEditSurfaceProperties = TelmaCommandAssistant.CreateFromTask("OnEditSurfaceProperties",
                       async () => await ViewModel.EditSurface.Handle(ViewModel.ActiveSurfaceView!),
                       canExecute: ViewModel.WhenAnyValue(v => v.ActiveSurfaceView).Select(v => v != null));

                OnDeleteSurface = TelmaCommandAssistant.CreateFromTask("OnDeleteSurface",
                           async () => await ViewModel.OnDeleteSurface.Command.Execute(ViewModel.ActiveSurfaceView!.Name),
                                   canExecute: this.WhenAnyValue(v => v.ActiveSurfaceGroup!.Count).Select(v => v > 1));

                UpdateGradeView = TelmaCommandAssistant.Create("UpdateGradeView", () => { UpdateGradeViewImpl(); InvokeAsync(() => StateHasChanged()); });


                this.OneWayBind(ViewModel, v => v.ActiveSurfaceView!.GradeDraw.UpdateCommand, t => t.GradeDraw.UpdateCommand, c => c);
                this.OneWayBind(ViewModel, v => v.ActiveSurfaceView!.GradeDraw.IsChecked, t => t.GradeDraw.IsChecked, c => c);
                this.OneWayBind(ViewModel, v => v.ActiveSurfaceView!.MaterialDraw.IsChecked, t => t.MaterialDraw.IsChecked, c => c);
                this.OneWayBind(ViewModel, v => v.ActiveSurfaceView!.MaterialDraw.UpdateCommand, t => t.MaterialDraw.UpdateCommand, c => c);
                this.OneWayBind(ViewModel, v => v.ActiveSurfaceView!.MeshDraw.UpdateCommand, t => t.MeshDraw.UpdateCommand, c => c);
                this.OneWayBind(ViewModel, v => v.ActiveSurfaceView!.MeshDraw.IsChecked, t => t.MeshDraw.IsChecked, c => c);

                this.WhenAnyValue(t => t.ViewModel.ActiveSurfaceView!.ColorGradePalette.MaxValue).Subscribe(g => CGvalIsolineMax = g);
                this.WhenAnyValue(t => t.ViewModel.ActiveSurfaceView!.ColorGradePalette.MinValue).Subscribe(g => CGvalIsolineMin = g);
                ViewModel.RedrawFull.Subscribe(_ => UpdateGradeView.Execute(null));

                ViewModel.WhenAnyValue(v => v.ActiveSurfaceView).Subscribe(v => { if (valueSelector != null) valueSelector.ViewModel = v; });
            }

            base.OnAfterRender(firstRender);     
        }

        void UpdateGradeViewImpl()
        {
            if (ViewModel.ActiveSurfaceView == null || ViewModel.ActiveSurfaceView.ColorGradePalette == null) return;

            var grade = ViewModel.ActiveSurfaceView.ColorGradePalette;
            var bars = grade.InterpolateForTitle(grade.MaxDrawGrades);
            if (bars == null) return;

            char formattype = grade.IsExponentDraw ? 'E' : 'G';
            var format = $"{{0:{formattype}{grade.Precision}}}";

            ColorValueMap = new Dictionary<Color, string>();

            for (int i = 0; i < bars.Length; i++)
                ColorValueMap.Add(bars[i].Item1, string.Format(format, bars[i].Item2));
        }
    }
}

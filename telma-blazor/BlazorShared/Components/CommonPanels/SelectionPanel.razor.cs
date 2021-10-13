using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using BlazorShared.Services;
using DynamicData;
using Microsoft.AspNetCore.Components;
using ReactiveUI;
using Telma.UniversalUI;
using Telma.ViewModels;
using static Telma.UniversalUI.TelmaComponentUIAggregator;

namespace BlazorShared.Components.CommonPanels
{
    public partial class SelectionPanel
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public SelectionPanelService service { get; set; }

        public TelmaCommand<Unit, Unit>? OnSetSingleMode { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetGroupMode { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetPointSelector { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetRectSelector { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetCircleSelector { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetSelMethod { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetUnselMethod { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetInvMethod { get; private set; }

        public ReadOnlyObservableCollection<string> MaterialNames;
        public ReadOnlyObservableCollection<string> BoundaryNames;

        SelectionMethods lastmethod;

        public SelectionPanel()
        {
            OnSetSingleMode = TelmaCommandAssistant.Create("OnSetSingleMode", () => { Aggregator.SelectionMethod = SelectionMethods.Single; });
            OnSetGroupMode = TelmaCommandAssistant.Create("OnSetGroupMode", () => { Aggregator.SelectionMethod = lastmethod; });
            OnSetPointSelector = TelmaCommandAssistant.Create("OnSetPointSelector", () => { Aggregator.SelectorType = SelectorTypes.stPoint; });
            OnSetRectSelector = TelmaCommandAssistant.Create("OnSetRectSelector", () => { Aggregator.SelectorType = SelectorTypes.stRectangle; });
            OnSetCircleSelector = TelmaCommandAssistant.Create("OnSetCircleSelector", () => { Aggregator.SelectorType = SelectorTypes.stCircle; });
            OnSetSelMethod = TelmaCommandAssistant.Create("OnSetSelMethod", () => { lastmethod = Aggregator.SelectionMethod = SelectionMethods.Select; });
            OnSetUnselMethod = TelmaCommandAssistant.Create("OnSetUnselMethod", () => { lastmethod = Aggregator.SelectionMethod = SelectionMethods.Unselect; });
            OnSetInvMethod = TelmaCommandAssistant.Create("OnSetInvMethod", () => { lastmethod = Aggregator.SelectionMethod = SelectionMethods.Inverse; });
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            lastmethod = Aggregator.SelectionMethod;
            if (lastmethod == SelectionMethods.Single) lastmethod = SelectionMethods.Inverse;

            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Single).Subscribe(t => service.IsSingleMode = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m != SelectionMethods.Single).Subscribe(t => service.IsGroupMode = t);
            Aggregator.WhenAnyValue(v => v.SelectorType).Select(m => m == SelectorTypes.stPoint).Subscribe(t => service.IsPointSelector = t);
            Aggregator.WhenAnyValue(v => v.SelectorType).Select(m => m == SelectorTypes.stRectangle).Subscribe(t => service.IsRectSelector = t);
            Aggregator.WhenAnyValue(v => v.SelectorType).Select(m => m == SelectorTypes.stCircle).Subscribe(t => service.IsCircleSelector = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Inverse).Subscribe(t => service.SelectionMethodInverse = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Select).Subscribe(t => service.SelectionMethodSelect = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Unselect).Subscribe(t => service.SelectionMethodUnselect = t);

            service.OnStateChanged += (sender, args) => InvokeAsync(() => StateHasChanged());

            switch (ViewModel)
            {
                case PostProcessorComponent pst:
                    pst.Problem.CurrentCatalog?.Catalog.MatCat.Enumerate().Select(c => c.Key).AsObservableChangeSet().Bind(out MaterialNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    pst.Problem.CurrentCatalog?.Catalog.BoundCat.Enumerate().Select(c => c.Key).AsObservableChangeSet().Bind(out BoundaryNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    break;
                case ProcessorManagerComponent pmc:
                    pmc.WhenAnyValue(c => c.ScreenProblem.CurrentCatalog!.Catalog)
                    .Subscribe(c =>
                    {
                        c.MatCat.Enumerate().Select(cc => cc.Key).AsObservableChangeSet().Bind(out MaterialNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                        c.BoundCat.Enumerate().Select(cc => cc.Key).AsObservableChangeSet().Bind(out BoundaryNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    });
                    break;
#if !LABVERSION
                case TelPrep3DComponent tp3d:
                    tp3d.Catalog.MaterialsConnect().Transform(t => t.DisplayName).Bind(out MaterialNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    tp3d.Catalog.BoundariesConnect().Transform(t => t.DisplayName).Bind(out BoundaryNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    break;
#endif
                case TelbaseComponent tp2d:
                    tp2d.Catalog.MaterialsConnect().Transform(t => t.DisplayName).Bind(out MaterialNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    tp2d.Catalog.BoundariesConnect().Transform(t => t.DisplayName).Bind(out BoundaryNames).Subscribe(_ => InvokeAsync(() => StateHasChanged()));
                    break;
            }
        }

#if DEBUG
        protected override void OnAfterRender(bool firstRender)
        {
            base.OnAfterRender(firstRender);

            Console.WriteLine("SelectionPanel_OnAfterRender");
        }
#endif
    }
}

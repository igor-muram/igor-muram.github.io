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
using static Telma.UniversalUI.TelmaComponentUIAggregator;

namespace BlazorShared.Components.Sections
{
    partial class SelectorSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public SelectionPanelService service { get; set; }

        public TelmaCommand<Unit, Unit>? OnSetPointSelector { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetRectSelector { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetCircleSelector { get; private set; }

        SelectionMethods lastmethod;

        public SelectorSection()
        {
            OnSetPointSelector = TelmaCommandAssistant.Create("OnSetPointSelector", () => { Aggregator.SelectorType = SelectorTypes.stPoint; });
            OnSetRectSelector = TelmaCommandAssistant.Create("OnSetRectSelector", () => { Aggregator.SelectorType = SelectorTypes.stRectangle; });
            OnSetCircleSelector = TelmaCommandAssistant.Create("OnSetCircleSelector", () => { Aggregator.SelectorType = SelectorTypes.stCircle; });
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            lastmethod = Aggregator.SelectionMethod;
            if (lastmethod == SelectionMethods.Single) lastmethod = SelectionMethods.Inverse;

            Aggregator.WhenAnyValue(v => v.SelectorType).Select(m => m == SelectorTypes.stPoint).Subscribe(t => service.IsPointSelector = t);
            Aggregator.WhenAnyValue(v => v.SelectorType).Select(m => m == SelectorTypes.stRectangle).Subscribe(t => service.IsRectSelector = t);
            Aggregator.WhenAnyValue(v => v.SelectorType).Select(m => m == SelectorTypes.stCircle).Subscribe(t => service.IsCircleSelector = t);

            service.OnStateChanged += (sender, args) => StateHasChanged();
        }
    }
}

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
    partial class WorkModeSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public SelectionPanelService service { get; set; }

        public TelmaCommand<Unit, Unit>? OnSetSingleMode { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetGroupMode { get; private set; }

        SelectionMethods lastmethod;

        public WorkModeSection()
        {
            OnSetSingleMode = TelmaCommandAssistant.Create("OnSetSingleMode", () => { Aggregator.SelectionMethod = SelectionMethods.Single; });
            OnSetGroupMode = TelmaCommandAssistant.Create("OnSetGroupMode", () => { Aggregator.SelectionMethod = lastmethod; });
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            lastmethod = Aggregator.SelectionMethod;
            if (lastmethod == SelectionMethods.Single) lastmethod = SelectionMethods.Inverse;

            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Single).Subscribe(t => service.IsSingleMode = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m != SelectionMethods.Single).Subscribe(t => service.IsGroupMode = t);

            service.OnStateChanged += (sender, args) => InvokeAsync(() => StateHasChanged());
        }
    }
}

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
    partial class SelectionMethodSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
        [Inject] public SelectionPanelService service { get; set; }

        public TelmaCommand<Unit, Unit>? OnSetSelMethod { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetUnselMethod { get; private set; }
        public TelmaCommand<Unit, Unit>? OnSetInvMethod { get; private set; }

        SelectionMethods lastmethod;

        public SelectionMethodSection()
        {
            OnSetSelMethod = TelmaCommandAssistant.Create("OnSetSelMethod", () => { lastmethod = Aggregator.SelectionMethod = SelectionMethods.Select; });
            OnSetUnselMethod = TelmaCommandAssistant.Create("OnSetUnselMethod", () => { lastmethod = Aggregator.SelectionMethod = SelectionMethods.Unselect; });
            OnSetInvMethod = TelmaCommandAssistant.Create("OnSetInvMethod", () => { lastmethod = Aggregator.SelectionMethod = SelectionMethods.Inverse; });
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            lastmethod = Aggregator.SelectionMethod;
            if (lastmethod == SelectionMethods.Single) lastmethod = SelectionMethods.Inverse;

            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Inverse).Subscribe(t => service.SelectionMethodInverse = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Select).Subscribe(t => service.SelectionMethodSelect = t);
            Aggregator.WhenAnyValue(v => v.SelectionMethod).Select(m => m == SelectionMethods.Unselect).Subscribe(t => service.SelectionMethodUnselect = t);

            service.OnStateChanged += (sender, args) => StateHasChanged();
        }
    }
}

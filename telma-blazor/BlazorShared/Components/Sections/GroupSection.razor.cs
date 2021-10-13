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
using Telma.ViewModels;

namespace BlazorShared.Components.Sections
{
    partial class GroupSection
    {
        public TelmaCommand<Unit, Unit>? AddTitlesView { get; private set; }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            AddTitlesView = TelmaCommandAssistant.CreateFromTask("AddTitlesView", async () =>
            {
                var name = "";
                await ViewModel.OnAddTitlesView.Command.Execute(name);
            });
        }
    }
}

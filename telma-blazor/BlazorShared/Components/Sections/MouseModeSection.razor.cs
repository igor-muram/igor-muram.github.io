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
    partial class MouseModeSection
    {
        [Parameter] public TelmaComponentUIAggregator Aggregator { get; set; }
    }
}

using System;
using System.Reactive.Linq;
using BlazorShared.Services;
using Microsoft.AspNetCore.Components;
using ReactiveUI;

namespace BlazorShared.Components.Blocks
{
    public partial class Footer
    {
        [Inject] public MousePanelService service { get; set; }

        protected override void OnInitialized()
        {
            base.OnInitialized();

            service.OnStateChanged += (sender, args) => InvokeAsync(() => StateHasChanged());
        }
    }
}

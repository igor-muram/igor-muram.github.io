using System.Reactive;
using BlazorShared.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Telma.ViewModels;

namespace BlazorShared.Components.CommonPanels
{
    public partial class FilePanel
    {
        [Inject] public IFileService FileService { get; set; }
        [Inject] public IJSRuntime JSInterop { get; set; }

        public TelmaCommand<Unit, Unit> Save { get; private set; }
        public TelmaCommand<Unit, Unit> Open { get; private set; }

        public FilePanel()
        {
            Save = TelmaCommandAssistant.Create("Save", async () =>
            {
                FileService.Component = ViewModel;
                await JSInterop.InvokeVoidAsync("Popup", "save-name");
            });

            Open = TelmaCommandAssistant.Create("Open", async () => 
            {
                FileService.Component = ViewModel;
                await JSInterop.InvokeVoidAsync("Popup", "load-name"); 
            });
        }
    }
}

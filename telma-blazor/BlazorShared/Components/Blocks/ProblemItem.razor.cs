using System.Reactive;
using BlazorShared.Data;
using BlazorShared.Managers;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using ReactiveUI;
using Telma.ViewModels;

namespace BlazorShared.Components.Blocks
{
    partial class ProblemItem
    {
        [Inject] public IJSRuntime JSInterop { get; set; }
        [Inject] public BlazorComponentManager Manager { get; set; }

        TelmaCommand<Unit, Unit> RunPostprocessor;

        public ProblemItem()
        {
            RunPostprocessor = TelmaCommandAssistant.Create(
                "Run Postprocessor", 
                () => RunPostprocessorImpl(),
                canExecute: this.WhenAnyValue(t => t.ViewModel.ProblemItem!.Problem!.IsSolved));
        }

        void RunPostprocessorImpl()
        {
            Manager.From = ViewModel.Project.Component;
            Manager.Args = new[] { ViewModel.Project.Project.ProjectName, ViewModel.Name };
            JSInterop.InvokeVoidAsync("openNewTab", "/postprocessor");
        }

        void EditProblemEvent(EditableListItemData data) => ViewModel.Project.Project.RenameProblem(data.OldValue, data.NewValue);

        void AddProblemEvent(EditableListItemData data) => ViewModel.Project.Project.AddProblem(data.OldValue, data.NewValue);

        void DeleteProblemEvent(EditableListItemData data) => ViewModel.Project.Project.RemoveProblem(data.OldValue);
    }
}

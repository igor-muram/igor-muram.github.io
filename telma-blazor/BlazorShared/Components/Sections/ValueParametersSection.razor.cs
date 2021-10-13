using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using BlazorShared.Services;
using DynamicData;
using DynamicData.Binding;
using Microsoft.AspNetCore.Components;
using ReactiveUI;
using Telma.ViewModels;

namespace BlazorShared.Components.Sections
{
    partial class ValueParametersSection
    {
        ReadOnlyObservableCollection<string>? activeTitleGroup;
        public ReadOnlyObservableCollection<string>? ActiveTitleGroup => activeTitleGroup;

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            ViewModel.TitlesViews.Connect().Transform(t => t.Name).Sort(SortExpressionComparer<string>.Ascending(s => s)).ObserveOn(RxApp.MainThreadScheduler).Bind(out activeTitleGroup).Subscribe();
        }
    }
}

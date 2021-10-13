using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using DynamicData;
using DynamicData.Binding;
using ReactiveUI;
using Telma.ViewModels;

namespace BlazorShared.Components.Processor
{
    public partial class ProcessorManager
    {
        public TelmaCommand<Unit, Unit>? OnEditSurfaceProperties { get; set; }
        public TelmaCommand<Unit, Unit>? OnDeleteSurface { get; set; }

        ReadOnlyObservableCollection<string>? activeSurfaceGroup;
        public ReadOnlyObservableCollection<string>? ActiveSurfaceGroup => activeSurfaceGroup;

        int runningSeconds;
        public int RunningSeconds { get => runningSeconds; set { runningSeconds = value; InvokeAsync(() => StateHasChanged()); } }

        double valtime;
        public double Valtime { get => valtime; set { valtime = value; InvokeAsync(() => StateHasChanged()); } }

        int nTime;
        public int Ntime { get => nTime; set { nTime = value; InvokeAsync(() => StateHasChanged()); } }

        double residual;
        public double Residual { get => residual; set { residual = value; InvokeAsync(() => StateHasChanged()); } }

        int iter;
        public int Iter { get => iter; set { iter = value; InvokeAsync(() => StateHasChanged()); } }

        bool runningVisibility;
        public bool RunningVisibility { get => runningVisibility; private set { runningVisibility = value; InvokeAsync(() => StateHasChanged()); } }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            OnEditSurfaceProperties = TelmaCommandAssistant.CreateFromTask("OnEditSurfaceProperties", async () =>
            {
                if (ViewModel.ActiveSurfaceView != null) await ViewModel.EditSurface.Handle(ViewModel.ActiveSurfaceView);
            }, canExecute: ViewModel.WhenAnyValue(v => v.ActiveSurfaceView).Select(v => v != null));

            OnDeleteSurface = TelmaCommandAssistant.CreateFromTask("OnDeleteSurface", async () =>
            {
                if (ViewModel.ActiveSurfaceView != null) await ViewModel.OnDeleteSurface.Command.Execute(ViewModel.ActiveSurfaceView.Name);
            }, canExecute: ViewModel.SurfaceViews.CountChanged.Select(v => v > 1));

            ViewModel.SurfaceViews.Connect().Transform(t => t.Name).Sort(SortExpressionComparer<string>.Ascending(s => s)).ObserveOn(RxApp.MainThreadScheduler).Bind(out activeSurfaceGroup).Subscribe();

            this.WhenAnyValue(t => t.ViewModel.CalculationInfo).ObserveOn(RxApp.MainThreadScheduler).Subscribe(t =>
            {
                Ntime = t.tnum;
                Iter = t.iter;
                Residual = t.residual;
                Valtime = t.tval;
            });

            this.WhenAnyValue(t => t.ViewModel.IsCalculating).ObserveOn(RxApp.MainThreadScheduler).Subscribe(t => RunningVisibility = t);

            ViewModel.WhenValueChanged(t => t.IsCalculating).Where(c => c).Subscribe(
                x =>
                {
                    Observable.Interval(new TimeSpan(0, 0, 1)).
                        TakeUntil(ViewModel.WhenAnyValue(t => t.IsCalculating).Where(b => !b)).ObserveOn(RxApp.MainThreadScheduler).
                            Subscribe(t => RunningSeconds = (int)t);
                });
        }
    }
}

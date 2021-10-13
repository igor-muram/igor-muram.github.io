using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Threading.Tasks;
using DynamicData.Binding;
using ReactiveUI;
using Telma;
using Telma.ViewModels;
using TelmaQuasar.Core.Solutions;

namespace BlazorShared.Components.Postprocessor
{
    public partial class ScalarValueSelector : IReactiveNotifier
    {
        TelmaCommand<Unit, Unit> Apply;

        IEnumerable<string>? values;
        public IEnumerable<string>? AvailableValues { get => values; set => this.RaiseAndSetIfChanged(ref values, value); }

        bool isVector;
        bool IsVector { get => isVector; set => this.RaiseAndSetIfChanged(ref isVector, value); }

        int vectorComponent;
        public int VectorComponent { get => vectorComponent; set => this.RaiseAndSetIfChanged(ref vectorComponent, value); }

        string valueName = "";
        public string ValueName { get => valueName; set => this.RaiseAndSetIfChanged(ref valueName, value); }

        public ScalarValueSelector()
        {
            Apply = TelmaCommandAssistant.Create("Apply Value", async () => await ApplyImpl());
        }

        protected override void OnAfterRender(bool firstRender)
        {
            if (firstRender)
            {
                this.WhenAnyValue(t => t.ViewModel).Subscribe(model =>
                {
                    if (model != null)
                    {
                        this.OneWayBind(model, v => v.ValueDescriptor, m => m.ValueName, t => t);
                        if (model is IScalarValueSelectable scalarValueSelectable)
                        {
                            model.WhenAnyValue(v => v.Available).Subscribe(v => AvailableValues = v.OrderBy(s => s));
                            this.OneWayBind(model, v => v.ValueDescriptor, m => m.IsVector, t => SolutionAssistant.IsVector(t) ? true : false);
                            this.OneWayBind(scalarValueSelectable, v => v.ScalarType, m => m.VectorComponent, t => (int)t - 1);
                            this.WhenValueChanged(t => t.ValueName).Where(v => v != null).Subscribe(s =>
                            {
                                if (ViewModel == null) return;
                                if (s == ViewModel.ValueDescriptor)
                                {
                                    if (!IsVector && SolutionAssistant.IsVector(ViewModel.ValueDescriptor)) IsVector = true;
                                    if (IsVector && !SolutionAssistant.IsVector(ViewModel.ValueDescriptor)) IsVector = false;
                                    if (SolutionAssistant.IsVector(ViewModel.ValueDescriptor) && VectorComponent < 0) VectorComponent = (int)scalarValueSelectable.ScalarType + 1;
                                }
                                else
                                {
                                    var desc = scalarValueSelectable.Available.Where(v => v == s).First();
                                    IsVector = SolutionAssistant.IsVector(desc) ? true : false;
                                    if (SolutionAssistant.IsVector(desc) && VectorComponent < 0) VectorComponent = 0;
                                }
                            });
                        }
                        else
                        {
                            model.WhenAnyValue(v => v.Available).Where(v => v != null).
                            Subscribe(v => AvailableValues = v.Where(d => SolutionAssistant.IsVector(d)).OrderBy(s => s));
                            IsVector = false;
                        }
                    }
                });
            }

            base.OnAfterRender(firstRender);
        }

        public void RaisePropertyChanged(PropertyChangedEventArgs args) => PropertyChanged?.Invoke(this, args);

        public event PropertyChangedEventHandler? PropertyChanged;

        async Task ApplyImpl()
        {
            if (ViewModel != null)
            {
                var desc = ViewModel.Available.Where(v => v == ValueName).First();
                if (ViewModel is IScalarValueSelectable scalarValueSelectable)
                    await scalarValueSelectable.SelectScalarValue.Command.Execute((desc, (ScalarFromVectorValueDescriptor)(VectorComponent + 1)));
                else if (ViewModel is IVectorValueSelectable vectorValueSelectable)
                    await vectorValueSelectable.SelectValue.Command.Execute(desc);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO.Compression;
using System.Reactive;
using System.Threading.Tasks;
using BlazorShared.Components.CommonPanels;
using BlazorShared.Components.Sections;
using Microsoft.AspNetCore.Components;
using Telma;
using Telma.Geometry;
using Telma.UniversalUI;
using Telma.ViewModels;

namespace BlazorShared.Components
{
    public partial class MainForm : ITelmaComponentMainForm
    {
        [Parameter] public string Style { get; set; }
        GraphWindow window;
        TelmaComponentUIAggregator aggregator;

        Dictionary<string, List<(Type panelType, Type viewModelType)>> upperPanels = new();
        List<(Type panelType, Type viewModelType, bool isActive)> sidePanels = new();

        protected override void OnInitialized()
        {
            base.OnInitialized();

            AddSidePanel(typeof(SelectionPanel), typeof(TelmaComponent), true);
            AddSidePanel(typeof(ScalePanel), typeof(TelmaComponentUIAggregator), true);
            AddSidePanel(typeof(MousePanel), typeof(TelmaComponentUIAggregator), true);
            AddSidePanel(typeof(FilePanel), typeof(TelmaComponent), true);

            AddUpperPanel("File", typeof(MenuSection), typeof(TelmaComponent));

            AddUpperPanel("Edit", typeof(OtherSection), typeof(TelmaComponent));
            AddUpperPanel("Edit", typeof(MoveSection), typeof(TelmaComponent));
            AddUpperPanel("Edit", typeof(CopySection), typeof(TelmaComponent));

            AddUpperPanel("View", typeof(ScaleSection), typeof(TelmaComponentUIAggregator));
            AddUpperPanel("View", typeof(RotationModeSection), typeof(TelmaComponent));
            AddUpperPanel("View", typeof(GridSection), typeof(TelmaComponent));
            AddUpperPanel("View", typeof(DrawModeSection), typeof(TelmaComponent));

            AddUpperPanel("Mode", typeof(WorkModeSection), typeof(TelmaComponent));
            AddUpperPanel("Mode", typeof(SelectorSection), typeof(TelmaComponent));
            AddUpperPanel("Mode", typeof(SelectionMethodSection), typeof(TelmaComponent));
            AddUpperPanel("Mode", typeof(MouseModeSection), typeof(TelmaComponent));
        }

        protected override void OnParametersSet()
        {
            base.OnParametersSet();

            aggregator = new TelmaComponentUIAggregator(ViewModel);
        }

        protected override void OnAfterRender(bool firstRender)
        {
            base.OnAfterRender(firstRender);

            if (firstRender)
            {
                TelmaComponentUIAggregator.RegisterGraphWindow(aggregator, window, new MyDisposer());
            }
#if DEBUG
            Console.WriteLine("MainForm_OnAfterRender");
#endif
        }

        public void AddSidePanel(Type panelType, Type componentType, bool active)
        {
            sidePanels.Insert(0, (panelType, componentType, active));
            StateHasChanged();
        }

        public void AddUpperPanel(string tabName, Type panelType, Type componentType)
        {
            if (upperPanels.ContainsKey(tabName))
                upperPanels[tabName].Add((panelType, componentType));
            else
            {
                upperPanels.Add(tabName, new List<(Type, Type)>());
                upperPanels[tabName].Add((panelType, componentType));
            }

            StateHasChanged();
        }

        public string FormTitle { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public TelmaCommand<Unit, bool> CloseQuery => throw new NotImplementedException();

        public TelmaCommand<Unit, Unit> Close => throw new NotImplementedException();

        public string Title => throw new NotImplementedException();

        public object AsRibbon => throw new NotImplementedException();
        public void CloseForm() => throw new NotImplementedException();
        public Task<double> DoubleQuestionBoxHandler(QuestionBox<double> message) => throw new NotImplementedException();
        public Task<string> FileDialogHandler(QuestionBox<(string path, string relativeto, bool forread)> input) => throw new NotImplementedException();
        public Task<(ParameterPoint3D, ParameterPoint3D)> LineQuestionBoxHandler(QuestionBox<(ParameterPoint3D, ParameterPoint3D)> input) => throw new NotImplementedException();
        public Task<MessageBox.Result> MessageBoxHandler(MessageBox message) => throw new NotImplementedException();
        public Task<ProjectionPlane> PlaneQuestionBoxHandler(QuestionBox<ProjectionPlane> input) => throw new NotImplementedException();
        public Task<ParameterPoint3D> PointQuestionBoxHandler(QuestionBox<ParameterPoint3D> input) => throw new NotImplementedException();
        public Task PrintDialogHandler() => throw new NotImplementedException();
        public Task<string> TextQuestionBoxHandler(QuestionBox<string> message) => throw new NotImplementedException();
        public Task<Unit> SerializeInterface(ZipArchive input) => throw new NotImplementedException();
        public Task<Unit> DeserializeInterface(ZipArchive input) => throw new NotImplementedException();
        public Task<Unit> TelmaCommandExecutingPrologHandler(Unit input) => throw new NotImplementedException();
        public void RaisePropertyChanged(PropertyChangedEventArgs args) => throw new NotImplementedException();
    }
}

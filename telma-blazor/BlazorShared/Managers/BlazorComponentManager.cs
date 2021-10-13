using System.Collections.Generic;
using BlazorShared.Components;
using Telma.ViewModels;

namespace BlazorShared.Managers
{
    public class BlazorComponentManager : TelmaComponentManager
    {
        public IList<string> Args { get; set; } = null;
        public TelmaComponent From { get; set; } = null;
        public TelmaComponent To { get; set; } = null;

        protected override ITelmaComponentMainForm CreateForms(TelmaComponent component)
        {
            return new MainForm();
        }

        protected override void ShowForm(ITelmaComponentMainForm form)
        {
            
        }

        protected override void Shutdown()
        {
            
        }
    }
}

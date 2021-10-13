using System;

namespace BlazorShared.Services
{
    public class SelectionPanelService
    {
        bool _IsSingleMode;
        public bool IsSingleMode { get => _IsSingleMode; set { _IsSingleMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsGroupMode;
        public bool IsGroupMode { get => _IsGroupMode; set { _IsGroupMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsPointSelector;
        public bool IsPointSelector { get => _IsPointSelector; set { _IsPointSelector = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsRectSelector;
        public bool IsRectSelector { get => _IsRectSelector; set { _IsRectSelector = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsCircleSelector;
        public bool IsCircleSelector { get => _IsCircleSelector; set { _IsCircleSelector = value; OnStateChanged?.Invoke(null, null); } }

        bool _SelectionMethodSelect;
        public bool SelectionMethodSelect { get => _SelectionMethodSelect; set { _SelectionMethodSelect = value; OnStateChanged?.Invoke(null, null); } }

        bool _SelectionMethodUnselect;
        public bool SelectionMethodUnselect { get => _SelectionMethodUnselect; set { _SelectionMethodUnselect = value; OnStateChanged?.Invoke(null, null); } }

        bool _SelectionMethodInverse;
        public bool SelectionMethodInverse { get => _SelectionMethodInverse; set { _SelectionMethodInverse = value; OnStateChanged?.Invoke(null, null); } }

        public event EventHandler OnStateChanged;
    }
}

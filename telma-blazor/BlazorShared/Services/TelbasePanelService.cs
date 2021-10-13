using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorShared.Services
{
    public class TelbasePanelService
    {
        int _SelectedNodesNumber;
        public int SelectedNodesNumber { get => _SelectedNodesNumber; set { _SelectedNodesNumber = value; OnStateChanged?.Invoke(null, null); } }

        int _SelectedBoundariesNumber;
        public int SelectedBoundariesNumber { get => _SelectedBoundariesNumber; set { _SelectedBoundariesNumber = value; OnStateChanged?.Invoke(null, null); } }

        int _SelectedPositionPointNumber;
        public int SelectedPositionPointNumber { get => _SelectedPositionPointNumber; set { _SelectedPositionPointNumber = value; OnStateChanged?.Invoke(null, null); } }

        int _SelectedNailsNumber;
        public int SelectedNailsNumber { get => _SelectedNailsNumber; set { _SelectedNailsNumber = value; OnStateChanged?.Invoke(null, null); } }

        int _SelectedPolygonsNumber;
        public int SelectedPolygonsNumber { get => _SelectedPolygonsNumber; set { _SelectedPolygonsNumber = value; OnStateChanged?.Invoke(null, null); } }

        int _SelectedGroupsNumber;
        public int SelectedGroupsNumber { get => _SelectedGroupsNumber; set { _SelectedGroupsNumber = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsAddLineMode;
        public bool IsAddLineMode { get => _IsAddLineMode; set { _IsAddLineMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsAddArcMode;
        public bool IsAddArcMode { get => _IsAddArcMode; set { _IsAddArcMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsAddCurveMode;
        public bool IsAddCurveMode { get => _IsAddCurveMode; set { _IsAddCurveMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsAddPointOnBoundaryMode;
        public bool IsAddPointOnBoundaryMode { get => _IsAddPointOnBoundaryMode; set { _IsAddPointOnBoundaryMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsAddNailMode;
        public bool IsAddNailMode { get => _IsAddNailMode; set { _IsAddNailMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsAddGroupMode;
        public bool IsAddGroupMode { get => _IsAddGroupMode; set { _IsAddGroupMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsNodeMode;
        public bool IsNodeMode { get => _IsNodeMode; set { _IsNodeMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsBoundaryMode;
        public bool IsBoundaryMode { get => _IsBoundaryMode; set { _IsBoundaryMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsPositionPointMode;
        public bool IsPositionPointMode { get => _IsPositionPointMode; set { _IsPositionPointMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsNailMode;
        public bool IsNailMode { get => _IsNailMode; set { _IsNailMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsPolygonMode;
        public bool IsPolygonMode { get => _IsPolygonMode; set { _IsPolygonMode = value; OnStateChanged?.Invoke(null, null); } }

        bool _IsGroupMode;
        public bool IsGroupMode { get => _IsGroupMode; set { _IsGroupMode = value; OnStateChanged?.Invoke(null, null); } }

        public event EventHandler OnStateChanged;
    }
}

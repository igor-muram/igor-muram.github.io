using System;
using ReactiveUI;

namespace BlazorShared.Services
{
    public class MousePanelService
    {
        bool isFixX;
        public bool IsFixX { get => isFixX; set { isFixX = value; OnStateChanged?.Invoke(null, null); } }

        bool isFixY;
        public bool IsFixY { get => isFixY; set { isFixY = value; OnStateChanged?.Invoke(null, null); } }

        bool isFixZ;
        public bool IsFixZ { get => isFixZ; set { isFixZ = value; OnStateChanged?.Invoke(null, null); } }

        string xMouseLabel = "X";
        public string XMouseLabel { get => xMouseLabel; set { xMouseLabel = value; OnStateChanged?.Invoke(null, null); } }

        string yMouseLabel = "Y";
        public string YMouseLabel { get => yMouseLabel; set { yMouseLabel = value; OnStateChanged?.Invoke(null, null); } }

        string zMouseLabel = "Z";
        public string ZMouseLabel { get => zMouseLabel; set { zMouseLabel = value; OnStateChanged?.Invoke(null, null); } }

        double mouseX;
        public double MouseX { get => mouseX; set { mouseX = value; OnStateChanged?.Invoke(null, null); } }

        double mouseY;
        public double MouseY { get => mouseY; set { mouseY = value; OnStateChanged?.Invoke(null, null); } }

        double mouseZ;
        public double MouseZ { get => mouseZ; set { mouseZ = value; OnStateChanged?.Invoke(null, null); } }

        public event EventHandler OnStateChanged;
    }
}

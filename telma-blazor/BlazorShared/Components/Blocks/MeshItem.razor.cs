using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlazorShared.Data;
using Microsoft.AspNetCore.Components;
using Telma.ViewModels;

namespace BlazorShared.Components.Blocks
{
    partial class MeshItem
    {
        void EditMeshEvent(EditableListItemData data) => ViewModel.Problem.Project.Project.RenameMesh(data.OldValue, data.NewValue);

        void AddMeshEvent(EditableListItemData data) => ViewModel.Problem.Project.Project.AddMesh(data.OldValue, data.NewValue);

        void DeleteMeshEvent(EditableListItemData data) => ViewModel.Problem.Project.Project.RemoveMesh(data.OldValue);
    }
}

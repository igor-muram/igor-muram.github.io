using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BlazorShared.Data;

namespace BlazorShared.Components.Blocks
{
    partial class CatalogItem
    {
        void EditCatalogEvent(EditableListItemData data) => ParentViewModel.Project.Project.RenameCatalog(data.OldValue, data.NewValue);
        void AddCatalogEvent(EditableListItemData data) => ParentViewModel.Project.Project.AddCatalog(data.OldValue, data.NewValue);
        void DeleteCatalogEvent(EditableListItemData data) => ParentViewModel.Project.Project.RemoveCatalog(data.OldValue);
    }
}

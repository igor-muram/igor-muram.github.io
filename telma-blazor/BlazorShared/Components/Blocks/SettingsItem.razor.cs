using BlazorShared.Data;

namespace BlazorShared.Components.Blocks
{
    partial class SettingsItem
    {
        void AddSettingsEvent(EditableListItemData data) => ViewModel.Problem.Project.Project.AddSettings(data.OldValue, data.NewValue);
        void EditSettingsEvent(EditableListItemData data) => ViewModel.Problem.Project.Project.RenameSettings(data.OldValue, data.NewValue);
        void DeleteSettingsEvent(EditableListItemData data) => ViewModel.Problem.Project.Project.RemoveSettings(data.OldValue);
    }
}

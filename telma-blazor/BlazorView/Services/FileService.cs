using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BlazorShared.Services;
using Telma.ViewModels;

namespace BlazorView.Services
{
    public class FileService : IFileService
    {
        public TelmaComponent Component { get; set; }
        public string Filename { get; set; } = "";
        public string[] DirectoryFiles { get; set; }
        public string HomeDirectory { get; }

        public string DefaultFile => throw new NotImplementedException();

        List<string> availableExtensions = new List<string>() { ".telmaproject", ".telma" };

        public event EventHandler OnDirectoryFilesChanged;

        public FileService()
        {
            HomeDirectory = "C:/repos/Telma projects/";
            LoadDirectoryFiles();
        }
        public async Task LoadAsync()
        {
            await Task.Run(() => Component?.LoadFrom.Execute(HomeDirectory + Filename));
            Filename = "";
        }
        public Task SaveAsync()
        {
            Component?.SaveTo.Execute(HomeDirectory + Filename);
            Filename = "";

            LoadDirectoryFiles();
            return Task.CompletedTask;
        }
        void LoadDirectoryFiles()
        {
            DirectoryFiles = Directory.GetFiles(HomeDirectory).Where(file => availableExtensions.Contains(Path.GetExtension(file).ToLower())).Select(file => Path.GetFileName(file)).ToArray();
            OnDirectoryFilesChanged?.Invoke(this, new EventArgs());
        }
    }
}

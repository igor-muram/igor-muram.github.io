using System;
using System.Threading.Tasks;
using Telma.ViewModels;

namespace BlazorShared.Services
{
    public interface IFileService
    {
        public TelmaComponent Component { get; set; }
        public string Filename { get; set; }
        public string[] DirectoryFiles { get; set; }
        public string HomeDirectory { get; }  

        public event EventHandler OnDirectoryFilesChanged;

        public Task SaveAsync();
        public Task LoadAsync();
    }
}

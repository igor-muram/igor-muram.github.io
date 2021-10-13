using System.Collections.Generic;

namespace BlazorShared.Data
{
    public class FileData
    {
        public string ZipArchiveName { get; set; }
        public Dictionary<string, string> Data { get; set; }
        public Dictionary<string, string> InterfaceData { get; set; }
    }
}

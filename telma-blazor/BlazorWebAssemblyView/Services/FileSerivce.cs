using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Reactive;
using System.Threading.Tasks;
using BlazorShared.Data;
using BlazorShared.Services;
using Telma.ViewModels;

namespace BlazorWebAssemblyView.Services
{
    public class FileService : IFileService
    {
        HttpClient httpClient;
        List<string> availableExtensions = new List<string>() { ".Telma" };

        public FileService(string baseAddress)
        {
            httpClient = new HttpClient { BaseAddress = new Uri(baseAddress) };

            Task.Run(LoadFiles);
        }
        async Task LoadFiles()
        {
            HttpResponseMessage response = await httpClient.GetAsync($"/files/getfiles?directory={HomeDirectory}");

            if (response.StatusCode == HttpStatusCode.OK)
            {
                string content = await response.Content.ReadAsStringAsync();

                DirectoryFiles = System.Text.Json.JsonSerializer.Deserialize<string[]>(content);
                DirectoryFiles = DirectoryFiles.Where(file => availableExtensions.Contains(Path.GetExtension(file))).Select(file => Path.GetFileName(file)).ToArray();

                OnDirectoryFilesChanged?.Invoke(null, null);
            }
            else
            {
                throw new Exception("Failed to get files from server");
            }
        }

        public TelmaComponent Component { get; set; }
        public string Filename { get; set; } = "";
        public string[] DirectoryFiles { get; set; }
        public string HomeDirectory => "C:/repos/Telma projects/";

        public event EventHandler OnDirectoryFilesChanged;

        public async Task LoadAsync()
        {
            HttpResponseMessage response = await httpClient.GetAsync($"/files/load?filename={HomeDirectory + Filename}");

            if (response.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Failed to load data from server. Status code {response.StatusCode}");

            FileData? filedata = System.Text.Json.JsonSerializer.Deserialize<FileData>(await response.Content.ReadAsStringAsync());

            if (filedata == null)
                throw new Exception("Failed to parse file data");

            Component.DeserializeData(fname =>
            {
                if (filedata.Data.TryGetValue(fname, out string data))
                {
                    Console.WriteLine(fname);
                    return data;
                }
                Console.WriteLine($"File Not Found {fname} in {Filename}.user.");
                return "null";
            });


            Component.RedrawFull.OnNext(Unit.Default);
            //using (var archive = new ZipArchive(data, ZipArchiveMode.Read))
            //{
            //    Component.DeserializeInterfaceData
            //}
        }

        public async Task SaveAsync()
        {
            FileData saveData = new FileData();
            saveData.ZipArchiveName = HomeDirectory + Filename;
            saveData.Data = new Dictionary<string, string>();
            saveData.InterfaceData = new Dictionary<string, string>();

            Component.SerializeInterfaceData((Name, Data) => saveData.InterfaceData.Add(Name, Data));
            Component.SerializeData((Name, Data) => saveData.Data.Add(Name, Data));

            JsonContent content = JsonContent.Create(saveData);
            HttpResponseMessage response = await httpClient.PostAsync("/files/save", content);

            if (response.IsSuccessStatusCode)
                await LoadFiles();
            else
                throw new Exception($"Failed to save file { Filename }");
        }
    }
}


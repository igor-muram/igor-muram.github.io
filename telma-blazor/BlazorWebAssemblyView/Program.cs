using System;
using System.Threading.Tasks;
using BlazorShared.Managers;
using BlazorShared.Services;
using BlazorWebAssemblyView.Services;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.JSInterop;
using Telma;

namespace BlazorWebAssemblyView
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            System.Globalization.CultureInfo culture = System.Threading.Thread.CurrentThread.CurrentCulture.Clone() as System.Globalization.CultureInfo ?? throw new InvalidCastException();
            culture.NumberFormat = System.Globalization.CultureInfo.InvariantCulture.NumberFormat;
            System.Threading.Thread.CurrentThread.CurrentCulture = culture;
            System.Globalization.CultureInfo.DefaultThreadCurrentCulture = culture;
            System.Globalization.CultureInfo.DefaultThreadCurrentUICulture = culture;

            UILogManager.Init();
            Parser.ParserEvaluator = new BlazorParserEvaluator("https://localhost:5001");

            builder.Services.AddSingleton(sp => sp.GetRequiredService<IJSRuntime>());
            builder.Services.AddSingleton(sp => new BlazorComponentManager());
            builder.Services.AddSingleton<IFileService>(sp => new FileService("https://localhost:5001"));
            builder.Services.AddSingleton(sp => new SelectionPanelService());
            builder.Services.AddSingleton(sp => new TelbasePanelService());
            builder.Services.AddSingleton(sp => new MousePanelService());

            await builder.Build().RunAsync();
        }
    }
}

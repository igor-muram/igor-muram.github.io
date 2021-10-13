using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using BlazorShared.Data;
using Telma;

namespace BlazorShared.Services
{
    public class BlazorParserEvaluator : IParserEvaluator
    {
        HttpClient httpClient;

        public BlazorParserEvaluator(string baseAddress) => httpClient = new HttpClient { BaseAddress = new Uri(baseAddress) };
        
        async void EvaluateScript<T>(string expression, IEnumerable<string> NecessaryVariables,List<T> res)
        {
            HttpResponseMessage response = null;
            switch (typeof(T).Name)
            {
                case "Double":
                    response = await httpClient.PostAsync($"/parser/evaluate/double", JsonContent.Create(new ParseData { Expression = expression, NecessaryVariables = NecessaryVariables }));

                    break;

                case "Vector2D":
                    response = await httpClient.PostAsync($"/parser/evaluate/vector2d", JsonContent.Create(new ParseData { Expression = expression, NecessaryVariables = NecessaryVariables }));
                    break;

                case "Vector3D":
                    response = await httpClient.PostAsync($"/parser/evaluate/vector3d", JsonContent.Create(new ParseData { Expression = expression, NecessaryVariables = NecessaryVariables }) );
                    break;

                case "Bool":
                    response = await httpClient.PostAsync($"/parser/evaluate/bool", JsonContent.Create(new ParseData { Expression = expression, NecessaryVariables = NecessaryVariables }));
                    break;
            }
            if (response != null && response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                res.Add(JsonSerializer.Deserialize<T>(content));
                return;
            }
            throw new Exception("Failed to send request to TelmaWebAPI");
        }

        public T EvaluateScript<T>(string expression, IEnumerable<string> NecessaryVariables)
        {
            List<T> res = new();
            res.Add(default);
            EvaluateScript(expression, NecessaryVariables, res);
            return res.Last();
        }
        async void UsedNames<T>(string expression, List<string> result)
        {
            HttpResponseMessage response = null;
            switch (typeof(T).Name)
            {
                case "Double":
                    var task = httpClient.PostAsync($"/parser/usednames/double", JsonContent.Create(new ParseData { Expression = expression }));
                    response = await task;
                    break;

                case "Vector2D":
                    response = await httpClient.PostAsync($"/parser/usednames/vector2d", JsonContent.Create(new ParseData { Expression = expression }));
                    break;

                case "Vector3D":
                    response = await httpClient.PostAsync($"/parser/usednames/vector3d", JsonContent.Create(new ParseData { Expression = expression })) ;
                    break;

                case "Bool":
                    response = await httpClient.PostAsync($"/parser/usednames/bool", JsonContent.Create(new ParseData { Expression = expression }));
                    break;
            }

            if (response != null && response.IsSuccessStatusCode)
            {
                string content = response.Content.ReadAsStringAsync().Result;
                result = JsonSerializer.Deserialize<IEnumerable<string>>(content).ToList();
                return;
            }
            throw new Exception("Failed to send request to TelmaWebAPI");
        }
        public IEnumerable<string> UsedNames<T>(string expression)
        {
            List<string> res=new();
            UsedNames<T>(expression, res);
            return res;
        }
    }
}

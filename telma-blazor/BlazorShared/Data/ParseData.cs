using System.Collections.Generic;
using System.Linq;

namespace BlazorShared.Data
{
    public class ParseData
    {
        public string Expression { get; set; } = "";
        public IEnumerable<string> NecessaryVariables { get; set; } = Enumerable.Empty<string>();
    }
}

using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace PrintProjects.Core.Model
{
    public sealed class ProjectFile
    {
        public static ProjectFile Load(string projectFilePath)
        {
            if(!File.Exists(projectFilePath))
                throw new ModelException("3D2P.json does not exist!");

            return JsonConvert.DeserializeObject<ProjectFile>(File.ReadAllText(projectFilePath));
        }

        [JsonProperty("name")]
        public string Name { get; set; } = "Mysterious unnamed project";

        [JsonProperty("coverImage")]
        public string CoverImage { get; set; }

        [JsonProperty("repositoryUrl")]
        public string RepositoryUrl { get; set; }

        [JsonProperty("rawRepositoryUrl")]
        public string RawRepositoryUrl { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; } = "WIP";

        [JsonProperty("stls")]
        public List<StlInfo> StlInfoList { get; set; } = new List<StlInfo>();
    }
}
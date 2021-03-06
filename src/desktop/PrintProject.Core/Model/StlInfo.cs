using Newtonsoft.Json;
using System.Collections.Generic;

namespace PrintProject.Core.Model
{
    public sealed class StlInfo
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("color")]
        public string Color { get; set; } = "#F58026";

        [JsonProperty("status")]
        public Status Status { get; set; }

        [JsonProperty("relativePath")]
        public string RelativePath { get; set; }

        [JsonProperty("annotationList")]
        public List<StlAnnotation> AnnotationList { get; set; } = new List<StlAnnotation>();
    }
}
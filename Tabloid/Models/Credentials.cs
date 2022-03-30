using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Credentials
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}

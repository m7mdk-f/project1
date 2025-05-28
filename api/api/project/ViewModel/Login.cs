using System.ComponentModel.DataAnnotations;

namespace project.ViewModel
{
    public class Login
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        public bool? Rememberme { get; set; } = false;
    }
}

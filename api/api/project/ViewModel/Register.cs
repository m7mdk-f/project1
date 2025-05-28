using System.ComponentModel.DataAnnotations;

namespace project.ViewModel
{
    public class Register
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]

        public string? FullName { get; set; }
        [Required]

        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The passwords entered do not match. Please try again.")]
        public string? ConfirmPass { get; set; }

    }
}

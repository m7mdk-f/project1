using Microsoft.AspNetCore.Identity;

namespace project.Model
{
    public class UserModel : IdentityUser<long>
    {
        public string? FullName { get; set; }
        public string? ImageUrl { get; set; }

    }
}

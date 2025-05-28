using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using project.Model;

namespace project.Data
{
    public class ApplicationDbContext : IdentityDbContext<UserModel, IdentityRole<long>, long>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

    }
}

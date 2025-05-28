using Microsoft.AspNetCore.Identity;
using project.Model;

namespace project.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<long>>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<UserModel>>();
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            string[] roleNames = ["Admin", "employee"];

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole<long>(roleName));
                }
            }

            string EmailAdmin = "admin@admin.com";
            string adminPassword = "Admin123";

            var admin = await userManager.FindByEmailAsync(EmailAdmin);

            if (admin is null)
            {
                var adminUser = new UserModel
                {
                    EmailConfirmed = true,
                    UserName = EmailAdmin,
                    Email = EmailAdmin,
                    FullName = "admin admin",

                };

                var createUser = await userManager.CreateAsync(adminUser, adminPassword);

                if (createUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
            string UserEmail = "Ahmed@gmail.com";
            string UserPass = "Mohamed123";
            var usre = await userManager.FindByEmailAsync(UserEmail);


            if (usre is null)
            {
                var UserAccount = new UserModel
                {
                    EmailConfirmed = true,
                    UserName = UserEmail,
                    Email = UserEmail,
                    FullName = "employee employee",


                };
                var results = await userManager.CreateAsync(UserAccount, UserPass);
                if (results.Succeeded)
                {
                    await userManager.AddToRoleAsync(UserAccount, "employee");
                    await context.SaveChangesAsync();
                }

            }


        }

    }
}

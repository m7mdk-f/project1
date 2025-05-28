using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using project.Data;
using project.Model;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<UserModel> userManager;
        public AdminController(ApplicationDbContext context, UserManager<UserModel> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }
        [HttpGet]

        public async Task<IActionResult> Get()
        {
            var user = await userManager.GetUserAsync(User);

            return Ok(user);
        }
    }
}

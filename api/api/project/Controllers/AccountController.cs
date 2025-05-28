using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using project.Model;
using project.Services;
using project.ViewModel;

namespace project.Controllers
{
    public class AccountController : Controller
    {
        private readonly EmailSenderService _emailSender;
        private readonly UserManager<UserModel> _userManager;
        private readonly SignInManager<UserModel> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment env;

        public AccountController(EmailSenderService emailSender, UserManager<UserModel> userManager, SignInManager<UserModel> signInManager, IConfiguration configuration, IWebHostEnvironment env)
        {
            _emailSender = emailSender;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            this.env = env;
        }

        [HttpPost("Create-account")]
        public async Task<IActionResult> Register([FromForm] Register model)
        {
            if (ModelState.IsValid)
            {
                var ValidateEmail = _userManager.FindByEmailAsync(model.Email!);
                if (ValidateEmail == null)
                {
                    return BadRequest($"The Email Is token {model.Email}");
                }
                if (model.Password != model.ConfirmPass)
                {
                    return BadRequest($"Password not match confirm Password");

                }
                var user = new UserModel
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FullName = model.FullName,
                    PhoneNumber = model.PhoneNumber,
                };

                var results = await _userManager.CreateAsync(user, model.Password!);
                if (results.Succeeded)
                {
                    var r = await _userManager.AddToRoleAsync(user, "employee");
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = $"https://localhost:7063/ConfirmEmail?email={user.Email}&token={Uri.EscapeDataString(token)}";

                    var subject = "Confirm your email";
                    var message = $"Please confirm your account by clicking <a href='{confirmationLink}'>here</a>";

                    await _emailSender.SendEmailAsync(user.Email, subject, message);

                    return Ok("Confirm The Email");
                }
                else
                {
                    return BadRequest(results.Errors);
                }
            }

            return BadRequest(ModelState);
        }
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string email, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("Invalid email address.");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email confirmed successfully.");
            }

            return BadRequest("Email confirmation failed.");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {


            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                if (!user.EmailConfirmed)
                {
                    return BadRequest("Email is not confirmed.");
                }
                var results = await _signInManager.PasswordSignInAsync(user, model.Password!, model.Rememberme ?? false, false);
                if (results.Succeeded)
                {
                    return Ok(new { Email = model.Email, token = GenerateToken(user) });
                }
            }
            return BadRequest("Error in Email or Password");

        }

        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("Invalid Email Address");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"https://localhost:7063/ResetPassword?email={email}&token={Uri.EscapeDataString(token)}";

            var subject = "Reset Your Password";
            var message = $"Click the link to reset your password: <a href='{resetLink}'>Reset Password</a>";

            await _emailSender.SendEmailAsync(email, subject, message);

            return Ok("Reset password link has been sent to your email.");
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (model.Password != model.ConfirmPassword)
            {
                return BadRequest("Passwords do not match");
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                return Ok("Password has been reset successfully");
            }

            return BadRequest(result.Errors);
        }
        private async Task<string> GenerateToken(UserModel user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var Claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email,user.Email!),
                new Claim(JwtRegisteredClaimNames.GivenName,user.FullName !),
                new Claim(ClaimTypes.Role, roles.FirstOrDefault() ?? "employee")
            };


            var key = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(_configuration["JWT:skey"]!));

            var signCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDiscriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = signCred,
                Issuer = _configuration["JWT:iss"],
                Audience = _configuration["JWT:aud"],
                Expires = DateTime.Now.AddDays(1),
                Subject = new ClaimsIdentity(Claims)
            };

            var TokenHandler = new JwtSecurityTokenHandler();
            var token = TokenHandler.CreateToken(tokenDiscriptor);

            return TokenHandler.WriteToken(token);
        }

    }
}

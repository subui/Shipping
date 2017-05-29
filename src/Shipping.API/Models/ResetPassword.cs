namespace Shipping.API.Models
{
    public class ResetPassword
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
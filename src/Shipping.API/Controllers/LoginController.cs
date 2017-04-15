using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Libs;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class LoginController : ApiController
    {
        public object Post(User user)
        {
            User userLogin;
            using (var entities = new ShippingEntities())
            {
                var users = entities.Users.Where(u => u.Username.Equals(user.Username));

                if (!users.Any())
                {
                    return new { UserLogin = (User)null, ResponseStatus = ResponseStatus.ErrorUsernameNotExist };
                }

                userLogin = users.First();
                if (!App.GetSHA256String(user.Password).Equals(userLogin.Password))
                {
                    return new { UserLogin = (User)null, ResponseStatus = ResponseStatus.PasswordIncorrect };
                }
            }

            return new { UserLogin = userLogin, ResponseStatus = ResponseStatus.Success };
        }
    }
}

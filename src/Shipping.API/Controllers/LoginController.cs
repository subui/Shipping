using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Libs;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class LoginController : ApiController
    {
        public ResponseData Post(User user)
        {
            User userLogin;
            using (var entities = new ShippingEntities())
            {
                var users = entities.Users.Where(u => u.Username.Equals(user.Username));

                if (!users.Any())
                {
                    return new ResponseData(ResponseStatus.ErrorUsernameNotExist, RequestType.Login);
                }

                userLogin = users.First();
                if (!App.GetSHA256String(user.Password).Equals(userLogin.Password))
                {
                    return new ResponseData(ResponseStatus.ErrorPasswordIncorrect, RequestType.Login);
                }
            }

            return new ResponseData(userLogin, ResponseStatus.Success, RequestType.Login);
        }
    }
}

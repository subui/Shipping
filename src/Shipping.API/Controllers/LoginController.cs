using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.API.Utils;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class LoginController : ApiController
    {
        public ResponseData Post(User user)
        {
            using (var entities = new ShippingEntities())
            {
                var userLogin = entities.Users.FirstOrDefault(u => u.Username.Equals(user.Username));

                return userLogin == null
                    ? new ResponseData(ResponseStatus.ErrorUsernameNotExist, RequestType.Login)
                    : (!App.GetSHA256String(user.Password).Equals(userLogin.Password)
                        ? new ResponseData(ResponseStatus.ErrorPasswordIncorrect, RequestType.Login)
                        : new ResponseData(userLogin, ResponseStatus.Success, RequestType.Login));
            }
        }
    }
}

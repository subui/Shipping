using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.API.Utils;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class SignUpController : ApiController
    {
        public ResponseData CreateNewUser(User user)
        {
            using (var entities = new ShippingEntities())
            {
                if (entities.Users.Any(u => u.Username.Equals(user.Username)))
                {
                    return new ResponseData(ResponseStatus.ErrorUsernameExist, RequestType.SignUp);
                }

                if (entities.Users.Any(u => u.Email.Equals(user.Email)))
                {
                    return new ResponseData(ResponseStatus.ErrorEmailExist, RequestType.SignUp);
                }

                user.Password = App.GetSHA256String(user.Password);
                entities.Users.Add(user);
                entities.SaveChanges();
            }

            return new ResponseData(ResponseStatus.Success, RequestType.SignUp);
        }
    }
}

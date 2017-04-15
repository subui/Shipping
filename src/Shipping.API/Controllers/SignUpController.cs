using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Libs;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class SignUpController : ApiController
    {
        public ResponseStatus Post(User user)
        {
            using (var entities = new ShippingEntities())
            {
                if (entities.Users.Any(u => u.Username.Equals(user.Username)))
                {
                    return ResponseStatus.ErrorUsernameExist;
                }

                if (entities.Users.Any(u => u.Email.Equals(user.Email)))
                {
                    return ResponseStatus.ErrorEmailExist;
                }

                user.Password = App.GetSHA256String(user.Password);
                entities.Users.Add(user);
                entities.SaveChanges();
            }

            return ResponseStatus.Success;
        }
    }
}

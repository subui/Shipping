using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class ResetPasswordController : ApiController
    {
        [HttpPost]
        public ResponseData CheckUsername([FromBody]string username)
        {
            using (var entities = new ShippingEntities())
            {
                var existUser = entities.Users.Any(u => u.Username.Equals(username));
                return new ResponseData(existUser ? ResponseStatus.Success : ResponseStatus.ErrorUsernameNotExist, RequestType.ResetPassword);
            }
        }
    }
}

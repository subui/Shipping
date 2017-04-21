using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class UserController : ApiController
    {
        public ResponseData Get(int id)
        {
            using (var entities = new ShippingEntities())
            {
                var user = entities.Users.FirstOrDefault(u => u.UserId == id);
                return new ResponseData(user?.ShopName ?? user?.FullName, ResponseStatus.Success, RequestType.User);
            }
        }
    }
}

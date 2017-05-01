using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.API.Utils;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public ResponseData GetShopNameByUserId(int id)
        {
            using (var entities = new ShippingEntities())
            {
                var user = entities.Users.FirstOrDefault(u => u.UserId == id);
                return new ResponseData(user?.ShopName ?? user?.FullName, ResponseStatus.Success, RequestType.User);
            }
        }

        [HttpPost]
        public ResponseData ChangePassword(User user)
        {
            using (var entities = new ShippingEntities())
            {
                var userUpdate = entities.Users.FirstOrDefault(u => u.UserId == user.UserId);

                if (userUpdate == null) return new ResponseData(ResponseStatus.ErrorNullValue, RequestType.User);

                var passwordUpdate = App.GetSHA256String(user.Password);

                if (!passwordUpdate.Equals(user.Password))
                    return new ResponseData(ResponseStatus.ErrorPasswordIncorrect, RequestType.User);

                userUpdate.Password = passwordUpdate;
                entities.SaveChanges();

                return new ResponseData(ResponseStatus.Success, RequestType.User);
            }
        }
    }
}

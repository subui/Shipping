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
        public ResponseData GetNameByUserId(int id)
        {
            using (var entities = new ShippingEntities())
            {
                var user = entities.Users.FirstOrDefault(u => u.UserId == id);
                return new ResponseData(user?.ShopName ?? user?.FullName, ResponseStatus.Success, RequestType.User);
            }
        }

        [HttpPost]
        public ResponseData ChangePassword(UpdatePassword up)
        {
            using (var entities = new ShippingEntities())
            {
                var userUpdate = entities.Users.FirstOrDefault(u => u.UserId == up.UserId);

                if (userUpdate == null) return new ResponseData(ResponseStatus.ErrorNullValue, RequestType.User);

                var currentPassword = App.GetSHA256String(up.CurrentPassword);

                if (!currentPassword.Equals(userUpdate.Password))
                    return new ResponseData(ResponseStatus.ErrorPasswordIncorrect, RequestType.User);

                userUpdate.Password = App.GetSHA256String(up.NewPassword);
                entities.SaveChanges();

                return new ResponseData(ResponseStatus.Success, RequestType.User);
            }
        }

        [HttpPut]
        public ResponseData UpdateUser(int id, User user)
        {
            using (var entities = new ShippingEntities())
            {
                var userUpdate = entities.Users.FirstOrDefault(u => u.UserId == id);
                if (userUpdate == null) return new ResponseData(ResponseStatus.ErrorNullValue, RequestType.User);

                userUpdate.FullName = user.FullName;
                userUpdate.Email = user.Email;
                userUpdate.PhoneNumber = user.PhoneNumber;
                userUpdate.BirthDay = user.BirthDay?.ToLocalTime();
                userUpdate.Gender = user.Gender;

                if (userUpdate.UserType == (int) UserType.ShopManager)
                {
                    userUpdate.ShopName = user.ShopName;
                    userUpdate.ShopAddress = user.ShopAddress;
                }

                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.User);
            }
        }
    }
}

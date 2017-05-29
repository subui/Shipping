using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.API.Utils;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class ResetPasswordController : ApiController
    {
        [HttpPost, Route("resetpassword/checkusername")]
        public ResponseData CheckUsername([FromBody]string username)
        {
            using (var entities = new ShippingEntities())
            {
                var existUser = entities.Users.Any(u => u.Username.Equals(username));
                return new ResponseData(existUser ? ResponseStatus.Success : ResponseStatus.ErrorUsernameNotExist, RequestType.ResetPassword);
            }
        }

        [HttpPost, Route("resetpassword/checkemail")]
        public ResponseData CheckEmail([FromBody]string str)
        {
            var arr = str.Split(' ');
            var username = arr[0];
            var email = arr[1];

            using (var entities = new ShippingEntities())
            {
                var isCorrectEmail = entities.Users.Any(u => u.Username.Equals(username) && u.Email.Equals(email));
                return new ResponseData(isCorrectEmail ? ResponseStatus.Success : ResponseStatus.ErrorEmailIncorrect, RequestType.ResetPassword);
            }
        }

        [HttpPost, Route("resetpassword/reset")]
        public ResponseData Reset(ResetPassword rp)
        {
            using (var entities = new ShippingEntities())
            {
                var user = entities.Users.FirstOrDefault(u => u.Username == rp.Username && u.Email == rp.Email);
                if (user == null) return new ResponseData(ResponseStatus.ErrorNullValue, RequestType.ResetPassword);

                user.Password = App.GetSHA256String(rp.Password);
                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.ResetPassword);
            }
        }
    }
}

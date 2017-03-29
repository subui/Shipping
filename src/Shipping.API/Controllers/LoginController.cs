using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Libs;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class LoginController : ApiController
    {
        public ResponseStatus Post(User user)
        {
            using (var entities = new ShippingEntities())
            {
                var users = entities.Users.Where(u => u.Username.Equals(user.Username));

                if (!users.Any())
                {
                    return ResponseStatus.ErrorUsernameNotExist;
                }

                var userLogin = users.First();
                if (!App.GetSHA256String(user.Password).Equals(userLogin.Password))
                {
                    return ResponseStatus.PasswordIncorrect;
                }
            }

            return ResponseStatus.Success;
        }
    }
}

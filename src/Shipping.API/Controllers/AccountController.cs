using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class AccountController : ApiController
    {
        public List<User> Get()
        {
            using (var entities = new ShippingEntities())
            {
                return entities.Users.ToList();
            }
        }

        public void Post(User user)
        {
            using (var entities = new ShippingEntities())
            {
                
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class SignUpController : ApiController
    {
        public List<User> Get()
        {
            using (var entities = new ShippingEntities())
            {
                return entities.Users.ToList();
            }
        }
    }
}

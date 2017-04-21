using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class RegisterController : ApiController
    {
        public ResponseStatus Post(ShippingRegistration reg)
        {
            using (var entities = new ShippingEntities())
            {
                entities.ShippingRegistrations.Add(reg);
                entities.SaveChanges();
                return ResponseStatus.Success;
            }
        }
    }
}

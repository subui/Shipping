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
    public class OrderController : ApiController
    {
        public List<Order> Get()
        {
            using (var entities = new ShippingEntities())
            {
                return entities.Orders.ToList();
            }
        }

        public ResponseStatus Post(Order order)
        {
            using (var entities = new ShippingEntities())
            {
                entities.Orders.Add(order);
                entities.SaveChanges();
                return ResponseStatus.Success;
            }
        }
    }
}

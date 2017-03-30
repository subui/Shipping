﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
    }
}
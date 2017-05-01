using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class OrderController : ApiController
    {
        [HttpGet]
        [Route("order/{orderId}/{userId}")]
        public ResponseData Get(int orderId, int userId)
        {
            using (var entities = new ShippingEntities())
            {
                var userRequest = entities.Users.FirstOrDefault(u => u.UserId == userId);
                var userType = userRequest?.UserType;

                if (userType == null)
                    return new ResponseData(ResponseStatus.ErrorNullValue, RequestType.Order);

                var expiredOrders = entities.Orders.Where(o => o.Status == (int) OrderStatus.Waiting && o.StartTime < DateTime.Now);
                foreach (var expiredOrder in expiredOrders)
                    expiredOrder.Status = expiredOrder.SelectedShipperId == null
                        ? (int) OrderStatus.Expired
                        : (int) OrderStatus.Shipping;

                entities.SaveChanges();

                var listOrders = userType == (int) UserType.ShopManager 
                    ? entities.Orders.Where(o => o.ShopId == userRequest.UserId).OrderByDescending(o => o.OrderId).ToList() 
                    : entities.Orders.OrderByDescending(o => o.OrderId).ToList();

                var returnData = new List<object>();

                foreach (var order in listOrders)
                {
                    var shipperCount = entities.ShippingRegistrations.Count(r => r.OrderId == order.OrderId);
                    returnData.Add(new { Order = order, ShipperCount = shipperCount });
                }

                return new ResponseData(returnData, ResponseStatus.Success, RequestType.Order);
            }
        }

        [HttpPost]
        public ResponseData Post(Order order)
        {
            using (var entities = new ShippingEntities())
            {
                entities.Orders.Add(order);
                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Order);
            }
        }

        [HttpPut]
        public ResponseData Put(int id, Order order)
        {
            using (var entities = new ShippingEntities())
            {
                var orderUpdate = entities.Orders.FirstOrDefault(o => o.OrderId == id);
                if (orderUpdate == null)
                    return new ResponseData(ResponseStatus.ErrorOrderNotExist, RequestType.Order);

                if (orderUpdate.SelectedShipperId == order.SelectedShipperId)
                {
                    orderUpdate.OrderName = order.OrderName;
                    orderUpdate.StartingPoint = order.StartingPoint;
                    orderUpdate.Destination = order.Destination;
                    orderUpdate.StartTime = order.StartTime;
                    orderUpdate.RecipientsName = order.RecipientsName;
                    orderUpdate.RecipientsPhoneNumber = order.RecipientsPhoneNumber;
                    orderUpdate.AdvanceDeposit = order.AdvanceDeposit;
                    orderUpdate.Profit = order.Profit;
                    orderUpdate.Status = order.Status;
                }
                else
                {
                    orderUpdate.SelectedShipperId = order.SelectedShipperId;
                }

                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Order);
            }
        }
    }
}

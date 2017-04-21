using System.Collections.Generic;
using System.Linq;
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

        public ResponseStatus Put(int id, Order order)
        {
            using (var entities = new ShippingEntities())
            {
                var orderUpdate = entities.Orders.FirstOrDefault(o => o.OrderId == id);
                if (orderUpdate == null)
                    return ResponseStatus.ErrorOrderNotExist;

                orderUpdate.OrderName = order.OrderName;
                orderUpdate.StartingPoint = order.StartingPoint;
                orderUpdate.Destination = order.Destination;
                orderUpdate.StartTime = order.StartTime;
                orderUpdate.RecipientsName = order.RecipientsName;
                orderUpdate.RecipientsPhoneNumber = order.RecipientsPhoneNumber;
                orderUpdate.AdvanceDeposit = order.AdvanceDeposit;
                orderUpdate.Profit = order.Profit;
                orderUpdate.Status = order.Status;

                entities.SaveChanges();
                return ResponseStatus.Success;
            }
        }
    }
}

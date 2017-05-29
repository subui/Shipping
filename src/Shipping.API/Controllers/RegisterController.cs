using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class RegisterController : ApiController
    {
        [HttpGet, Route("register/getorder/{id}")]
        // getOrderRegisteredByShipperId
        public ResponseData GetOrder(int id)
        {
            using (var entities = new ShippingEntities())
            {
                /*var listOrderId = entities.ShippingRegistrations
                        .Where(r => r.ShipperId == id)
                        .Select(r => r.OrderId);

                var listOrder = entities.Orders
                    .Where(o => listOrderId.Contains(o.OrderId))
                    .ToList();*/

                var listOrder = (from o in entities.Orders
                                 join r in entities.ShippingRegistrations on o.OrderId equals r.OrderId
                                 where r.ShipperId == id
                                    && (o.SelectedShipperId == id || o.SelectedShipperId == null)
                                    && o.Status != (int)OrderStatus.Expired
                                    && o.Status != (int)OrderStatus.Canceled
                                 orderby o.OrderId descending
                                 select o)
                    .ToList();

                return new ResponseData(listOrder, ResponseStatus.Success, RequestType.Register);
            }
        }

        [HttpGet, Route("register/getshipper/{id}")]
        // getShipperRegisteredByOrderId
        public ResponseData GetShipper(int id)
        {
            using (var entities = new ShippingEntities())
            {
                /*var listShipperId = entities.ShippingRegistrations
                       .Where(r => r.OrderId == id)
                       .Select(r => r.ShipperId);

                var listShipper = entities.Users
                    .Where(u => listShipperId.Contains(u.UserId))
                    .Select(u => new { u.UserId, u.FullName })
                    .ToList();*/

                var listShipper = (from u in entities.Users
                                   join r in entities.ShippingRegistrations on u.UserId equals r.ShipperId
                                   where r.OrderId == id
                                   select new { u.UserId, u.FullName, u.Gender, u.BirthDay, u.Score })
                    .ToList();

                return new ResponseData(listShipper, ResponseStatus.Success, RequestType.Register);
            }
        }

        [HttpPost]
        public ResponseData RegisterOrder(ShippingRegistration reg)
        {
            using (var entities = new ShippingEntities())
            {
                reg.RegTime = reg.RegTime.ToLocalTime();
                entities.ShippingRegistrations.Add(reg);
                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Register);
            }
        }

        [HttpDelete, Route("register/{orderId}/{shipperId}")]
        public ResponseData UnregisterOrder(int orderId, int shipperId)
        {
            using (var entities = new ShippingEntities())
            {
                var reg = entities.ShippingRegistrations.FirstOrDefault(r => r.OrderId == orderId && r.ShipperId == shipperId);
                if (reg != null) entities.ShippingRegistrations.Remove(reg);
                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Register);
            }
        }
    }
}

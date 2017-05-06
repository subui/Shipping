using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class RegisterController : ApiController
    {
        [HttpGet]
        [Route("register/getorder/{id}")]
        // getOrderRegisteredByShipperId
        public ResponseData GetOrder(int id)
        {
            using (var entities = new ShippingEntities())
            {
                var listOrderId = entities.ShippingRegistrations
                        .Where(r => r.ShipperId == id)
                        .Select(r => r.OrderId);

                var listOrder = entities.Orders
                    .Where(o => listOrderId.Contains(o.OrderId))
                    .ToList();

                return new ResponseData(listOrder, ResponseStatus.Success, RequestType.Register);
            }
        }

        [HttpGet]
        [Route("register/getshipper/{id}")]
        // getShipperRegisteredByOrderId
        public ResponseData GetShipper(int id)
        {
            using (var entities = new ShippingEntities())
            {
                var listShipperId = entities.ShippingRegistrations
                       .Where(r => r.OrderId == id)
                       .Select(r => r.ShipperId);

                var listShipper = entities.Users
                    .Where(u => listShipperId.Contains(u.UserId))
                    .Select(u => new { u.UserId, u.FullName })
                    .ToList();

                return new ResponseData(listShipper, ResponseStatus.Success, RequestType.Register);
            }
        }

        [HttpPost]
        public ResponseData Post(ShippingRegistration reg)
        {
            using (var entities = new ShippingEntities())
            {
                reg.RegTime = reg.RegTime.ToLocalTime();
                entities.ShippingRegistrations.Add(reg);
                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Register);
            }
        }

        [HttpDelete]
        [Route("register/{orderId}/{shipperId}")]
        public ResponseData Delete(int orderId, int shipperId)
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

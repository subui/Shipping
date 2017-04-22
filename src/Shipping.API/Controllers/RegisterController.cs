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
        [Route("register/{orderId}/{shipperId}")]
        public ResponseData Get(int orderId, int shipperId)
        {
            using (var entities = new ShippingEntities())
            {
                // getOrderRegisteredByShipperId
                if (orderId == 0 && shipperId != 0)
                {
                    var listOrderId = entities.ShippingRegistrations.Where(r => r.ShipperId == shipperId).Select(r => r.OrderId);
                    var listOrder = entities.Orders.Where(o => listOrderId.Contains(o.OrderId)).ToList();
                    return new ResponseData(listOrder, ResponseStatus.Success, RequestType.Register);
                }

                // getShipperRegisteredByOrderId
                if (orderId != 0 && shipperId == 0)
                {
                    var listShipperId = entities.ShippingRegistrations.Where(r => r.OrderId == orderId).Select(r => r.ShipperId);
                    var listShipper = entities.Users.Where(u => listShipperId.Contains(u.UserId)).Select(u => u.FullName).ToList();
                    return new ResponseData(listShipper, ResponseStatus.Success, RequestType.Register);
                }

                return null;
            }
        }

        [HttpPost]
        public ResponseData Post(ShippingRegistration reg)
        {
            using (var entities = new ShippingEntities())
            {
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

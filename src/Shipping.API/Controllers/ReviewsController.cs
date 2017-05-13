using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class ReviewsController : ApiController
    {
        [HttpPost]
        public ResponseData ReviewsShipper(ReviewsShipper rev)
        {
            using (var entities = new ShippingEntities())
            {
                rev.RevTime = rev.RevTime.ToLocalTime();
                entities.ReviewsShippers.Add(rev);
                entities.SaveChanges();

                // get shipperId being reviews
                var shipperId = entities.Orders.FirstOrDefault(o => o.OrderId == rev.OrderId)?.SelectedShipperId;
                var shipper = entities.Users.FirstOrDefault(u => u.UserId == shipperId);
                if (shipper == null) return null;

                var listOrderidByShipper = entities.Orders.Where(o => o.SelectedShipperId == shipperId).Select(o => o.OrderId);
                var shipperSore = entities.ReviewsShippers.Where(r => listOrderidByShipper.Contains(r.OrderId)).Average(r => r.Score);
                shipper.Score = (decimal?)shipperSore;

                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Reviews);
            }
        }
    }
}

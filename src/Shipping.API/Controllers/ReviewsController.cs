using System.Linq;
using System.Web.Http;
using Shipping.API.Enums;
using Shipping.API.Models;
using Shipping.DataAccess;

namespace Shipping.API.Controllers
{
    public class ReviewsController : ApiController
    {
        [HttpGet]
        public ResponseData GetListReviews(int id)
        {
            using (var entities = new ShippingEntities())
            {
                /* 
                select u.FullName, o.OrderName, r.Score, r.Content, r.RevTime
                from [User] u join [Order] o on u.UserId = o.ShopId
                              join ReviewsShipper r on o.OrderId = r.OrderId
                where o.SelectedShipperId = id and o.Status = 3;
                */

                var listReviewsByShipper = (from u in entities.Users
                                            let shopName = u.ShopName ?? u.FullName
                                            join o in entities.Orders on u.UserId equals o.ShopId
                                            join r in entities.ReviewsShippers on o.OrderId equals r.OrderId
                                            where o.SelectedShipperId == id
                                            orderby r.RevTime descending
                                            select new { shopName, o.OrderName, r.Score, r.Content, r.RevTime })
                    .ToList();

                /*
                var listReviewsByShipper =
                    entities.Users.Join(entities.Orders, u => u.UserId, o => o.ShopId,
                            (u, o) => new {shopName = u.ShopName ?? u.FullName, o.OrderId, o.OrderName, o.SelectedShipperId, o.Status})
                        .Where(o => o.SelectedShipperId == id)
                        .Join(entities.ReviewsShippers, o => o.OrderId, r => r.OrderId,
                            (o, r) => new {o.shopName, o.OrderName, r.Score, r.Content, r.RevTime})
                        .ToList();
                */

                return new ResponseData(listReviewsByShipper, ResponseStatus.Success, RequestType.Reviews);
            }
        }

        [HttpGet, Route("reviews/getnumberofreviews/{id}")]
        public ResponseData GetNumberOfReviews(int id)
        {
            using (var entities = new ShippingEntities())
            {
                return
                    new ResponseData(
                        entities.ReviewsShippers.Join(entities.Orders.Where(o => o.SelectedShipperId == id),
                                r => r.OrderId, o => o.OrderId, (r, o) => r)
                            .Count(),
                        ResponseStatus.Success,
                        RequestType.Reviews);
            }
        }

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

                var shipperScore =
                    entities.Orders.Where(o => o.SelectedShipperId == shipperId && o.Status == (int) OrderStatus.Done)
                        .Join(entities.ReviewsShippers, o => o.OrderId, r => r.OrderId, (o, r) => r.Score)
                        .Average();

                shipper.Score = (decimal?)shipperScore;

                entities.SaveChanges();
                return new ResponseData(ResponseStatus.Success, RequestType.Reviews);
            }
        }
    }
}

using Shipping.API.Enums;

namespace Shipping.API.Models
{
    public class ResponseData
    {
        public object Data { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
        public RequestType RequestType { get; set; }

        public ResponseData(ResponseStatus status, RequestType type)
        {
            ResponseStatus = status;
            RequestType = type;
        }

        public ResponseData(object data, ResponseStatus status, RequestType type) : this(status, type)
        {
            Data = data;
        }
    }
}
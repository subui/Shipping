using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shipping.API.Models
{
    public class UpdatePassword
    {
        public int UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
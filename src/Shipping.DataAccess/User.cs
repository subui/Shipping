//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Shipping.DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Nullable<System.DateTime> BirthDay { get; set; }
        public Nullable<int> Gender { get; set; }
        public int UserType { get; set; }
        public string ShopName { get; set; }
        public string ShopAddress { get; set; }
        public Nullable<decimal> Score { get; set; }
    }
}

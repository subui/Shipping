using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Shipping.API.Utils
{
    public class App
    {
        public static string GetSHA256String(string text)
        {
            using (var sha256 = SHA256.Create())
            {
                return string.Concat(sha256.ComputeHash(Encoding.UTF8.GetBytes(text))
                    .Select(item => item.ToString("x2")));
            }
        }
    }
}

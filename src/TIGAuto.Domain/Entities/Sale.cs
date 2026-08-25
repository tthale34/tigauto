using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TIGAuto.Domain.Entities
{
    public class Sale
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int CustomerId { get; set; }
        public decimal SalePrice { get; set; }
        public DateTime SaleDate { get; set; } = DateTime.UtcNow;
        public string? Notes { get; set; }
        // Navigation properties
        public Vehicle Vehicle { get; set; } = null!;
        public Customer Customer { get; set; } = null!;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TIGAuto.Domain.Enums;

namespace TIGAuto.Domain.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public string? VIN { get; set; }
        public string? RegistrationNumber { get; set; }
        public int Mileage { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SellingPrice { get; set; }
        public string? Description { get; set; }
        public string? Colour { get; set; }
        public FuelType FuelType { get; set; }
        public TransmissionType Transmission { get; set; }
        public VehicleStatus Status { get; set; } = VehicleStatus.Available;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        // Navigation properties
        public ICollection<VehicleImage> Images { get; set; } = new List<VehicleImage>();
        public Sale? Sale { get; set; }
    }
}

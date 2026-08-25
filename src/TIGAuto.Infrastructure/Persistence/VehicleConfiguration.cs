using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TIGAuto.Domain.Entities;

namespace TIGAuto.Infrastructure.Persistence
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.ToTable("Vehicles");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Make).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Model).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Year).IsRequired();
            builder.Property(x => x.VIN).HasMaxLength(50);
            builder.HasIndex(x => x.VIN).IsUnique();
            builder.Property(x => x.RegistrationNumber).HasMaxLength(20);
            builder.HasIndex(x => x.RegistrationNumber).IsUnique();
            builder.Property(x => x.PurchasePrice).HasPrecision(18, 2);
            builder.Property(x => x.SellingPrice).HasPrecision(18, 2);
            builder.Property(x => x.Description).HasMaxLength(4000);
            builder.Property(x => x.Colour).HasMaxLength(50);
            builder.Property(x => x.FuelType).HasConversion<int>();
            builder.Property(x => x.Transmission).HasConversion<int>();
            builder.Property(x => x.Status).HasConversion<int>();
            builder.HasMany(x => x.Images).WithOne(x => x.Vehicle).HasForeignKey(x => x.VehicleId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.Sale).WithOne(x => x.Vehicle).HasForeignKey<Sale>(x => x.VehicleId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}

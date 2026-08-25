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
    public class SaleConfiguration: IEntityTypeConfiguration<Sale>
    {
        public void Configure(EntityTypeBuilder<Sale> builder)
        {
            builder.ToTable("Sales");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.SalePrice).IsRequired().HasPrecision(18, 2);
            builder.Property(x => x.Notes).HasMaxLength(2000);
            builder.HasOne(x => x.Vehicle).WithOne(x => x.Sale).HasForeignKey<Sale>(x => x.VehicleId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.Customer).WithMany(x => x.Sales).HasForeignKey(x => x.CustomerId).OnDelete(DeleteBehavior.Restrict);
            builder.HasIndex(x => x.VehicleId).IsUnique();
            builder.HasIndex(x => x.CustomerId);
        }
    }
}

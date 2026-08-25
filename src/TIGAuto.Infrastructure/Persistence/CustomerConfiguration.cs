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
    public class CustomerConfiguration
    : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("Customers");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Email).IsRequired().HasMaxLength(255);
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.PhoneNumber).HasMaxLength(30);
            builder.Property(x => x.AddressLine1).HasMaxLength(255);
            builder.Property(x => x.AddressLine2).HasMaxLength(255);
            builder.Property(x => x.City).HasMaxLength(100);
            builder.Property(x => x.Province).HasMaxLength(100);
            builder.Property(x => x.PostalCode).HasMaxLength(20);
        }
    }
}

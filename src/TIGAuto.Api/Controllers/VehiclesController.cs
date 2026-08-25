using Microsoft.AspNetCore.Mvc;
using TIGAuto.Domain.Entities;
using TIGAuto.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace TIGAuto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public VehiclesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            var vehicles = await _context.Vehicles.AsNoTracking().ToListAsync();
            return Ok(vehicles);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (vehicle == null)
            {
                return NotFound();
            }
            return Ok(vehicle);
        }
        [HttpPost]
        public async Task<ActionResult<Vehicle>> CreateVehicle(Vehicle vehicle)
        {
            vehicle.CreatedAt = DateTime.UtcNow;
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVehicle),new { id = vehicle.Id },vehicle);
        }
    }
}

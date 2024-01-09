using CustomerPortalApi.Data;
using CustomerPortalApi.Extensions;
using CustomerPortalApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerPortalApi.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly AppDbContext _context;

        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetToalCustomerCountAsync(string searchInput)
        {
            return await _context.Customers
                .WhereIf(!string.IsNullOrWhiteSpace(searchInput), x => (x.FirstName + " " + x.LastName).Contains(searchInput) || x.Email.Contains(searchInput))
                .CountAsync();
        }


        public async Task<IEnumerable<Customer>> GetAllCustomersAsync(int currentPage, int itemsPerPage, string searchInput)
        {
            int skipAmount = (currentPage - 1) * itemsPerPage;

            return await _context.Customers
                                 .WhereIf(!string.IsNullOrWhiteSpace(searchInput), x => (x.FirstName + " " + x.LastName).Contains(searchInput) || x.Email.Contains(searchInput))
                                 .Skip(skipAmount)
                                 .Take(itemsPerPage)
                                 .ToListAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            return await _context.Customers.FindAsync(id);
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCustomerAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer != null)
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
            }
        }

    }
}

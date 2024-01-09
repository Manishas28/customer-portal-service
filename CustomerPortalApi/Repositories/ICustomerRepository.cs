using CustomerPortalApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CustomerPortalApi.Repositories
{
    public interface ICustomerRepository
    {
        Task<int> GetToalCustomerCountAsync();
        Task<IEnumerable<Customer>> GetAllCustomersAsync(int currentPage, int itemsPerPage);
        Task<Customer> GetCustomerByIdAsync(int id);
        Task<Customer> AddCustomerAsync(Customer customer);
        Task UpdateCustomerAsync(Customer customer);
        Task DeleteCustomerAsync(int id);
    }
}
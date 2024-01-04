using CustomerPortalApi.Data;
using CustomerPortalApi.Models;
using CustomerPortalApi.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace CustomerPortal.UnitTests.Repositories
{
    public class CustomerRepositoryTests
    {
        private readonly AppDbContext _dbContext;
        private readonly CustomerRepository _repository;

        public CustomerRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _dbContext = new AppDbContext(options);

            // Seed the in-memory database if it's empty
            if (!_dbContext.Customers.Any())
            {
                _dbContext.Customers.AddRange(new List<Customer>
            {
                new Customer { FirstName = "Manisha", LastName = "Test", Email = "manisha@example.com" },
            });

                _dbContext.SaveChanges();
            }

            _repository = new CustomerRepository(_dbContext);
        }

        [Fact]
        public async Task GetAllCustomersAsync_ReturnsAllCustomers()
        {
            var result = await _repository.GetAllCustomersAsync();

            Assert.True(result.Any());
        }

        [Fact]
        public async Task GetCustomerByIdAsync_ReturnsCustomer_WhenCustomerExists()
        {
            var firstCustomer = _dbContext.Customers.First();
            var result = await _repository.GetCustomerByIdAsync(firstCustomer.Id);

            Assert.NotNull(result);
            Assert.Equal(firstCustomer.Id, result.Id);
        }

        [Fact]
        public async Task AddCustomerAsync_AddsNewCustomer()
        {
            var newCustomer = new Customer { FirstName = "Mark", LastName = "Smith", Email = "mark@example.com" };
            var addedCustomer = await _repository.AddCustomerAsync(newCustomer);

            var retrievedCustomer = await _repository.GetCustomerByIdAsync(addedCustomer.Id);

            Assert.NotNull(retrievedCustomer);
            Assert.Equal("Mark", retrievedCustomer.FirstName);
        }

        [Fact]
        public async Task UpdateCustomerAsync_UpdatesExistingCustomer()
        {
            var firstCustomer = _dbContext.Customers.First();
            firstCustomer.FirstName = "UpdatedName";

            await _repository.UpdateCustomerAsync(firstCustomer);

            var updatedCustomer = await _repository.GetCustomerByIdAsync(firstCustomer.Id);

            Assert.Equal("UpdatedName", updatedCustomer.FirstName);
        }


    }
}

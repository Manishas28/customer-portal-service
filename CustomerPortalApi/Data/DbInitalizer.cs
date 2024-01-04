using CustomerPortalApi.Models;

namespace CustomerPortalApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Ensure the database is created
            context.Database.EnsureCreated();

            // Check if there are any customers
            if (context.Customers.Any())
            {
                return; // DB has been seeded
            }

            var customers = new List<Customer>();

            for (int i = 1; i <= 20; i++)
            {
                customers.Add(new Customer
                {
                    FirstName = $"FirstName{i}",
                    LastName = $"LastName{i}",
                    Email = $"customer{i}@example.com",
                    CreatedDateTime = DateTime.Now,
                    LastUpdatedDateTime = DateTime.Now
                });
            }

            context.Customers.AddRange(customers);
            context.SaveChanges();
        }
    }

}

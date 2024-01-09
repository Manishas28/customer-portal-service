using System.Linq.Expressions;

namespace CustomerPortalApi.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> WhereIf<T>(
            this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
        {
            if (query == null) throw new ArgumentNullException("query");

            return condition ? query.Where(predicate) : query;
        }
    }
}

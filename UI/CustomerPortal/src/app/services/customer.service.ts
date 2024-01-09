import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'https://localhost:7155'
  private apiUrl = `${this.baseUrl}/api/customers`;

  constructor(private http: HttpClient) { }

  getTotalCustomersCount(searchInput: string | undefined = undefined): Observable<number> {
    let url = `${this.apiUrl}/total`;
    if (searchInput) {
      url += `?searchInput=${searchInput}`;
    }
    return this.http.get<number>(url);
  }

  getCustomers(currentPage: number = 1, itemsPerPage: number = 10, searchInput: string | undefined): Observable<Customer[]> {
    let url = `${this.apiUrl}?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;
    if (searchInput) {
      url += `&searchInput=${searchInput}`;
    }
    return this.http.get<Customer[]>(url);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

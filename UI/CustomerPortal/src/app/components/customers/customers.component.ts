import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, DataTablesModule, NgbModule],
  providers: [CustomerService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  dtOptions: any;
  customer: Customer = { firstName: '', lastName: '', email: '', createdDateTime: new Date(), lastUpdatedDateTime: new Date() };
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
      // Add other DataTable options here
    };
    this.retrieveCustomers();
  }

  retrieveCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  onSubmit(): void {
    if (this.customer.id) {
      this.customerService.updateCustomer(this.customer.id, this.customer).subscribe(() => this.retrieveCustomers());
    } else {
      this.customerService.addCustomer(this.customer).subscribe(() => this.retrieveCustomers());
    }

    this.resetForm();
  }

  resetForm(): void {
    this.customer = {id: 0, firstName: '', lastName: '', email: '', createdDateTime: new Date(), lastUpdatedDateTime: new Date() }; // Reset form
  }

  selectCustomer(customer: Customer): void {
    sessionStorage.setItem('selectedCustomer', JSON.stringify(customer));
    this.customer = { ...customer }; // Load selected customer into form for editing
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe(() => this.retrieveCustomers());
    this.resetForm();
  }

}

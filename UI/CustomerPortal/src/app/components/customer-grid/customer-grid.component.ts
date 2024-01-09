import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-customer-grid',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [CustomerService],
  templateUrl: './customer-grid.component.html',
  styleUrl: './customer-grid.component.scss',
})
export class CustomerGridComponent {
  customers: Customer[] = [];
  customerSelected: Customer = {} as Customer;

  isEditing: boolean = false;
  private searchSubject = new Subject<string>();
  pageConfig: any = {};

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    createdDateTime: [new Date(), [Validators.required]],
    lastUpdatedDateTime: [new Date(), [Validators.required]],
  });

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageConfig = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      searchInput: undefined,
    };
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.retrieveCustomers();
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageConfig.currentPage = params['page'] ? params['page'] : 1;
      this.pageConfig.searchInput = undefined;
      this.retrieveCustomers();
    });
  }

  searchInputChanged() {
    this.searchSubject.next(this.pageConfig.searchInput);
  }

  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }

  retrieveCustomers(): void {
    this.customerService
      .getTotalCustomersCount(this.pageConfig.searchInput)
      .subscribe((total) => (this.pageConfig.totalItems = total));

    this.customerService
      .getCustomers(
        this.pageConfig.currentPage,
        this.pageConfig.itemsPerPage,
        this.pageConfig.searchInput
      )
      .subscribe((customers) => (this.customers = customers));
  }

  selectCustomer(customer: Customer) {
    if (Object.keys(this.customerSelected).length === 0) {
      this.customerSelected = customer;
      this.isEditing = true;

      this.form.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        createdDateTime: customer.createdDateTime,
        lastUpdatedDateTime: customer.lastUpdatedDateTime,
      });
    }
  }

  update() {
    if (!this.isEditing) {
      this.customers[0] = {
        id: 0,
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        email: this.form.value.email!,
        lastUpdatedDateTime: new Date(),
        createdDateTime: this.form.value.createdDateTime!,
      };
      this.customerService.addCustomer(this.customers[0]).subscribe(() => {
        this.retrieveCustomers();
      });
    } else {
      let index = this.customers
        .map((u) => u.id)
        .indexOf(this.customerSelected.id);

      this.customers[index] = {
        id: this.customerSelected.id,
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        email: this.form.value.email!,
        lastUpdatedDateTime: new Date(),
        createdDateTime: this.form.value.createdDateTime!,
      };
      if (this.customerSelected.id) {
        this.customerService
          .updateCustomer(this.customerSelected.id, this.customers[index])
          .subscribe(() => this.retrieveCustomers());
      }
    }

    // clean up
    this.customerSelected = {} as Customer;
    this.isEditing = false;
    this.form.reset();
  }

  cancel() {
    if (
      !this.isEditing &&
      confirm(
        'All unsaved changes will be removed. Are you sure you want to cancel?'
      )
    ) {
      this.customers.splice(0, 1);
    }

    this.customerSelected = {} as Customer;
    this.isEditing = false;
    this.form.reset();
  }

  addCustomer() {
    this.customers.unshift({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      lastUpdatedDateTime: new Date(),
      createdDateTime: new Date(),
    });
    this.customerSelected = this.customers[0];
  }

  deleteCustomer(index: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      let customerId = this.customers[index].id;
      if (customerId) {
        this.customerService
          .deleteCustomer(customerId)
          .subscribe(() => this.retrieveCustomers());
      }
      this.customers.splice(index, 1);
    }
  }
}

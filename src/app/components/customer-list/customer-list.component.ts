import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: any;
  currentCustomer = null;
  currentIndex = -1;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.retrieveTutorials();
  }

  retrieveTutorials() {
    this.customerService.getAll()
      .subscribe(
        data => {
          this.customers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentCustomer = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index) {
    this.currentCustomer = tutorial;
    this.currentIndex = index;
  }

  
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCutomerComponent implements OnInit {
  customer = {
    name: '',
    designation: '',
    email:'',
    qualification: '',
    published: false
  };
  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  saveCustomer(form: NgForm) {
    const data = {
      name: this.customer.name,
      designation: this.customer.designation,
      email: this.customer.email,
      qualification: this.customer.qualification
    };

    this.customerService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newCustomer() {
    this.submitted = false;
    this.customer = {
      name: '',
      designation: '',
      email: '',
      qualification: '',
      published: false
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    subordinate:[{
      sname: '',
      sdesignation: ''
    }
    ],
  };
  submitted = false;


  customerForm: FormGroup;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({ 
      name: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email,),
      qualification: new FormControl(null, Validators.required),
      subordinate: this.fb.array([]),
    })
  }

  saveCustomer() {
    const data = {
      name: this.customer.name,
      designation: this.customer.designation,
      email: this.customer.email,
      qualification: this.customer.qualification,
      subordinate: this.subordinate().value
    };
    console.log(this.subordinate());

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
      subordinate:[{
        sname: '',
        sdesignation: ''
      }]
    };
  }

  subordinate() : FormArray {
    return this.customerForm.get("subordinate") as FormArray
  }
   
  newSubordinate(): FormGroup {
    return this.fb.group({
      sname: new FormControl(null, Validators.required),
      sdesignation: new FormControl(null, Validators.required),
    })
  }
   
  addSubordinate() {
    this.subordinate().push(this.newSubordinate());
  }
   
  removeSubordinate(i:number) {
    this.subordinate().removeAt(i);
  }
   
}
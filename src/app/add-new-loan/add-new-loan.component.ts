import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.css']
})
export class AddNewLoanComponent implements OnInit {
  currentRoute: string;
  addLoanForm: FormGroup;
  loading = false;
  submitted = false;
  disable=true;
  constructor(private router: Router, private formBuilder: FormBuilder,) { 
    this.currentRoute=router.url;
    
  }

  ngOnInit(): void {
    var generateRandomNDigits = (n) => {
      return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
    }
    
    let num=generateRandomNDigits(5)
    this.addLoanForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      loannumber: [''+num+'',Validators.required],
      padress:['', Validators.required],
  });
  
  }
  // convenience getter for easy access to form fields
  get f() { return this.addLoanForm.controls; }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
   //this.alertService.clear();

    // stop here if form is invalid
    if (this.addLoanForm.invalid) {
        return;
    }

    this.loading = true;
   // this.authenticationService.login(this.f.username.value, this.f.password.value) 
  }
}

import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  loanList: Array<any> = [];message:string='';
  constructor(private router: Router, private formBuilder: FormBuilder,private toastr: ToastrService
    ) { 
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
      lamount:[0,Validators.required],
      loannumber: [''+num+'',Validators.required],
      ltype:['', Validators.required],
      lterm:['', Validators.required],
      sex:[0, Validators.required],
      padress:['', Validators.required],
  });
  
  }
  // convenience getter for easy access to form fields
  get f() { return this.addLoanForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.message='';
    // reset alerts on submit
   //this.alertService.clear();

    // stop here if form is invalid
    if (this.addLoanForm.invalid) {
        return;
    }

    this.loading = true;
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
let datetoday = mm + '/' + dd + '/' + yyyy;

    let obj=  {'status': 'Inprogress','fname':this.f.fname.value,'ltype':this.f.ltype.value,'lterm':this.f.lterm.value,'sex':this.f.sex.value,
    'lname':this.f.lname.value,'loanno':this.f.loannumber.value,'paddress':this.f.padress.value,'AssignTo':'','createddate':datetoday,'lamount':this.f.lamount.value}
    this.loanList.push(obj);
    localStorage.setItem("loanList", JSON.stringify(this.loanList));
    this.toastr.success('Loan data save succesfully!');
   // this.authenticationService.login(this.f.username.value, this.f.password.value) 
   this.resetForm();
   this.router.navigate(['/']);
  }
  resetForm()
  {
    var generateRandomNDigits = (n) => {
      return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
    }
    
    let num=generateRandomNDigits(5)
    this.addLoanForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      lamount:[0,Validators.required],
      loannumber: [''+num+'',Validators.required],
      ltype:['', Validators.required],
      lterm:['', Validators.required],
      sex:[0, Validators.required],
      padress:['', Validators.required],
  });
  this.message='';

  }
}

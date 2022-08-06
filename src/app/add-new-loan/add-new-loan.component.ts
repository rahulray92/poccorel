import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.css']
})
export class AddNewLoanComponent implements OnInit,OnDestroy {
  currentRoute: string;
  addLoanForm: FormGroup;
  loading = false;
  submitted = false;
  disable=true;
  loanList: Array<any> = [];message:string='';
  paramSubscription:Subscription;

  constructor(private router: Router,private route:ActivatedRoute, private formBuilder: FormBuilder,private toastr: ToastrService
    ) { 
    this.currentRoute=router.url;
    
  }

  ngOnInit(): void {
    this.paramSubscription= this.route.params.subscribe((params:Params)=>{
      console.log(params);
    })
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
    var dataList=null;
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
    //this.loanList.push();
    dataList=JSON.parse(localStorage.getItem("loanList")||'');
    if(dataList!=null)
    {
      this.loanList=dataList;
      this.loanList.push(obj);
    
    }

    localStorage.setItem("loanList", JSON.stringify(this.loanList));
    this.toastr.success('Loan data save succesfully!');
   // this.authenticationService.login(this.f.username.value, this.f.password.value) 
   this.resetForm();
   this.router.navigate(['/loansearch'],{relativeTo:this.route});
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
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}

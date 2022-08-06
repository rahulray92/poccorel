import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,NavigationEnd, ActivatedRoute, Params} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit,OnDestroy {

  // loanData=[{ id: 1, fname: 'Mohit Pal',lname: 'sharm',  loanno:"112333",status:"Pending",AssignTo:"processer",createddate:"20-07-2022"  },
  // { id: 2, fname: 'Vinay ',lname: 'sharma',  loanno:"112334",status:"Pending",AssignTo:"processer",createddate:"20-07-2022" },
  // { id: 3, fname: 'Mohan pindi', lname: 'th', loanno:"112335",status:"Initiated",AssignTo:"processer",createddate:"20-04-2022"  },
  // { id: 4, fname: 'sudher ',lname: 'dubey', loanno:"112336",status:"inprogress",AssignTo:"under wirtter",createddate:"20-07-2022"  },];
  search:string='';
  searchDetails:any;
  loanData;
  isPopup:boolean=false;editLoanForm:FormGroup;submitted = false;loanList:Array<any>=[];
  message:string='';currentRoute: string;currentUser: User;   isAccessRole:boolean=false;
  paramSubscription:Subscription;

  constructor(private router: Router,private route:ActivatedRoute,
    private authenticationService: AuthenticationService,private formBuilder: FormBuilder,private toastr: ToastrService) {
    console.log(router.url);
    this.currentRoute=router.url;
    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser!=undefined &&this.currentUser.role=='admin')
        this.isAccessRole=true;
    
   }

  ngOnInit(): void {

   this.paramSubscription= this.route.params.subscribe((params:Params)=>{
      console.log(params);
    })
    this.loanData = JSON.parse(localStorage.getItem('loanList') || '');
  }
  // convenience getter for easy access to form fields
  get f() { return this.editLoanForm.controls; }

  searchloan()
  {
    this.message='';
    //this.searchDetails=this.loanData.find(x=>x.loanId==this.search);
 if(this.searchDetails==undefined)
 this.message="Records not found"
  }
  onChange(event){
    this.message='';
    this.searchDetails=undefined;
    if(event.key.length>0 && event.key!='Backspace')
    {
      this.searchDetails=event.key;
    }
    else{
      if(this.searchDetails==undefined)
      {
        if(event.key=='Backspace')
        
        this.message="Records not found";
      }
 
    }
    console.log(event);
    console.log(event.target );
    // if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
    //   const [file] = event.target.files;
    // }
  }
  edit(loanNo:any)
  {
    
    let loanDetails=this.loanData.find(x=>x.loanno==loanNo);
    this.editLoanForm = this.formBuilder.group({
      fname: [loanDetails.fname, Validators.required],
      lname: [loanDetails.lname, Validators.required],
      lamount:[loanDetails.lamount,Validators.required],
      loannumber: [loanDetails.loanno,Validators.required],
      ltype:[''+loanDetails.ltype+'', Validators.required],
      lterm:[''+loanDetails.lterm+'', Validators.required],
      sex:[0, Validators.required],
      padress:[loanDetails.padress, Validators.required],
  });
    if(!this.isPopup)
    this.isPopup=true;
    else
    this.isPopup=false;

  }
  onUpdate()
  {
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
let datetoday = mm + '/' + dd + '/' + yyyy;
let data:Array<any> = JSON.parse(localStorage.getItem("loanList")||'')

let NewData = []
let index=data.findIndex(x=>x.loanno==this.f.loannumber.value);
data.splice(index, 1);

    let obj=  {'status': 'Inprogress','fname':this.f.fname.value,'ltype':this.f.ltype.value,'lterm':this.f.lterm.value,'sex':this.f.sex.value,
    'lname':this.f.lname.value,'loanno':this.f.loannumber.value,'paddress':this.f.padress.value,'AssignTo':'','createddate':datetoday,'lamount':this.f.lamount.value}
    //this.loanList.push(obj);
    data.push(obj);
    localStorage.setItem("loanList", JSON.stringify(data));
    this.submitted = true;
    this.isPopup=false;
    this.toastr.success('Updated succesfully!');
    this.search='';
    this.searchDetails=undefined;
  }
  close(){
    this.isPopup=false;
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
  
}

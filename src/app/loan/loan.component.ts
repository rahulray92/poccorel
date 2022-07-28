import { Component, OnInit } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loanData=[{ id: 1, fname: 'Mohit Pal',lname: 'sharm',  loanno:"112333",status:"Pending",AssignTo:"processer",createddate:"20-07-2022"  },
  { id: 2, fname: 'Vinay ',lname: 'sharma',  loanno:"112334",status:"Pending",AssignTo:"processer",createddate:"20-07-2022" },
  { id: 3, fname: 'Mohan pindi', lname: 'th', loanno:"112335",status:"Initiated",AssignTo:"processer",createddate:"20-04-2022"  },
  { id: 4, fname: 'sudher ',lname: 'dubey', loanno:"112336",status:"inprogress",AssignTo:"under wirtter",createddate:"20-07-2022"  },];
  search:string='';
  searchDetails:any;
  message:string='';currentRoute: string;
  constructor(private router: Router) {
    console.log(router.url);
    this.currentRoute=router.url;
    // this.router.events. filter(event => event instanceof NavigationEnd)
    //       .subscribe(event => 
    //        {
    //           this.currentRoute = event.url;          
    //           console.log(event);
    //        });
    
   }

  ngOnInit(): void {
  }

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
 this.message="Records not found"
    }
    console.log(event);
    console.log(event.target );
    // if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
    //   const [file] = event.target.files;
    // }
  }
}

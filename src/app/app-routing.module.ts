
import { RouterModule, Routes } from '@angular/router';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],children:[
    { path: 'loansearch', component: LoanComponent},
      { path: 'addnewloan', component: AddNewLoanComponent}
    
  ] },
    { path: 'login', component: LoginComponent },
    
    // { path: 'addnewloan', component: AddNewLoanComponent },
    
    { path: '',   redirectTo: 'PagenotfoundComponent', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];


export const appRoutingModule = RouterModule.forRoot(routes);

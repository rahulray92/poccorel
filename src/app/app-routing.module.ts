
import { RouterModule, Routes } from '@angular/router';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'loan', component: LoanComponent },
    { path: 'addnewloan', component: AddNewLoanComponent },
    
    // { path: '',   redirectTo: '/loan', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];


export const appRoutingModule = RouterModule.forRoot(routes);

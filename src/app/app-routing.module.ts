
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


export const appRoutingModule = RouterModule.forRoot(routes);

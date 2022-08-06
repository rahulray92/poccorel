import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loan management application';
  currentUser: User ;
  isAuthenticated:boolean=false;
  private mssubscription: Subscription;
  users:any = [];

    constructor(
        private router: Router,
        private route:ActivatedRoute,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.mssubscription=this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        
    }

    logout() {
      localStorage.removeItem('users');
        this.authenticationService.logout();
        this.router.navigate(['/login'],{relativeTo:this.route}).then(() => {
          window.location.reload();
        });;
       
        this.isAuthenticated=false;
        this.mssubscription.unsubscribe();
    }
    ngOnInit()
    {
      this.currentUser = this.authenticationService.currentUserValue;
     
      this.mssubscription = this.userService.getAll()
      .pipe(first())
            .subscribe(users => this.users = users);
             if(this.currentUser)
        this.isAuthenticated=true;
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  private subscription: Subscription;
  users:any = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
       
        this.isAuthenticated=false;
        this.subscription.unsubscribe();
    }
    ngOnInit()
    {
      this.currentUser = this.authenticationService.currentUserValue;
     
      this.subscription = this.userService.getAll()
      .pipe(first())
            .subscribe(users => this.users = users);
             if(this.currentUser)
        this.isAuthenticated=true;
    }
}

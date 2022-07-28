import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../models/user';


import {  AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
    users:any = [];
    search:string='';
    isprofile:boolean=false;
    htmlTrustUrl:SafeUrl;currentRoute: string;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private sanitizer: DomSanitizer,
        private router: Router
    ) {
        this.currentRoute=router.url;
        this.currentUser = this.authenticationService.currentUserValue;
        this.htmlTrustUrl=this.sanitizer.bypassSecurityTrustResourceUrl("#");
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
    onProfile()
    {
        if(!this.isprofile)
       this.isprofile=true; 
       else
       this.isprofile=false;
    }
}

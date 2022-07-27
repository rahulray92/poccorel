import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public apiUrl="http://localhost:4200";
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('currentUser')==null?'':JSON.parse(localStorage.getItem('currentUser')||''));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username:any, password:any):Observable<any> {
        // let users = JSON.parse(localStorage.getItem('users') || '');
        // const user = users.find(x => x.username === username && x.password === password);
            
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //    this.currentUserSubject.next(user);
        //     return user;
        let url=this.apiUrl+'/users/authenticate';
        return this.http.post<any>(url, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        const userJson = localStorage.getItem('currentUser');       
        this.currentUserSubject.next(userJson !== null ? JSON.parse(userJson) : new User());
        //this.currentUserSubject.next(null);
    }
}
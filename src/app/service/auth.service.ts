import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {User} from "../model/user.model";


@Injectable()
export class AuthService {
  token: string;  
  welcomeName : string  
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): User {
        return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    console.log('email:', email)
    let urlAuth = this.baseUrl;
    return this.http.post<any>(urlAuth + '/authenticate', {email: email, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          
          this.token = user.token
          this.welcomeName = user.firstName;
          console.log('uuuuuuuuuuuu:', this.welcomeName)
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }
  
   register(user:any) {
    console.log('email:', user.email)
    let urlAuth = this.baseUrl;
    return this.http.post<any>(urlAuth + '/register', {email: user.email, firstName:user.firstName, lastName:user.lastName, password: user.password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.token = user.token;
          this.welcomeName = user.firstName;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  
  
   logout() {
    // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);   
    this.token = null;
    this.router.navigateByUrl('login');
  } 

  isAuthorized() {
    // Just check if token exists
    // It not, user has never logged in current session
    return Boolean(this.token);
  }
  
  getWelcome() {
    // Just check if token exists
    // It not, user has never logged in current session
    return this.welcomeName;
  }
}

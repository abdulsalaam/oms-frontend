import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import { environment } from '../../environments/environment'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  //baseUrl: string = 'http://localhost:8080/user-portal/users';
  baseUrl: string = environment.baseUrl;

  getUsers() {
    /* let fakeUsers = [{id: 1, firstName: 'Dhiraj', lastName: 'Ray', email: 'dhiraj@gmail.com'},
     {id: 1, firstName: 'Tom', lastName: 'Jac', email: 'Tom@gmail.com'},
     {id: 1, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com'},
     {id: 1, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com'},
   ];
   return Observable.of(fakeUsers).delay(5000);*/
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl+ '/users/', user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/users/' + user._id, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + '/users/' + id);
  }
}

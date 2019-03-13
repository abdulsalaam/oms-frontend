import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user._id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
      console.log('usssss:',user);
     if(user) {
        console.log('user:',user);  
        localStorage.removeItem("editUserId");
        localStorage.setItem("editUserId", user._id.toString());
        this.router.navigate(['edit-user']);
     }
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    console.log('user id33:' ,userId); 
    this.userService.getUserById(userId)
      .subscribe( data => {
        console.log('edit user data:' ,data);
        let user : any = data.hasOwnProperty('data') && typeof data['data'] !== 'undefined' ? data['data'] : [];
        let formData = { _id:user._id, email:user.email, firstName: user.name, lastName:user.lastName}        
        this.editForm.setValue(formData);
      });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}

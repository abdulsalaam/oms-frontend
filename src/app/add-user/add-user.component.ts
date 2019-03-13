import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
     console.log('aaaaaaaaaaaa:',this.addForm.value); 
    this.authService.register(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }

}

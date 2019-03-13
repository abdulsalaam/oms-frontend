import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  onSubmit() {
     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa',this.loginForm.controls.email.value);
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    if(this.loginForm.controls.email.value && this.loginForm.controls.password.value) {
        this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
            .subscribe((user: any) => {
                if (user) {
                    //this.sharedService.changemessage(user);  
                   this.router.navigate(['orders']);
                } else {
                    const loginError = 'Unable to login';
                    
                }
            },
            (err: any) => { 
            console.log(err)
            });
        
    }else {
      this.invalidLogin = true;
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}

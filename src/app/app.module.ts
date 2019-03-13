import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {AuthService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {ListUserComponent} from "./list-user/list-user.component";
import {UserService} from "./service/user.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./material.module";

import { AddOrderComponent } from './orders/add.component';
import { EditOrderComponent } from './orders/edit.component';
import { ViewOrderComponent } from './orders/view.component';
import {ListOrderComponent} from "./orders/list.component";
import {OrderService} from "./service/order.service";

// Services
import { AuthInterceptor } from './service/auth.interceptor';
import { AuthGuard } from './service/auth.guard.service';
import { NavBarComponent } from './header/navbar.component';
import { SharedService } from './service/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    NavBarComponent,
    AddOrderComponent,
    EditOrderComponent,
    ListOrderComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [AuthService, UserService, AuthInterceptor, AuthGuard, SharedService, OrderService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

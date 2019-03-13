import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

import {ListOrderComponent} from "./orders/list.component";
import {AddOrderComponent} from "./orders/add.component";
import {EditOrderComponent} from "./orders/edit.component";
import {ViewOrderComponent} from "./orders/view.component";
// Services
import { AuthGuard } from './service/auth.guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: AddUserComponent },
  { path: 'orders', component: ListOrderComponent, canActivate: [ AuthGuard ] },
  { path: 'add-order', component: AddOrderComponent, canActivate: [ AuthGuard ] },
  { path: 'edit-order', component: EditOrderComponent, canActivate: [ AuthGuard ] },
  { path: 'view-order', component: ViewOrderComponent, canActivate: [ AuthGuard ] },
  { path: 'users', component: ListUserComponent, canActivate: [ AuthGuard ] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [ AuthGuard ] },
  {path : '', component : LoginComponent}
  
];

export const routing = RouterModule.forRoot(routes);

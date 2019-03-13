import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Subscription } from 'rxjs';
import {SharedService} from '../service/shared.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .active { color: orange; }
  `]
})
export class NavBarComponent {
  title : string = 'Order Management System';
  firstName:string = '';
  
  currentUser: any;
  currentUserSubscription: Subscription;
    
  constructor(private authSrv: AuthService, private sharedService : SharedService) {
      this.currentUserSubscription = this.authSrv.currentUser.subscribe(user => {
            this.currentUser = user;
        });
  } 

  ngOnInit() {
  console.log('wwwww:',this.currentUser)    
  /*let currentUser: any = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : {};
  console.log('llllll:',localStorage.getItem('currentUser'))
  */
  this.firstName = this.authSrv.welcomeName;
  }
  isAuth() {
    console.log('testing:',this.authSrv.isAuthorized());  
    return this.authSrv.isAuthorized();
  }
  
  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
  
}

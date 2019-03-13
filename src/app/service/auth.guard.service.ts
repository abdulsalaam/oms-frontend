import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  Router, 
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
   ) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ) {
    const isAuth = this.authService.isAuthorized();
    if (!isAuth) {
      this.router.navigateByUrl('login');
    }
    return this.authService.isAuthorized();
  }
}

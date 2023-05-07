import { Injectable } from '@angular/core';
import {
  CanActivate, CanLoad, Router, UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsSessionExpiredGuard implements CanLoad, CanActivate {
  token: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.token = this.authService.getToken();
  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.authService.getToken();
    const redirect = this.router.createUrlTree(['login']);
    const jwtHelper = new JwtHelperService();
    try {
      const notExpired = !jwtHelper.isTokenExpired(this.token);
      if (notExpired) {
        return true;
      }
      return redirect;
    } catch (error) {
      return redirect;
    }
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.authService.getToken();
    const redirect = this.router.createUrlTree(['login']);
    const jwtHelper = new JwtHelperService();
    try {
      const notExpired = !jwtHelper.isTokenExpired(this.token);
      if (notExpired) {
        return true;
      }
      return redirect;
    } catch (error) {
      return redirect;
    }
  }
}

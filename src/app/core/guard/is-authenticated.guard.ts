import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
//
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanLoad, CanActivate {
  token!: string;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.token = this.authService.getToken();
  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.authService.getToken();
    const redirect = this.router.createUrlTree(['login']);
    try {
      if (this.token) {
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
    try {
      if (this.token) {
        return true;
      }
      return redirect;
    } catch (error) {
      return redirect;
    }
  }
}

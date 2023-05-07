import { Injectable } from '@angular/core';
import {
  CanActivate, CanLoad, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAlreadyLoggedInGuard implements CanLoad, CanActivate {
  token: string;
  constructor(
    private authService: AuthService,
  ) {
    this.token = this.authService.getToken();
  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.authService.getToken();
    return this.authService.renewLogin(this.token);
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.authService.getToken();
    return this.authService.renewLogin(this.token);
  }
}

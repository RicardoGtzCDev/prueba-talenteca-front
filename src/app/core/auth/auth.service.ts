import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import {
  BehaviorSubject,
  catchError,
  map,
  throwError,
  of,
} from 'rxjs';

import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { IJwtUserInfo, JwtUserInfo } from 'src/app/shared/models/jwt-user-info';
import { BASE_BACKEND_URL, LOCAL_STOTAGE_ITEMS } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<string>('');
  token$ = this.token.asObservable();
  getToken() { return this.token.getValue(); }
  setToken(newToken: string) { this.token.next(newToken); }

  private jwtUserInfo = new BehaviorSubject<IJwtUserInfo>(new JwtUserInfo());
  user$ = this.jwtUserInfo.asObservable();
  getUser() { return this.jwtUserInfo.getValue(); }
  setUser(newJwtUserInfo: IJwtUserInfo) { this.jwtUserInfo.next(newJwtUserInfo); }

  constructor(
    private http: HttpClient,
    private router: Router,
    private lsService: LocalStorageService,
  ) { }

  login = (email: string, contraseña: string) => {
    const url = `${BASE_BACKEND_URL}/Auth`;
    const data = { email, contraseña };
    return this.http.post(url, data, { responseType: 'text' })
      .pipe(
        map((resp) => {
          this.setSession(resp);
          return true;
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        }),
      );
  };

  renewToken = (token: string) => {
    const url = `${BASE_BACKEND_URL}/Auth`;
    const customHeader: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(url, { headers: customHeader, responseType: 'text' })
      .pipe(
        map((resp) => {
          this.setSession(resp);
          return true;
        }),
        catchError(() => {
          const redirect = this.router.createUrlTree(['login']);
          return of(redirect);
        }),
      );
  };

  renewLogin = (token: string) => {
    const url = `${BASE_BACKEND_URL}/Auth`;
    const customHeader: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(url, { headers: customHeader, responseType: 'text' })
      .pipe(
        map((resp) => {
          this.setSession(resp);
          const redirect = this.router.createUrlTree([]);
          return redirect;
        }),
        catchError(() => of(true)),
      );
  };

  logout = () => {
    this.setToken('');
    this.setUser(new JwtUserInfo());
    this.lsService.removeItem(LOCAL_STOTAGE_ITEMS.token);
  };

  setSession = (token: string) => {
    const userInfo = this.decodeJWT(token);
    if (userInfo) {
      userInfo.id = Number(userInfo.id);
      this.setUser(userInfo);
      this.setToken(token);
      this.lsService.setItem(LOCAL_STOTAGE_ITEMS.token, token);
    } else {
      throw new Error('No fue posible recuperar la información del usuario.');
    }
  };

  private decodeJWT = (token: string) => {
    const jwtHelper = new JwtHelperService();
    const decodedJwt: IJwtUserInfo | null = jwtHelper.decodeToken(token);
    return decodedJwt;
  };
}

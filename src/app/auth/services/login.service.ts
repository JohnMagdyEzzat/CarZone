import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  User,
  UserForgotPassword,
  UserLogin,
  UserLogout,
  UserRegister,
  UserResetPassword,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiURL = 'https://sunny-macaque-arguably.ngrok-free.app/api/';
  private defaultHeaders = new HttpHeaders().set('ngrok-skip-browser-warning', '69420');
  private http = inject(HttpClient);

  constructor() {}

  public login(body: UserLogin) {
    return this.http.post<{ data: User }>(this.baseApiURL + 'login', body, {
      headers: this.defaultHeaders,
    });
  }

  public register(body: UserRegister) {
    return this.http.post<{ data: User }>(this.baseApiURL + 'register', body, {
      headers: this.defaultHeaders,
    });
  }

  public logout(body: UserLogout) {
    return this.http.post<{ data: User }>(this.baseApiURL + 'logout', body, {
      headers: this.defaultHeaders,
    });
  }

  public resetPassword(body: UserResetPassword) {
    return this.http.post<{ data: User[] }>(
      this.baseApiURL + 'reset-password',
      body,
      {
        headers: this.defaultHeaders,
      }
    );
  }

  public forgotPassword(body: UserForgotPassword) {
    return this.http.post<{ data: User[] }>(
      this.baseApiURL + 'forgot-password',
      body,
      {
        headers: this.defaultHeaders,
      }
    );
  }

  public getUserById(id: number) {
    return this.http.get<{ data: User }>(this.baseApiURL + 'users/' + id, {
      headers: this.defaultHeaders,
    });
  }
}

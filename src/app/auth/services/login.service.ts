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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private loginURL = environment.apiUrl + 'login';
  private registerURL = environment.apiUrl + 'register';
  private logoutURL = environment.apiUrl + 'logout';
  private resetPasswordURL = environment.apiUrl + 'reset-password';
  private forgotPasswordURL = environment.apiUrl + 'forgot-password';
  private usersURL = environment.apiUrl + 'users';

  constructor() {}

  public login(body: UserLogin) {
    return this.http.post<{ data: User }>(this.loginURL, body);
  }

  public register(body: UserRegister) {
    return this.http.post<{ data: User }>(this.registerURL, body);
  }

  public logout(body: UserLogout) {
    return this.http.post<{ data: User }>(this.logoutURL, body);
  }

  public resetPassword(body: UserResetPassword) {
    return this.http.post<{ data: User[] }>(this.resetPasswordURL, body);
  }

  public forgotPassword(body: UserForgotPassword) {
    return this.http.post<{ data: User[] }>(this.forgotPasswordURL, body);
  }

  public getUserById(id: number) {
    return this.http.get<{ data: User }>(`${this.usersURL}/${id}`);
  }
}

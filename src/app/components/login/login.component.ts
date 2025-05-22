import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  faGoogle = faGoogle;
  faApple = faApple;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor() {}

  ngOnInit() {}

  login() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.loginService
        .login(this.payload)
        .pipe(
          tap((response) => {
            if (response) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id', response.data.id.toString());
              this.authService.currentUserSig.set(response.data);
              this.router.navigateByUrl('/');
            }
          })
        )
        .subscribe();
    }
  }

  get payload(): UserLogin {
    return {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
  }
}

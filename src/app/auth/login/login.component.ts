import { LoginService } from './services/login.service';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UserLogin } from './models/user.model';
import { tap } from 'rxjs';

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
      this.loginService.login(this.payload)
        .pipe(
          tap((data) => {
            if (data) {
              this.router.navigate(['/home']);
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

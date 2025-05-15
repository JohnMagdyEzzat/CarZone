import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import { User, UserRegister } from '../login/models/user.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  registerForm = this.fb.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    phoneNo: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  public register() {
    if (this.registerForm.value && this.registerForm.valid) {
      this.loginService.register(this.payload)
        .pipe(
          tap((data) => {
            if (data) {
              this.router.navigate(['/login']);
            }
          })
        )
        .subscribe();
    }
  }

  get payload(): UserRegister {
    return {
      fname: this.registerForm.value.fname || '',
      lname: this.registerForm.value.lname || '',
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      phone_no: this.registerForm.value.phoneNo || '',
      address: this.registerForm.value.address || '',
    };
  }

  public updatePhoneValue(event: KeyboardEvent) {
    const reg = /^\d+$/;
    const input = event.key;
    const phone = this.registerForm.value.phoneNo;

    if (!reg.test(input) || (input !== '0' && phone?.length === 0)) {
      event.preventDefault();
    }

    if (phone?.length === 3) {
      this.registerForm.patchValue({ phoneNo: phone + ' ' });
    }
    if (phone?.length === 8) {
      this.registerForm.patchValue({ phoneNo: phone + ' ' });
    }
  }
}

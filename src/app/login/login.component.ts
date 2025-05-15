import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, FontAwesomeModule],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  faGoogle = faGoogle;
  faApple = faApple;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor() {}

  ngOnInit() {}

  login(){
    console.log('login');
    
  }
}

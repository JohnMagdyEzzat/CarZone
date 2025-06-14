import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-reveal',
  imports: [],
  templateUrl: './password-reveal.component.html',
  styleUrl: './password-reveal.component.css',
})
export class PasswordRevealComponent {
  @Input({ required: true }) passwordField!: HTMLInputElement;
  passwordRevealed = false;

  togglePasswordRevealed(input: HTMLInputElement): void {
    this.passwordRevealed = !this.passwordRevealed;
    this.passwordRevealed ? (input.type = 'text') : (input.type = 'password');
  }
}

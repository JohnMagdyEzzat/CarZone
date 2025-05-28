import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  OnInit,
  Signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, UserResetPassword, UserUpdate } from '../../models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { tap } from 'rxjs';
import { IComment } from '../../models/comment';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  authService = inject(AuthService);
  loginService = inject(LoginService);
  router = inject(Router);
  fb = inject(FormBuilder);
  commentService = inject(CommentService);

  resetPasswordDiv: Signal<ElementRef | undefined> = viewChild('resetPassword');

  comments: IComment[] = [];
  user?: User | null;
  editBtnTitle: string = 'Edit Profile';
  editMode: boolean = false;
  isResetPassword: boolean = false;

  profileForm = this.fb.group({
    fname: [this.user?.name.split(' ')[0], [Validators.required]],
    lname: [this.user?.name.split(' ')[1], [Validators.required]],
    email: [this.user?.email, [Validators.required, Validators.email]],
    phone: [this.user?.phone_no, [Validators.required]],
    address: [this.user?.address, [Validators.required]],
  });
  resetPasswordForm = this.fb.group({
    password: [this.user?.name.split(' ')[0], [Validators.required]],
    confirmPassword: [this.user?.name.split(' ')[1], [Validators.required]],
    otp: [this.user?.email, [Validators.required, Validators.email]],
  });

  toggleEditProfile() {
    this.editMode = !this.editMode;
    this.editBtnTitle = !this.editMode ? 'Edit Profile' : 'Save Changes';
    if (!this.editMode && this.user) {
      const userId = this.user.id;
      console.log('here');
      this.loginService.updateUser(userId, this.updateUserPayload).subscribe();
    }
  }

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments(): void {
    this.commentService
      .getAllComments()
      .pipe(
        tap((res) => {
          this.comments = res.data.filter((comment) => {
            this.user = this.authService.currentUserSig();
            this.initializeProfileForm();
            return comment.user_id === this.authService.currentUserSig()?.id;
          });
        })
      )
      .subscribe();
  }

  initializeProfileForm() {
    this.profileForm.patchValue({
      fname: this.user?.name.split(' ')[0],
      lname: this.user?.name.split(' ')[1],
      email: this.user?.email,
      phone: this.user?.phone_no,
      address: this.user?.address,
    });
  }

  logout() {
    this.loginService.logout(this.forgotPasswordPayload).subscribe();
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('/');
  }
  get forgotPasswordPayload() {
    return {
      email: this.authService.currentUserSig()?.email || '',
      token: localStorage.getItem('token') || '',
    };
  }
  get updateUserPayload(): UserUpdate {
    return {
      fname:
        this.profileForm.value.fname || this.user?.name.split(' ')[0] || '',
      lname:
        this.profileForm.value.lname || this.user?.name.split(' ')[0] || '',
      email: this.profileForm.value.email || this.user?.email || '',
      phone_no: this.profileForm.value.phone || this.user?.phone_no || '',
      address: this.profileForm.value.address || this.user?.address || '',
    };
  }
  get resetPasswordPayload(): UserResetPassword {
    return {
      password: this.resetPasswordForm.value.password || '',
      password_confirmation: this.resetPasswordForm.value.confirmPassword || '',
      otp: this.resetPasswordForm.value.otp || '',
      email: this.user?.email || '',
    };
  }

  forgetPassword() {
    this.loginService
      .forgotPassword({ email: this.forgotPasswordPayload.email })
      .subscribe();

    this.resetPasswordDiv()!.nativeElement.style.height = '150px';

    this.isResetPassword = true;
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      this.loginService.resetPassword(this.resetPasswordPayload).subscribe({
        next: () => {
          this.resetPasswordDiv()!.nativeElement.style.height = '0px';
          this.isResetPassword = false;
        },
        error: () => {
          console.error('Failed to call reset password api');
        },
      });
    } else {
      console.log('form is not valid');
    }
  }
  editComment(comment: IComment): void {
    // this.commentService.updateComment()
    console.log('edit', comment);
  }
  deleteComment(comment: IComment): void {
    console.log('delete', comment);
  }
}

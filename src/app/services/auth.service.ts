import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<User | undefined | null>(undefined);
  constructor() {}
}

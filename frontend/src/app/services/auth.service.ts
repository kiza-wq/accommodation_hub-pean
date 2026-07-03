import { inject, Injectable, signal } from '@angular/core';
import { AuthUser, LoginPayload, RegisterPayload } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_PREFIX } from './tokens';
import { LoginModalService } from './login.service';
import { RegisterModalService } from './register.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private STORAGE_KEY = 'auth_token';
  private http = inject(HttpClient);
  private apiPrefix = inject(API_PREFIX);
  private loginModal = inject(LoginModalService);
  private registerModal = inject(RegisterModalService);
  private router = inject(Router);
  loading = signal(false);
  user = signal<AuthUser | null>(null);
  error = signal<string | null>(null);

  loadSession(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed ?? null;
    } catch (error) {
      return null;
    }
  }

  setSession(user: AuthUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  login(payload: LoginPayload): void {
    this.loading.set(false);
    this.error.set(null);
    this.http.post<AuthUser>(`${this.apiPrefix}/api/auth/login`, payload).subscribe({
      next: (user) => {
        this.setSession(user);
        this.loading.set(false);
        this.loginModal.onClose();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.error.set('Error while Logging in!');
      },
    });
  }

  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.user.set(null);
  }

  register(payload: RegisterPayload): void {
    this.loading.set(false);
    this.error.set(null);
    this.http.post<AuthUser>(`${this.apiPrefix}/api/auth/register`, payload).subscribe({
      next: (user) => {
        console.log(user);
        this.setSession(user);
        this.loading.set(false);
        this.registerModal.onClose();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.error.set('Error while Registring!');
      },
    });
  }
}

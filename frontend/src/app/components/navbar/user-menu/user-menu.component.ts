import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginModalService } from '../../../services/login.service';
import { RegisterModalService } from '../../../services/register.service';
import { RentModalService } from '../../../services/rent.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3Mini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-user-menu',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroBars3Mini })],
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
  private router = inject(Router);
  private loginModal = inject(LoginModalService);
  private registerModal = inject(RegisterModalService);
  protected authService = inject(AuthService);
  private rentModal = inject(RentModalService);
  isOpen = signal(false);
  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  handleAuthClick(type: 'login' | 'register'): void {
    this.isOpen.set(false);
    type == 'login' ? this.loginModal.onOpen() : this.registerModal.onOpen();
  }
  navigate(path: string): void {
    this.router.navigate([path]);
  }

  handleOpenRentModal(): void {
    this.rentModal.onOpen();
    this.isOpen.set(false);
  }
  logout(): void {
    this.authService.clearSession();
    this.isOpen.set(false);
  }

  onRent(): void {
    const currentUser = this.authService.loadSession();
    if (!currentUser) return this.loginModal.onOpen();
    this.rentModal.onOpen();
    this.isOpen.set(false);
  }
}

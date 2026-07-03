import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginModalService {
  isOpen = signal(false);

  onOpen(): void {
    this.isOpen.set(true);
  }
  onClose(): void {
    this.isOpen.set(false);
  }
}

import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeadingComponent } from '../../../shared/heading/heading.component';
import { LoginModalService } from '../../../services/login.service';
import { RegisterModalService } from '../../../services/register.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [ModalComponent, ReactiveFormsModule, HeadingComponent],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  protected loginModal = inject(LoginModalService);
  protected registerModal = inject(RegisterModalService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  error = this.auth.error;
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('Error in the Form!');
      return;
    }
    const { email, password } = this.form.getRawValue();
    console.log(email, password);
    this.auth.login({ email, password });
  }

  onToggle(): void {
    this.loginModal.onClose();
    this.registerModal.onOpen();
    this.error.set(null);
  }
}

import { Component, inject, signal } from '@angular/core';
import { LoginModalService } from '../../../services/login.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { HeadingComponent } from '../../../shared/heading/heading.component';
import { RegisterModalService } from '../../../services/register.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register-modal',
  imports: [ModalComponent, ReactiveFormsModule, HeadingComponent],
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent {
  protected loginModal = inject(LoginModalService);
  protected registerModal = inject(RegisterModalService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  error = signal<string | null>(null);
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('Error in the Form!');
      return;
    }
    const { email, password, name } = this.form.getRawValue();
    console.log(email, password, name);
    this.auth.register({ name, email, password });
    return;
  }

  onToggle(): void {
    this.registerModal.onClose();
    this.loginModal.onOpen();
    this.error.set(null);
  }
}

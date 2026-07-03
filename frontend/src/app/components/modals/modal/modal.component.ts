import { Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-modal',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  isOpen = input(false);
  title = input.required<string>();
  error = input<string | null>(null);
  label = input.required<string>();
  secondaryLabel = input<string>();
  hasSecondaryLabel = computed(() => !!this.secondaryLabel());
  secondaryLabelAction = output<void>();
  onSubmit = output<void>();
  onClose = output<void>();

  handleClick(): void {
    this.onSubmit.emit();
  }

  handleSecondaryLabel(): void {
    this.secondaryLabelAction.emit();
  }

  handleClose(): void {
    this.onClose.emit();
  }
}

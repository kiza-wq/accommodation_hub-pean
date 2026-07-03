import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CATEGORIES } from '../../modals/rent-modal/rent-modal.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private router = inject(Router);
  categories = CATEGORIES;
  currentUrl = toSignal(this.router.events.pipe(map(() => this.router.url)), {
    initialValue: this.router.url,
  });

  isMainPage = computed<boolean>(() => this.currentUrl().split('?')[0] == '/');

  selectedCategory = computed<string | null>(() => {
    const url = this.currentUrl();
    const params = new URLSearchParams(url.includes('?') ? url.split('?')[0] : '');
    return params.get('category');
  });

  handleClick(label: string): void {
    const url = this.currentUrl();
    const params = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');
    if (params.get('category') == label) {
      params.delete('category');
    } else {
      params.set('category', label);
    }
    const queryParams = Object.fromEntries(params.entries());
    this.router.navigate(['/'], { queryParams });
  }
}

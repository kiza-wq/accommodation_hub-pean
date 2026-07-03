import { Component, computed, inject, input, output } from '@angular/core';
import { Listing } from '../../models/listing.model';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-listing-card',
  imports: [],
  templateUrl: './listing-card.component.html',
})
export class ListingCardComponent {
  private router = inject(Router);
  private countryService = inject(CountryService);
  data = input.required<Listing>();
  actionLabel = input<string>('');
  onAction = output<void>();
  handleClick() {
    this.onAction.emit();
  }

  location = computed(() => this.countryService.findByCode(this.data().locationValue));

  navigateToListing(): void {
    this.router.navigate(['/listings', this.data().id]);
  }
}

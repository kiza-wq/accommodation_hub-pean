import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CountryOption, CountryService } from '../../services/country.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-select',
  imports: [FormsModule],
  templateUrl: './country-select.component.html',
})
export class CountrySelectComponent {
  private contries = inject(CountryService);
  selectedCountry = input<CountryOption | null | undefined>(undefined);
  countryChange = output<CountryOption | null>();
  filterText = signal('');
  dropdownOpen = signal(false);

  countryPool = this.contries.findAll();
  matchingCountries = computed(() => {
    const term = this.filterText().toLowerCase().trim();
    if (!term) return this.countryPool;
    return this.countryPool.filter(
      (c) => c.label.toLowerCase().includes(term) || c.region.toLowerCase().includes(term),
    );
  });

  selectedLabel = computed(() => {
    const country = this.selectedCountry();
    return country ? `${country.flag} ${country.label}` : '';
  });

  openDropDown(): void {
    this.dropdownOpen.set(true);
    this.filterText.set('');
  }

  closeDropDown(): void {
    this.dropdownOpen.set(false);
  }

  clearSelection(): void {
    this.countryChange.emit(null);
  }

  pickCountry(country: CountryOption): void {
    this.countryChange.emit(country);
    this.dropdownOpen.set(false);
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { RentModalService } from '../../../services/rent.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountrySelectComponent } from '../../../shared/country-select/country-select.component';
import { CountryOption } from '../../../services/country.service';
import { MapComponent } from '../../../shared/map/map.component';
import { CounterComponent } from '../../../shared/counter/counter.component';
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';
import { ListingService } from '../../../services/listing.service';

enum Step {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface Category {
  label: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { label: 'Beachfront', icon: '🏖️' },
  { label: 'Amaying Views', icon: '🌄' },
  { label: 'Countryside', icon: '☘️' },
  { label: 'City Center', icon: '🏙️' },
  { label: 'Cabins', icon: '🪵' },
  { label: 'Lakeside', icon: '🏞️' },
  { label: 'Luxury', icon: '💎' },
  { label: 'Camping', icon: '🏕️' },
  { label: 'Islands', icon: '🏝️' },
  { label: 'Pools', icon: '🏊' },
  { label: 'Pet Friendly', icon: '🐈' },
  { label: 'Work Friendly', icon: '💼' },
  { label: 'Family Friendly', icon: '👨‍👩‍👦' },
];

@Component({
  selector: 'app-rent-modal',
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    CommonModule,
    CountrySelectComponent,
    CountrySelectComponent,
    MapComponent,
    CounterComponent,
    ImageUploadComponent,
  ],
  templateUrl: './rent-modal.component.html',
})
export class RentModalComponent {
  protected rentModal = inject(RentModalService);
  private listingService = inject(ListingService);
  private fb = inject(FormBuilder);
  categories = CATEGORIES;

  step = signal<Step>(Step.CATEGORY);
  error = signal<String | null>(null);
  Step = Step;
  label = computed(() => (this.step() == Step.PRICE ? 'Create' : 'Next'));
  showBackButton = computed(() => this.step() > Step.CATEGORY);

  form = this.fb.group({
    category: [''],
    location: this.fb.control<CountryOption | null>(null),
    guestCount: [1, Validators.min(1)],
    roomCount: [1, Validators.min(1)],
    bathRoomCount: [1, Validators.min(1)],
    imageSrc: [''],
    price: [1, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    title: ['', Validators.required],
  });

  setCategory(category: string): void {
    this.form.controls.category.setValue(category);
  }
  setLocation(category: CountryOption | null): void {
    this.form.controls.location.setValue(category);
  }

  setImage(imageUrl: string): void {
    this.form.controls.imageSrc.setValue(imageUrl);
  }
  onBack(): void {
    this.step.update((s) => s - 1);
  }

  setCounter(field: 'guestCount' | 'roomCount' | 'bathRoomCount', value: number): void {
    this.form.controls[field].setValue(value);
  }

  onNext(): void {
    this.step.update((s) => s + 1);
  }

  onSubmit(): void {
    if (this.step() < Step.PRICE) return this.onNext();
    if (this.form.invalid) {
      this.error.set('The form is invalid. Review before submitting.');
    }
    this.listingService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        this.step.set(Step.CATEGORY);
        this.rentModal.onClose();
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}

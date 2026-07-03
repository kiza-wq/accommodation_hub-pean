import { Component, computed, inject, resource, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { ListingService } from '../../services/listing.service';
import { HeadingComponent } from '../../shared/heading/heading.component';
import { CountryService } from '../../services/country.service';
import { AuthService } from '../../services/auth.service';
import { MapComponent } from '../../shared/map/map.component';
import {
  DateRange,
  ListingReservationComponent,
} from '../../shared/listing-reservation/listing-reservation.component';
import { LoginModalService } from '../../services/login.service';
import { ReservationService } from '../../services/reservations.service';

@Component({
  selector: 'app-listings',
  imports: [HeadingComponent, MapComponent, ListingReservationComponent],
  templateUrl: './listings.component.html',
})
export class ListingsComponent {
  private route = inject(ActivatedRoute);
  private listingService = inject(ListingService);
  private countryService = inject(CountryService);
  private authService = inject(AuthService);
  private loginModal = inject(LoginModalService);
  private reservationService = inject(ReservationService);

  dateRange = signal<DateRange>({ startDate: null, endDate: null });
  onDateRangeChange(range: DateRange) {
    this.dateRange.set(range);
  }

  id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  currentUser = this.authService.loadSession();
  isLoading = signal(false);

  listingResource = resource({
    params: () => this.id(),
    loader: async ({ params: id }) => {
      if (!id) {
        return null;
      }
      return firstValueFrom(this.listingService.getListingById(id));
    },
  });

  reservationsResource = resource({
    params: () => this.id(),
    loader: async ({ params: id }) => {
      return firstValueFrom(this.reservationService.getListingReservations(id));
    },
  });

  disabledDates = computed<Date[]>(() => {
    const reservations = this.reservationsResource.value();

    return (this.reservationsResource?.value() ?? []).flatMap((r) => {
      const dates: Date[] = [];
      for (const d = new Date(r.startDate); d <= new Date(r.endDate); d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    });
  });

  onReserve(totalPrice: number): void {
    if (!this.currentUser) {
      this.loginModal.onOpen();
      return;
    }
    const listing = this.listingResource.value();
    if (!listing) return;
    const { startDate, endDate } = this.dateRange();
    if (!startDate || !endDate) return;
    this.isLoading.set(true);
    this.reservationService
      .create({
        listingId: listing.id,
        startDate,
        endDate,
        totalPrice: totalPrice,
      })
      .subscribe({
        next: () => {
          this.dateRange.set({ startDate: null, endDate: null });
          this.reservationsResource.reload();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  location = computed(() => {
    const listing = this.listingResource.value();
    if (!listing) return null;
    return this.countryService.findByCode(listing.locationValue);
  });
}

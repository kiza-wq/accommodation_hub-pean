import { Component, inject, resource, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservations.service';
import { firstValueFrom } from 'rxjs';
import { HeadingComponent } from '../../shared/heading/heading.component';
import { ListingCardComponent } from '../../components/listing-card/listing-card.component';

@Component({
  selector: 'app-trips',
  imports: [HeadingComponent, ListingCardComponent],
  templateUrl: './trips.component.html',
})
export class TripsComponent {
  private authService = inject(AuthService);
  private reservationService = inject(ReservationService);
  deletingId = signal<string | null>(null);
  currentUser = this.authService.loadSession();

  tripsResource = resource({
    params: () => this.currentUser?.id,
    loader: async ({ params: id }) => {
      if (!this.currentUser?.id) return [];
      return firstValueFrom(this.reservationService.getUserReservations(id));
    },
  });

  onDelete(reservationId: string): void {
    this.deletingId.set(reservationId);
    firstValueFrom(this.reservationService.delete(reservationId))
      .then(() => this.tripsResource.reload())
      .finally(() => this.deletingId.set(null));
  }
}

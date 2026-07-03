import { Component, inject, resource, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { HeadingComponent } from '../../shared/heading/heading.component';
import { ListingCardComponent } from '../../components/listing-card/listing-card.component';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-properties',
  imports: [HeadingComponent, ListingCardComponent],
  templateUrl: './properties.component.html',
})
export class PropertiesComponent {
  private authService = inject(AuthService);
  private listingService = inject(ListingService);
  deletingId = signal<number | null>(null);
  currentUser = this.authService.loadSession();

  propertiesResource = resource({
    params: () => this.currentUser?.id,
    loader: async ({ params: id }) => {
      if (!this.currentUser?.id) return [];
      return firstValueFrom(this.listingService.getUserListings(id));
    },
  });

  onDelete(reservationId: number): void {
    this.deletingId.set(reservationId);
    firstValueFrom(this.listingService.delete(reservationId))
      .then(() => this.propertiesResource.reload())
      .finally(() => this.deletingId.set(null));
  }
}

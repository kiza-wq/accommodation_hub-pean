import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, map } from 'rxjs';
import { HeadingComponent } from '../../shared/heading/heading.component';
import { ListingCardComponent } from '../../components/listing-card/listing-card.component';

@Component({
  selector: 'app-home',
  imports: [HeadingComponent, ListingCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private listingService = inject(ListingService);

  filters = toSignal(
    this.route.queryParams.pipe(
      map((params) =>
        params['category']
          ? {
              category: params['category'],
            }
          : {},
      ),
    ),
  );

  listingResource = resource({
    params: () => this.filters(),
    loader: async ({ params }) => {
      return firstValueFrom(this.listingService.getAll(params));
    },
  });

  removeFilters(): void {
    this.router.navigate([]);
  }
}

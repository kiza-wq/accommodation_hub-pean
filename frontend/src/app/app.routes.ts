import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { TripsComponent } from './pages/trips/trips.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { authGuard } from './auth-guards';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservations', component: ReservationsComponent, canActivate: [authGuard] },
  { path: 'properties', component: PropertiesComponent,canActivate: [authGuard] },
  { path: 'trips', component: TripsComponent,canActivate: [authGuard] },
  { path: 'listings/:id', component: ListingsComponent },
];

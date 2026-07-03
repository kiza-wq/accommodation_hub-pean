import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_PREFIX } from './tokens';
import { Observable } from 'rxjs';
import {
  CreateReservationPayload,
  Reservation,
  ReservationWithListing,
} from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http = inject(HttpClient);
  private apiPrefix = inject(API_PREFIX);

  create(payload: CreateReservationPayload): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiPrefix}/api/reservations`, payload);
  }

  getListingReservations(listingId: string | null): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiPrefix}/api/reservations/listing/${listingId}`);
  }

  getUserReservations(userId: string | null): Observable<ReservationWithListing[]> {
    return this.http.get<ReservationWithListing[]>(
      `${this.apiPrefix}/api/reservations/user/${userId}`,
    );
  }

  delete(reservationId: string): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(
      `${this.apiPrefix}/api/reservations/${reservationId}`,
    );
  }
}

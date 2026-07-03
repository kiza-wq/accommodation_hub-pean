import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_PREFIX } from './tokens';
import { Observable } from 'rxjs';
import {
  CreateListPayload,
  Listing,
  ListingFilters,
  ListingWithUser,
} from '../models/listing.model';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private http = inject(HttpClient);
  private apiPrefix = inject(API_PREFIX);

  create(payload: CreateListPayload): Observable<Listing> {
    return this.http.post<Listing>(`${this.apiPrefix}/api/listings`, payload);
  }

  getAll(filters: Partial<ListingFilters>): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiPrefix}/api/listings`, { params: { ...filters } });
  }

  getListingById(listingId: string): Observable<ListingWithUser> {
    return this.http.get<ListingWithUser>(`${this.apiPrefix}/api/listings/${listingId}`);
  }
  getUserListings(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiPrefix}/api/listings/user/${userId}`);
  }

  delete(listingId: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiPrefix}/api/listings/${listingId}`);
  }
}

import { Listing } from './listing.model';
import { AuthUser } from './user.model';

export interface CreateReservationPayload {
  listingId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

export interface Reservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
}

export interface ReservationFliters {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export interface ReservationWithListing extends Reservation {
  listing: Listing;
}

import { CountryOption } from '../services/country.service';
import { AuthUser } from './user.model';

export interface CreateListPayload {
  category: string | null;
  location: CountryOption | null;
  guestCount: number | null;
  roomCount: number | null;
  bathRoomCount: number | null;
  price: number | null;
  title: string | null;
  description: string | null;
}

export interface ListingUser {
  id: number;
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface Listing {
  id: number;
  createdAt: Date | Date;
  userId: number;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathRoomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
}

export interface ListingWithUser extends Listing {
  user: AuthUser;
}

export interface ListingFilters {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathRoomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

import { BookableStatus } from './BookableStatus';

export class Booking {
  bookingId?: string;
  userId?: string;
  bookableId?: string;
  subject?: string;
  description?: string;
  startBookingTime?: Date;
  endBookingTime?: Date;
  status?: BookableStatus;
}

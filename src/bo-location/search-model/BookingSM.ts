import { SearchModel } from 'onecore';
import { BookingStatus } from '../model/BookingStatus';

export interface BookingSM extends SearchModel {
  userId: string;
  bookableId: string;
  subject: string;
  description: string;
  startBookingTime: Date;
  endBookingTime: Date;
  status: BookingStatus;
}

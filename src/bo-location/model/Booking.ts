import {BookingStatus} from './BookingStatus';

export class Booking {
    bookingId: string;
    userId: string;
    bookableId: string;
    subject: string;
    description: string;
    startBookingTime: Date;
    endBookingTime: Date;
    status: BookingStatus;
}

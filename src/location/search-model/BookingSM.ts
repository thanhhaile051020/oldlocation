import {SearchModel} from 'onecore';
import {BookableStatus} from '../model/BookableStatus';

export interface BookingSM extends SearchModel {
    bookingId: string;
    userId: string;
    bookableId: string;
    subject: string;
    description: string;
    startBookingTime: Date;
    endBookingTime: Date;
    status: BookableStatus;
}

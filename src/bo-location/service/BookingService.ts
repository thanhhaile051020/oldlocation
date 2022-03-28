import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Booking} from '../model/Booking';
import {BookingSM} from '../search-model/BookingSM';

export interface BookingService extends GenericSearchService<Booking, string, ResultInfo<Booking>, BookingSM> {
}

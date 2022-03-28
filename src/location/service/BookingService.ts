import {GenericSearchService, ResultInfo} from 'onecore';
import {Booking} from '../model/Booking';
import {BookingSM} from '../search-model/BookingSM';

export interface BookingService extends GenericSearchService<Booking, string, ResultInfo<Booking>, BookingSM> {
  saveDraft(booking: Booking): Promise<ResultInfo<Booking>>;
  submit(booking: Booking): Promise<ResultInfo<Booking>>;
  getFreeLocationByBookableList(obj: object): Promise<any>;
}

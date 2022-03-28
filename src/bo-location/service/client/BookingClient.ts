import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {bookingModel} from '../../metadata/BookingModel';
import {Booking} from '../../model/Booking';
import {BookingSM} from '../../search-model/BookingSM';
import {BookingService} from '../BookingService';

export class BookingClient extends GenericSearchWebClient<Booking, string, ResultInfo<Booking>, BookingSM> implements BookingService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'booking', http, bookingModel);
  }
}

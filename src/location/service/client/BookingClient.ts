import {ResultInfo} from 'onecore';
import {HttpRequest} from 'web-clients';
import {GenericSearchWebClient} from 'web-clients';
import config from '../../../config';
import {bookingModel} from '../../metadata/BookingModel';
import {Booking} from '../../model/Booking';
import {BookingSM} from '../../search-model/BookingSM';
import {BookingService} from '../BookingService';

export class BookingClient extends GenericSearchWebClient<Booking, string, ResultInfo<Booking>, BookingSM> implements BookingService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'booking', http, bookingModel);
    this.saveDraft = this.saveDraft.bind(this);
    this.submit = this.submit.bind(this);
    this.getFreeLocationByBookableList = this.getFreeLocationByBookableList.bind(this);
  }
  async saveDraft(booking: Booking): Promise<ResultInfo<Booking>> {
    const url = this.serviceUrl + '/saveDraft';
    const res = await this.http.post<ResultInfo<Booking>>(url, booking);
    return res;
  }
  async submit(booking: Booking): Promise<ResultInfo<Booking>> {
    const url = this.serviceUrl + '/submit';
    const res = await this.http.post<ResultInfo<Booking>>(url, booking);
    return res;
  }
  async getFreeLocationByBookableList(obj: object): Promise<ResultInfo<Booking>> {
    const url = this.serviceUrl + '/getFreeLocationByBookableList';
    const res = await this.http.post<ResultInfo<Booking>>(url, obj);
    return res;
  }
}

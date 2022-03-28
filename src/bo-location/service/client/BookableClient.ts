import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {bookableModel} from '../../metadata/BookableModel';
import {Bookable} from '../../model/Bookable';
import {BookableSM} from '../../search-model/BookableSM';
import {BookableService} from '../BookableService';

export class BookableClient extends GenericSearchWebClient<Bookable, string, ResultInfo<Bookable>, BookableSM> implements BookableService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'bookable', http, bookableModel);
  }
}

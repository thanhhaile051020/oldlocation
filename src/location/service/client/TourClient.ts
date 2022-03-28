
import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {tourModel} from '../../metadata/TourModel';
import {Tours} from '../../model/Tours';
import {TourSM} from '../../search-model/TourSM';
import {TourService} from '../TourService';

export class TourClient extends GenericSearchWebClient<Tours, string, ResultInfo<Tours>, TourSM> implements TourService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'tour', http, tourModel);
  }
}

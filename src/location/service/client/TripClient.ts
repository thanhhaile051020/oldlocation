import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {tripModel} from '../../metadata/TripModel';
import {Trip} from '../../model/Trip';
import {TripSM} from '../../search-model/TripSM';
import {TripService} from '../TripService';

export class TripClient extends GenericSearchWebClient<Trip, string, ResultInfo<Trip>, TripSM> implements TripService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'trip', http, tripModel);
  }
}

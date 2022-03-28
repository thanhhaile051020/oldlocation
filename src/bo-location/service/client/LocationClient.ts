import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {locationModel} from '../../metadata/LocationModel';
import {Location} from '../../model/Location';
import {LocationSM} from '../../search-model/LocationSM';
import {LocationService} from '../LocationService';

export class LocationClient extends GenericSearchWebClient<Location, string, ResultInfo<Location>, LocationSM> implements LocationService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'location', http, locationModel);
  }
}

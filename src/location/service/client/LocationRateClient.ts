import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {locationRateModel} from '../../metadata/LocationRateModel';
import {LocationRate} from '../../model/LocationRate';
import {LocationRateSM} from '../../search-model/LocationRateSM';
import {LocationRateService} from '../LocationRateService';

export class LocationRateClient extends GenericSearchWebClient<LocationRate, string, ResultInfo<LocationRate>, LocationRateSM> implements LocationRateService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'locationRate', http, locationRateModel);
  }

  getLocationByLocationId(locationId: string): Promise<LocationRate[]> {
    const url = this.serviceUrl + '/getLocationRateByLocationId' + '/' + locationId;
    return this.http.get(url);
  }
}

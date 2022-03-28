import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {LocationRate} from '../model/LocationRate';
import {LocationRateSM} from '../search-model/LocationRateSM';

export interface LocationRateService extends GenericSearchService<LocationRate, string, ResultInfo<LocationRate>, LocationRateSM> {
  getLocationByLocationId(locationId: string): Promise<LocationRate[]>;
}

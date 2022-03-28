import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Location} from '../model/Location';
import {LocationRate} from '../model/LocationRate';
import {LocationSM} from '../search-model/LocationSM';

export interface LocationService extends GenericSearchService<Location, string, ResultInfo<Location>, LocationSM> {
  getLocationByType(type: string): Promise<Location[]>;
  rateLocation(obj: LocationRate): Promise<any>;
}

import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Location} from '../model/Location';
import {LocationSM} from '../search-model/LocationSM';

export interface LocationService extends GenericSearchService<Location, string, ResultInfo<Location>, LocationSM> {

}

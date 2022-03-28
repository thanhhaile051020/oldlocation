import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Tours} from '../model/Tours';
import {TourSM} from '../search-model/TourSM';

export interface TourService extends GenericSearchService<Tours, string, ResultInfo<Tours>, TourSM> {
}

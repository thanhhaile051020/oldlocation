import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Trip} from '../model/Trip';
import {TripSM} from '../search-model/TripSM';

export interface TripService extends GenericSearchService<Trip, string, ResultInfo<Trip>, TripSM> {
}

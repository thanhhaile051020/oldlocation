import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Bookable} from '../model/Bookable';
import {BookableSM} from '../search-model/BookableSM';

export interface BookableService extends GenericSearchService<Bookable, string, ResultInfo<Bookable>, BookableSM> {

}

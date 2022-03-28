import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Event} from '../model/Event';
import {EventSM} from '../search-model/EventSM';

export interface EventService extends GenericSearchService<Event, string, ResultInfo<Event>, EventSM> {

}

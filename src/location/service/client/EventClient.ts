import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {eventModel} from '../../metadata/EventModel';
import {Event} from '../../model/Event';
import {EventSM} from '../../search-model/EventSM';
import {EventService} from '../EventService';

export class EventClient extends GenericSearchWebClient<Event, string, ResultInfo<Event>, EventSM> implements EventService {
  constructor(http: HttpRequest) {
    super(config.backTripalUrl + 'event', http, eventModel);
  }
}

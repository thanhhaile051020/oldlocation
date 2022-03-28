import {SearchService} from 'onecore';
import {WebServiceTransLog} from '../model/WebServiceTransLog';
import {WebServiceTransLogSM} from '../search-model/WebServiceTransLogSM';

export interface WebServiceTransLogService extends SearchService<WebServiceTransLog, WebServiceTransLogSM> {

}

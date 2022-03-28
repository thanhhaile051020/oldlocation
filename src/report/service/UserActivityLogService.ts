import {SearchService} from 'onecore';
import {UserActivityLog} from '../model/UserActivityLog';
import {UserActivityLogSM} from '../search-model/UserActivityLogSM';

export interface UserActivityLogService extends SearchService<UserActivityLog, UserActivityLogSM> {

}

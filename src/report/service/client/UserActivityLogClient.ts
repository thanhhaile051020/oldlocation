import {SearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {userActivityLog} from '../../metadata/UserActivityLog';
import {UserActivityLog} from '../../model/UserActivityLog';
import {UserActivityLogSM} from '../../search-model/UserActivityLogSM';
import {UserActivityLogService} from '../UserActivityLogService';

export class UserActivityLogServiceImpl extends SearchWebClient<UserActivityLog, UserActivityLogSM> implements UserActivityLogService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'userActivityLog', http, userActivityLog);
  }
  protected postOnly(s: UserActivityLogSM): boolean {
    return true;
  }
}

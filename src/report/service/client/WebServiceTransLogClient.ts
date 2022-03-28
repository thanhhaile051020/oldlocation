import {SearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {webServiceTransLogModel} from '../../metadata/WebServiceTransLogModel';
import {WebServiceTransLog} from '../../model/WebServiceTransLog';
import {WebServiceTransLogSM} from '../../search-model/WebServiceTransLogSM';
import {WebServiceTransLogService} from '../WebServiceTransLogService';

export class WebServiceTransLogServiceImpl extends SearchWebClient<WebServiceTransLog, WebServiceTransLogSM> implements WebServiceTransLogService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'webServicesTransLog', http, webServiceTransLogModel);
  }
  protected postOnly(s: WebServiceTransLogSM): boolean {
    return true;
  }
}

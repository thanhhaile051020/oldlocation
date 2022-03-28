import {ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {externalSysModel} from '../../metadata/ExternalSysModel';
import {ExternalSys} from '../../model/ExternalSys';
import {ExternalSysSM} from '../../search-model/ExternalSysSM';
import {ApprExternalSysService} from '../ApprExternalSysService';

export class ApprExternalSysServiceImpl extends ViewSearchWebClient<ExternalSys, string, ExternalSysSM> implements ApprExternalSysService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/externalSystem', http, externalSysModel);
  }
}

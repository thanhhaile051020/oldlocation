import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {externalSysModel} from '../../metadata/ExternalSysModel';
import {ExternalSys} from '../../model/ExternalSys';
import {ExternalSysSM} from '../../search-model/ExternalSysSM';
import {ExternalSysService} from '../ExternalSysService';

export class ExternalSysServiceImpl extends GenericSearchDiffApprWebClient<ExternalSys, string, ResultInfo<ExternalSys>, ExternalSysSM> implements ExternalSysService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'externalSys', http, externalSysModel);
  }

  update(obj: ExternalSys, ctx?: any): Promise<ResultInfo<ExternalSys>> {
    return this.genericWebClient.update(obj, ctx);
  }

  patch(obj: ExternalSys, ctx?: any): Promise<ResultInfo<ExternalSys>> {
    debugger;
    return this.genericWebClient.patch(obj, ctx);
  }
}

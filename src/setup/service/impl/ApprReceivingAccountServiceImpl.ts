import {ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payerModel} from '../../metadata/PayerModel';
import {EntityAccount} from '../../model/EntityAccount';
import {AccSearchModel} from '../../search-model/AccSearchModel';
import {ApprReceivingAccountService} from '../ApprReceivingAccountService';

export class ApprReceivingAccountServiceImpl extends ViewSearchWebClient<EntityAccount, any, AccSearchModel> implements ApprReceivingAccountService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/receivingAccount/', http, payerModel);
  }

  getByPayeeId(payeeId: string): Promise<EntityAccount> {
    const url = this.serviceUrl + 'payee/' + payeeId;
    return this.http.get(url);
  }
}

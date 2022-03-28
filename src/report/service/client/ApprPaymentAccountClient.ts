import {ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payerModel} from '../../metadata/PayerModel';
import {EntityAccount} from '../../model/EntityAccount';
import {AccSearchModel} from '../../search-model/AccSearchModel';
import {ApprPaymentAccountService} from '../ApprPaymentAccountService';

export class ApprPaymentAccountClient extends ViewSearchWebClient<EntityAccount, any, AccSearchModel> implements ApprPaymentAccountService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/paymentAccount/', http, payerModel);
  }

  getByPayerId(payerId: string): Promise<EntityAccount> {
    const url = this.serviceUrl + 'payer/' + payerId;
    return this.http.get(url);
  }
}

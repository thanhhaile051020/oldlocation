import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient, json} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {paymentAccountModel} from '../../metadata/PaymentAccountModel';
import {PaymentAccount} from '../../model/PaymentAccount';
import {PaymentAccountSM} from '../../search-model/PaymentAccountSM';
import {PaymentAccountService} from '../PaymentAccountService';

export class PaymentAccountServiceImpl extends GenericSearchDiffApprWebClient<PaymentAccount, any, ResultInfo<PaymentAccount>, PaymentAccountSM> implements PaymentAccountService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'oddAccounts', http, paymentAccountModel, null, true);
  }

  async getAccountByPayerId(id): Promise<PaymentAccount> {
    const url = this.serviceUrl + '/getAccountNoByPayerId/' + id;
    const res = await this.http.post<PaymentAccount>(url, {});
    return json(res, this._metamodel);
  }
}

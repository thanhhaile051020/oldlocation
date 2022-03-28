import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {PaymentAccount} from '../model/PaymentAccount';
import {PaymentAccountSM} from '../search-model/PaymentAccountSM';

export interface PaymentAccountService extends GenericSearchDiffApprService<PaymentAccount, any, ResultInfo<PaymentAccount>, PaymentAccountSM> {
  getAccountByPayerId(id): Promise<PaymentAccount>;
}

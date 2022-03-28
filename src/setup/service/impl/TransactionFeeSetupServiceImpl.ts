import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {transactionFeeSetupModel} from '../../metadata/TransactionFeeSetupModel';
import {TransactionFeeSetup} from '../../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../../search-model/TransactionFeeSetupSM';
import {TransactionFeeSetupService} from '../TransactionFeeSetupService';

export class TransactionFeeSetupServiceImpl extends GenericSearchDiffApprWebClient<TransactionFeeSetup, number, ResultInfo<TransactionFeeSetup>, TransactionFeeSetupSM> implements TransactionFeeSetupService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'transactionFeeSetup', http, transactionFeeSetupModel);
  }

  addTransactionFeeSetup(model: TransactionFeeSetup): Promise<TransactionFeeSetup> {
    const url = config.backOfficeUrl + 'transactionFeeSetup';
    return this.http.post<TransactionFeeSetup>(url, model);
  }

  updateTransactionFeeSetup(model: TransactionFeeSetup): Promise<TransactionFeeSetup> {
    const url = config.backOfficeUrl + 'transactionFeeSetup' + '/' + model.transFeeId;
    return this.http.put<TransactionFeeSetup>(url, model);
  }
}

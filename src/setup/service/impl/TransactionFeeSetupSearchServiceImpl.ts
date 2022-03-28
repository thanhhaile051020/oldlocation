import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {transactionFeeSetupModel} from '../../metadata/TransactionFeeSetupModel';
import {TransactionFeeSetup} from '../../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../../search-model/TransactionFeeSetupSM';

export class TransactionFeeSetupSearchServiceImpl extends GenericSearchDiffApprWebClient<TransactionFeeSetup, number, ResultInfo<TransactionFeeSetup>, TransactionFeeSetupSM> {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'transactionFeeSetup', http, transactionFeeSetupModel);
  }
}

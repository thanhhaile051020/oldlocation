import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {TransactionFeeSetup} from '../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../search-model/TransactionFeeSetupSM';

export interface TransactionFeeSetupService extends GenericSearchDiffApprService<TransactionFeeSetup, number, ResultInfo<TransactionFeeSetup>, TransactionFeeSetupSM> {
  addTransactionFeeSetup(model: TransactionFeeSetup): Promise<TransactionFeeSetup>;
  updateTransactionFeeSetup(mode: TransactionFeeSetup): Promise<TransactionFeeSetup>;
}

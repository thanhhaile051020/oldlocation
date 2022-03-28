import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {TransactionFeeSetup} from '../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../search-model/TransactionFeeSetupSM';

export interface TransactionFeeSetupSearchService extends GenericSearchService<TransactionFeeSetup, number, ResultInfo<TransactionFeeSetup>, TransactionFeeSetupSM> {
}

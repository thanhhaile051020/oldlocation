import {SearchService} from 'onecore';
import {TransactionLog} from '../model/TransactionLog';
import {TransactionLogSM} from '../search-model/TransactionLogSM';

export interface TransactionlogService extends SearchService<TransactionLog, TransactionLogSM> {

}

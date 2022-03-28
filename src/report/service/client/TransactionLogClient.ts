import {SearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {transactionLogModel} from '../../metadata/TransactionLogModel';
import {TransactionLog} from '../../model/TransactionLog';
import {TransactionLogSM} from '../../search-model/TransactionLogSM';
import {TransactionlogService} from '../TransactionLogService';

export class TransactionLogServiceImpl extends SearchWebClient<TransactionLog, TransactionLogSM> implements TransactionlogService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'transactionLog', http, transactionLogModel);
  }
  protected postOnly(s: TransactionLogSM): boolean {
    return true;
  }
}

import {ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {bankModel} from '../../metadata/BankModel';
import {Bank} from '../../model/Bank';
import {BankSM} from '../../search-model/BankSM';
import {ApprBankService} from '../ApprBankService';

export class ApprBankServiceImpl extends ViewSearchWebClient<Bank, string, BankSM> implements ApprBankService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/bank', http, bankModel);
  }
}

import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {bankModel} from '../../metadata/BankModel';
import {Bank} from '../../model/Bank';
import {BankSM} from '../../search-model/BankSM';
import {BankService} from '../BankService';

export class BankServiceImpl extends GenericSearchDiffApprWebClient<Bank, string, ResultInfo<Bank>, BankSM> implements BankService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'banks', http, bankModel);
  }
}

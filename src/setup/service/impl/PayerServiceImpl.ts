import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payerModel} from '../../metadata/PayerModel';
import {Payer} from '../../model/Payer';
import {PayerSM} from '../../search-model/PayerSM';
import {PayerService} from '../PayerService';

export class PayerServiceImpl extends GenericSearchDiffApprWebClient<Payer, any, ResultInfo<Payer>, PayerSM> implements PayerService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'profilePayerCompany', http, payerModel, null, true);
  }
}

import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payeeModel} from '../../metadata/PayeeModel';
import {Payee} from '../../model/Payee';
import {PayeeSM} from '../../search-model/PayeeSM';
import {PayeeService} from '../PayeeService';

export class PayeeServiceImpl extends GenericSearchDiffApprWebClient<Payee, any, number|ResultInfo<Payee>, PayeeSM> implements PayeeService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'profilePayeeCompany', http, payeeModel, null, true);
  }
}

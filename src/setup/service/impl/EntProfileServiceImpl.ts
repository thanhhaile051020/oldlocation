import {ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payeeModel} from '../../metadata/PayeeModel';
import {Payee} from '../../model/Payee';
import {PayeeSM} from '../../search-model/PayeeSM';
import {EntProfileService} from '../EntProfileService';

export class EntProfileServiceImpl extends ViewSearchWebClient<Payee, any, PayeeSM> implements EntProfileService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/entProfile', http, payeeModel);
  }
}

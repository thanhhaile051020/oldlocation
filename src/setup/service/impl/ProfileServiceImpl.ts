import {ResultInfo} from 'onecore';
import {GenericWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payeeModel} from '../../metadata/PayeeModel';
import {Payee} from '../../model/Payee';
import {ProfileService} from '../ProfileService';

export class ProfileServiceImpl extends GenericWebClient<Payee, any, ResultInfo<Payee>> implements ProfileService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'profilePayeeCompany', http, payeeModel);
  }
}

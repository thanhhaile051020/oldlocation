import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {entityAccountModel} from '../../metadata/EntityAccountModel';
import {EntityAccount} from '../../model/EntityAccount';
import {AccSearchModel} from '../../search-model/AccSearchModel';
import {ReceivingAccountService} from '../ReceivingAccountService';

export class ReceivingAccountServiceImpl extends GenericSearchDiffApprWebClient<EntityAccount, any, ResultInfo<EntityAccount>, AccSearchModel> implements ReceivingAccountService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'receivingAccounts', http, entityAccountModel, null, true);
  }
}

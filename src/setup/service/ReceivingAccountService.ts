import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {EntityAccount} from '../model/EntityAccount';
import {AccSearchModel} from '../search-model/AccSearchModel';

export interface ReceivingAccountService extends GenericSearchDiffApprService<EntityAccount, any, ResultInfo<EntityAccount>, AccSearchModel> {

}

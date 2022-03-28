import {ViewSearchService} from 'onecore';
import {EntityAccount} from '../model/EntityAccount';
import {AccSearchModel} from '../search-model/AccSearchModel';

export interface ApprReceivingAccountService extends ViewSearchService<EntityAccount, any, AccSearchModel> {
  getByPayeeId(payeeId: string): Promise<EntityAccount>;
}

import {ViewSearchService} from 'onecore';
import {EntityAccount} from '../model/EntityAccount';
import {AccSearchModel} from '../search-model/AccSearchModel';

export interface ApprPaymentAccountService extends ViewSearchService<EntityAccount, any, AccSearchModel> {
  getByPayerId(payerId: string): Promise<EntityAccount>;
}

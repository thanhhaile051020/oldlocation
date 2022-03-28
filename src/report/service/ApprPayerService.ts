import {DataLoader, ViewSearchService} from 'onecore';
import {Payer} from '../model/Payer';
import {PayerSM} from '../search-model/PayerSM';

export interface ApprPayerService extends ViewSearchService<Payer, any, PayerSM>, DataLoader<Payer> {

}

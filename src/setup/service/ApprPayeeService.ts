import {DataLoader, ViewSearchService} from 'onecore';
import {Payee} from '../model/Payee';
import {PayeeSM} from '../search-model/PayeeSM';

export interface ApprPayeeService extends ViewSearchService<Payee, any, PayeeSM>, DataLoader<Payee> {

}

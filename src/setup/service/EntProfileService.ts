import {ViewSearchService} from 'onecore';
import {Payee} from '../model/Payee';
import {PayeeSM} from '../search-model/PayeeSM';

export interface EntProfileService extends ViewSearchService<Payee, any, PayeeSM> {

}

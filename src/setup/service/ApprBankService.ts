import {ViewSearchService} from 'onecore';
import {Bank} from '../model/Bank';
import {BankSM} from '../search-model/BankSM';

export interface ApprBankService extends ViewSearchService<Bank, string, BankSM> {

}

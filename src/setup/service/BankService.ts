import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {Bank} from '../model/Bank';
import {BankSM} from '../search-model/BankSM';

export interface BankService extends GenericSearchDiffApprService<Bank, string, ResultInfo<Bank>, BankSM> {

}

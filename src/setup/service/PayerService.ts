import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {Payer} from '../model/Payer';
import {PayerSM} from '../search-model/PayerSM';

export interface PayerService extends GenericSearchDiffApprService<Payer, any, ResultInfo<Payer>, PayerSM> {

}

import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {Payee} from '../model/Payee';
import {PayeeSM} from '../search-model/PayeeSM';

export interface PayeeService extends GenericSearchDiffApprService<Payee, any, number|ResultInfo<Payee>, PayeeSM> {

}

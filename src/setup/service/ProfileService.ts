import {GenericService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Payee} from '../model/Payee';

export interface ProfileService extends GenericService<Payee, any, ResultInfo<Payee>> {

}

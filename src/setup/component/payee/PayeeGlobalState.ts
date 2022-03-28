import {DiffModel} from 'onecore';
import {Payee} from '../../model/Payee';
import {PAYEE_DIFF_FORM, PAYEE_FORM, PAYEES_FORM} from './Constants';

export interface PayeeGlobalState {
  [PAYEE_FORM]?: Payee;
  [PAYEES_FORM]?: Payee[];
  [PAYEE_DIFF_FORM]?: DiffModel<Payee, any>;
}

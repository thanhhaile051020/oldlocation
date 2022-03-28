import {SearchModel} from 'onecore';

export interface BankSM extends SearchModel {
  bankName: string;
  bankShortName: string;
}

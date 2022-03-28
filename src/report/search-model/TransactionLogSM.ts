import {DateRange, SearchModel} from 'onecore';

export interface TransactionLogSM extends SearchModel {
  exShortName: string;
  payerShortName: string;
  payeeShortName: string;

  firstAmount: number;
  secondAmount: number;
  operatorAmount: string;

  actionDate: DateRange;
}

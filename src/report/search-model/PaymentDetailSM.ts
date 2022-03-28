import {DateRange, SearchModel} from 'onecore';
import {FeePostingType} from '../model/FeePostingType';
import {PaymentStatus} from '../model/PaymentStatus';

export interface PaymentDetailSM extends SearchModel {
  payersList: string[];
  payeesList: string[];
  payeeId: string;
  payerId: string;
  externalSystemId: string;
  transactionId: string;
  paymentDate: DateRange;
  paymentStatus: PaymentStatus;
  postingType: FeePostingType;
  amount: number;
}

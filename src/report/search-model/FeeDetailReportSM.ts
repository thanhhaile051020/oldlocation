import {SearchModel} from 'onecore';

export interface FeeDetailReportSM extends SearchModel {
  payersList: string[];
  transactionDate: Date;
  feeDueDate: Date;
  feeStatus: string;
  feeDebitBankAccount: string;
}

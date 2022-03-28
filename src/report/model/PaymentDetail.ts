import {FeeChargeType} from './FeeChargeType';
import {FeePostingType} from './FeePostingType';
import {PaymentStatus} from './PaymentStatus';

export class PaymentDetail {
  paymentId: string;
  paymentDate: Date;
  transFeeId: number;
  payeeId: string;
  payerId: string;
  debitBankAccount: string;
  creditBankAccount: string;
  feeDebitBankAccount: string;
  amount: number;
  feeAmount: number;
  externalSystemId: string;
  status: PaymentStatus;
  postingType: FeePostingType;
  updatedDate: Date;
  feeDueDate: Date;
  chargeType: FeeChargeType;
  currencyCode: string;

  payeeName: string;
  payerName: string;
  externalSystemName: string;

  transactionId: string;
  transactionDate: Date;
}

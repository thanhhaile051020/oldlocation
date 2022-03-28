import {FeeChargeType} from './FeeChargeType';
import {FeePostingType} from './FeePostingType';
import {PaymentStatus} from './PaymentStatus';

export class FeeDetailReport {
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
  paymentStatus: PaymentStatus;
  postingType: FeePostingType;
  updatedDate: Date;
  feeDueDate: Date;
  chargeType: FeeChargeType;
  currencyCode: string;

  payerName: string;
  externalSystemName: string;

  internalReference: string;
  feeTransactionNo: string;
}

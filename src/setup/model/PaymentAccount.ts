import {Bank} from './Bank';
import {Payee} from './Payee';

export class PaymentAccount {
  bankId: string;
  entityId: string;
  accountNo: string;
  accountCurrency: string;
  accountName: string;
  accStatus: string;
  defaultAccount: boolean;
  nightMode: string;
  bank: Bank;
  profile: Payee;
}

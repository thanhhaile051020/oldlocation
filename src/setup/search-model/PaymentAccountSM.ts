import {AccSearchModel} from './AccSearchModel';

export interface PaymentAccountSM extends AccSearchModel {
  bankId: string;
  entityId: string;
  accountNo: string;
  accStatus: string;
}

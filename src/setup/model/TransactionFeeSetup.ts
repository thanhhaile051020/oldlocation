import {ControlModel} from './ControlModel';
import {TransactionFeeSetupDetail} from './TransactionFeeSetupDetail';
import {TransactionFeeSetupRule} from './TransactionFeeSetupRule';

export class TransactionFeeSetup extends ControlModel {
  transFeeId: number;
  esId: string;
  payeeId: string;
  entId: string;
  chargeTo: string;
  chargeType: string;
  chargePerc: number;
  feeReceipt: string;
  zoneType: string;
  userType: string;
  transactionFeeSetupDetail: TransactionFeeSetupDetail;
  transactionFeeSetupRules: TransactionFeeSetupRule[];
}

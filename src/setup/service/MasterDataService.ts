import {ValueText} from 'onecore';

export interface MasterDataService {
  getStatus(): Promise<ValueText[]>;
  getCtrlStatus(): Promise<ValueText[]>;
  getDefaultAcounts(): Promise<ValueText[]>;
  getTransactionFeeRules(): Promise<ValueText[]>;
  getPaymentStatus(): Promise<ValueText[]>;
  getPostingType(): Promise<ValueText[]>;
}

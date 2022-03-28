import {ValueText} from 'onecore';

export interface MasterDataService {
  getUserActivityLogs(): Promise<ValueText[]>;
  getWebServiceTypes(): Promise<ValueText[]>;
  getPaymentAmount(): Promise<ValueText[]>;
  getFeeStatus(): Promise<ValueText[]>;
  getDefaultAcounts(): Promise<ValueText[]>;
  getPaymentStatus(): Promise<ValueText[]>;
  getPostingType(): Promise<ValueText[]>;
}

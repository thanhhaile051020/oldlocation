import {SearchModel} from 'onecore';

export interface BalanceInquirySM extends SearchModel {
  entityId: string;
  accountNo: string;
}

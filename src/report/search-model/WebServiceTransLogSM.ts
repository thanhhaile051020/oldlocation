import {DateRange, SearchModel} from 'onecore';

export interface WebServiceTransLogSM extends SearchModel {
  exSystemRefNo: string;
  transactionNo: string;
  webServicesType: string;
  receiveDate: DateRange;
}

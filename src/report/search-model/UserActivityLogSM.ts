import {DateRange, SearchModel} from 'onecore';

export interface UserActivityLogSM extends SearchModel {
  consumer: string;
  entityName: string;
  entityType: string;
  userId: string;
  actionDate: DateRange;
  actionStatus: string;
}

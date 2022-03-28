import { SearchModel } from 'onecore';

export interface EventSM extends SearchModel {
  eventId: string;
  eventName: string;
  startTime: Date;
  endTime: Date;
  locationId: string;
  lat: number;
  long: number;
}

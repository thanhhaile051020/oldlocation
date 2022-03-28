import {SearchModel} from 'onecore';

export interface LocationSM extends SearchModel {
  locationId: string;
  locationName: string;
  description: string;
  longitude: number;
  latitude: number;
}

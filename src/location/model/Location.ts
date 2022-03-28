import {LocationInfo} from './LocationInfo';

export class Location {
  locationId: string;
  locationName: string;
  description: string;
  longitude: number;
  latitude: number;
  type: string;
  info: LocationInfo;
}

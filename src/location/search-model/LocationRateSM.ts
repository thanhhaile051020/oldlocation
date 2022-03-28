import {SearchModel} from 'onecore';

export class LocationRateSM implements SearchModel {
  page?: number;
  limit: number;
  firstLimit?: number;
  fields?: string[];
  sort?: string;
  currentUserId?: string;

  keyword?: string;
  excluding?: Map<string, any>;
  refId?: string|number;

  rateId?: string;
  locationId?: string;
  userId?: string;
  rate?: number;
  rateTime?: Date;
  review?: string;
}

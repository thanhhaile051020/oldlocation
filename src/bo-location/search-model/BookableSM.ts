import { SearchModel } from 'onecore';
import { BookableType } from '../model/BookableType';

export interface BookableSM extends SearchModel {
  bookableId: string;
  locationId: string;
  bookableType: BookableType;
  bookableName: string;
  bookableDescription: string;
  bookableCapacity: number;
  image: string;
}

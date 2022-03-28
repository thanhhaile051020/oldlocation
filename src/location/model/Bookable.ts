import { BookableType } from './BookableType';

export class Bookable {
  bookableId?: string;
  locationId?: string;
  bookableType?: BookableType;
  bookableName?: string;
  bookableDescription?: string;
  bookableCapacity?: number;
  image?: string;
}

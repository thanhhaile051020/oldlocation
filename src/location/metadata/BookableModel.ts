import { Model, Type } from 'onecore';

export const bookableModel: Model = {
  name: 'bookable',
  source: 'bookable',
  attributes: {
    bookableId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    locationId: {
      type: Type.ObjectId
    },
    bookableType: {
      type: Type.String
    },
    bookableName: {
      type: Type.String
    },
    bookableDescription: {
      type: Type.String
    },
    bookableCapacity: {
      type: Type.Number
    },
    image: {
      type: Type.String
    }
  }
};

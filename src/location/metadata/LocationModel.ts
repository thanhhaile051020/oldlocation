import { Model, Type } from 'onecore';

export const locationModel: Model = {
  name: 'location',
  attributes: {
    locationId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    locationName: {
      type: Type.String
    },
    description: {
      type: Type.String
    },
    longitude: {
      type: Type.Number
    },
    latitude: {
      type: Type.Number
    }
  }
};

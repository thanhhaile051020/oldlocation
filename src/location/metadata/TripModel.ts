import { Model, Type } from 'onecore';

export const tripModel: Model = {
  name: 'trip',
  source: 'trips',
  attributes: {
    tripId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    startTime: {
      type: Type.Date
    },
    endTime: {
      type: Type.Date
    },
    locations: {
      type: Type.Array
    }
  }
};

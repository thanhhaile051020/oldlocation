import { Model, Type } from 'onecore';

export const eventModel: Model = {
  name: 'event',
  source: 'event',
  attributes: {
    eventId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    eventName: {
      type: Type.String
    },
    startTime: {
      type: Type.Date
    },
    endTime: {
      type: Type.Date
    },
    locationId: {
      type: Type.String
    },
    lat: {
      type: Type.Number
    },
    long: {
      type: Type.Number
    }
  }
};

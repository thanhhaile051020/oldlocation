import { Model, Type } from 'onecore';

export const tourModel: Model = {
  name: 'tour',
  source: 'tours',
  attributes: {
    tourId: {
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


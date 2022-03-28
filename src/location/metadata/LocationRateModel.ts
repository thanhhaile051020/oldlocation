import { Model, Type } from 'onecore';

export const locationRateModel: Model = {
  name: 'locationRate',
  source: 'locationRate',
  attributes: {
    rateId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    locationId: {
      type: Type.ObjectId
    },
    userId: {
      type: Type.String
    },
    rate: {
      type: Type.Number
    },
    rateTime: {
      type: Type.Date
    },
    review: {
      type: Type.String
    }
  }
};

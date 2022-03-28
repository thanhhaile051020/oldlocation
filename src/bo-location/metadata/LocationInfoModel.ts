import {Model, Type} from 'onecore';

export const locationInfoModel: Model = {
  name: 'locationInfo',
  source: 'locationInfo',
  attributes: {
    locationInfoId: {
      type: Type.ObjectId,
      field: '_id',
      key: true
    },
    viewCount: {
      type: Type.Number
    },
    rate: {
      type: Type.Number
    },
    rate1: {
      type: Type.Number
    },
    rate2: {
      type: Type.Number
    },
    rate3: {
      type: Type.Number
    },
    rate4: {
      type: Type.Number
    },
    rate5: {
      type: Type.Number
    }

  }
};

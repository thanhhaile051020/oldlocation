import {Model, Type} from 'onecore';
import {locationInfoModel} from './LocationInfoModel';

export const locationModel: Model = {
  name: 'location',
  source: 'location',
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
    ,
    type: {
      type: Type.String
    }
    ,
    imageName: {
      type: Type.String
    },
    info: {
      type: Type.Object,
      typeof: locationInfoModel
    }
  }
};

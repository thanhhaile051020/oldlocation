import {Model, Type} from 'onecore';

export const DriveModel: Model = {
  name: 'drive',
  source: 'drive',
  attributes: {
    id: {
      type: Type.String,
      key: true
    },
    name: {
      type: Type.String
    },
    owners: {
      type: Type.String
    },
    modifiedTime: {
      type: Type.String
    },
    size: {
      type: Type.Number
    },
    parents: {
      type: Type.Array
    },
  }
};

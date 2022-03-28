import {Model, Type} from 'onecore';
import {streamModel} from './StreamModel';

export const albumModel: Model = {
  name: 'album',
  source: 'album',
  attributes: {
    albumId: {
      type: Type.ObjectId,
      key: true
    },
    createDate: {
      type: Type.Date
    },
    createBy: {
      type: Type.String
    },
    stream: {
      type: Type.Array,
      typeof: streamModel
    }
  }
};

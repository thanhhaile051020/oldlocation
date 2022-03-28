import {Model, Type} from 'onecore';

export const streamModel: Model = {
  name: 'stream',
  attributes: {
    streamId: {
      type: Type.ObjectId,
      key: true
    },
    url: {
      type: Type.String,
      length: 255
    },
    publicId: {
      type: Type.String,
      length: 255
    }
  }
};


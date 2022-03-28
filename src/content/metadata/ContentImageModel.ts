import {Model, Type} from 'onecore';

export const contentImageModel: Model = {
  name: 'contentImage',
  source: 'image',
  attributes: {
    id: {
      type: Type.String,
      key: true
    },
    // createDate: {
    //   type: Type.DateTime
    // },
    // updateDate: {
    //   type: Type.DateTime
    // },
    sequence: {
      type: Type.Number
    },
    imageName: {
      type: Type.String
    },
    /*tags: {
      type: Type.Array,
      typeOf: Type.String
    },
    thumbnail: {
      type: Type.Array,
      typeOf: buffer
    }*/
  }
};

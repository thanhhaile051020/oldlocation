import {Model, Type} from 'onecore';

export const contentCategoryModel: Model = {
  name: 'contentCategory',
  source: 'contentcategory',
  attributes: {
    contentcategoryId: {
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
    descriptionTH: {
      type: Type.String
    },
    descriptionEN: {
      type: Type.String
    },
    allowUnfollow: {
      type: Type.Boolean
    }
  }
};

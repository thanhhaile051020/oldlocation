import {Model, Type} from 'onecore';

export const articleModel: Model = {
  name: 'article',
  source: 'article',
  attributes: {
    articleId: {
      type: Type.String,
      key: true
    },
    // createDate: {
    //   type: Type.DateTime
    // },
    // updateDate: {
    //   type: Type.DateTime
    // },
    title: {
      type: Type.String
    },
    description: {
      type: Type.String
    },
    body: {
      type: Type.String
    },
    status: {
      type: Type.String
    }
  }
};

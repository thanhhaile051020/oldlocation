import {Model, Type} from 'onecore';

export const subCommentModel: Model = {
  name: 'comment',
  attributes: {
    commentId: {
      type: Type.String,
      key: true
    },
    content: {
      type: Type.String,
      length: 255
    },
    parentId: {
      type: Type.String,
      length: 255
    },
    parentType: {
      type: Type.String,
      length: 255
    },
    createdBy: {
      type: Type.String,
      length: 255
    },
    created_date: {
      type: Type.Date
    }
  }
};


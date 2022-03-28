import {Model, Type} from 'onecore';
import {subCommentModel} from './SubCommentModel';

export const commentModel: Model = {
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
    // createdBy: {
    //   type: Type.String,
    //   length: 255
    // },
    comments: {
      type: Type.Array,
      length: 255,
      typeof: subCommentModel // TODO
    },
    // created_date: {
    //   type: Type.DateTime
    // }
  }
};


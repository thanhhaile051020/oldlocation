import {Model, Type} from 'onecore';

export const dynamicFormModel: Model = {
  name: 'dynamicForm',
  attributes: {
    formId: {
      type: Type.ObjectId,
      key: true
    },
    formName: {
      type: Type.String,
      length: 255
    },
    flow: {
      type: Type.String
    }
  }
};

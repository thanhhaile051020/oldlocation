import {Model, Type} from 'onecore';

export const bankModel: Model = {
  name: 'bank',
  attributes: {
    bankId: {
      type: Type.String,
      key: true
    }
  }
};

import {Model, Type} from 'onecore';

export const paymentAccountModel: Model = {
  name: 'paymentAccount',
  attributes: {
    bankId: {
      type: Type.String,
      length: 50,
      key: true
    },
    entityId: {
      type: Type.String,
      length: 50,
      key: true
    },
    accNo: {
      type: Type.String,
      length: 50,
      key: true
    },
    accType: {
      type: Type.String,
      key: true
    },
    profile: {
      type: Type.Object,
      length: 25
    },
    bank: {
      type: Type.Object,
    },
    accountCurrency: {
      type: Type.String,
      length: 255
    },
    accountName: {
      type: Type.String,
      length: 255
    },
    defaultAccount: {
      type: Type.Boolean,
      length: 20
    },
    nightMode: {
      type: Type.String,
      length: 1
    }
  }
};

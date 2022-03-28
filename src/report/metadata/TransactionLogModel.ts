import {Model, Type} from 'onecore';

export const transactionLogModel: Model = {
  name: 'transactionLog',
  attributes: {
    id: {
      type: Type.String,
      key: true
    },
    consumer: {
      type: Type.String
    },
    externalSystem: {
      type: Type.String ,
      key: true
    },
    payeeId: {
      type: Type.String ,
      key: true
    },
    payerId: {
      type: Type.String,
      key: true
    },
    paymentDate: {
      type: Type.Date
    },
    paymentAmount: {
      type: Type.String
    },
    externalSystemNumber: {
      type: Type.String,
      length: 500
    },
    lastStatus: {
      type: Type.String,
      length: 10
    },
    userId: {
      type: Type.String,
      length: 10
    }
  }
};

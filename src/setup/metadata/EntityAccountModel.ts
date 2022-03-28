import {Model, Type} from 'onecore';

export const entityAccountModel: Model = {
  name: 'entityAccount',
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
      length: 50,
      key: true
    },
    accName: {
      type: Type.String,
      length: 50
    },
    ccyCode: {
      type: Type.String,
      length: 50
    },
    defaultType: {
      type: Type.Boolean,
      length: 50
    },
    entityType: {
      type: Type.String,
      length: 50
    },
    accStatus: {
      type: Type.String,
      length: 50
    },
    nightMode: {
      type: Type.String,
    }
  }
};

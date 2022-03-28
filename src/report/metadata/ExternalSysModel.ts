import {Model, Type} from 'onecore';

export const externalSysModel: Model = {
  name: 'externalSys',
  attributes: {
    esId: {
      type: Type.String,
      length: 50,
      key: true
    },
    esSysName: {
      type: Type.String,
      length: 240,
      required: true
    },
    esSysShortName: {
      type: Type.String,
      length: 20,
      required: true
    },
    esUrl: {
      type: Type.String,
      length: 256
    },
    signOnApproach: {
      type: Type.String,
      length: 3
    },
    accValidation: {
      type: Type.String,
      length: 1
    },
    actedBy: {
      type: Type.String,
      length: 50
    },
    actionStatus: {
      type: Type.String,
      length: 1
    },
    ctrlStatus: {
      type: Type.String,
      length: 1
    },
    logoutUrl: {
      type: Type.String,
      length: 256
    },
    exRefDup: {
      type: Type.String,
      length: 1
    },
    payDateCtl: {
      type: Type.String,
      length: 1
    },
    allStatus: {
      type: Type.String,
      length: 1
    },
    userId: {
      type: Type.String,
      length: 30
    },
    password: {
      type: Type.String,
      length: 100
    }
  }
};

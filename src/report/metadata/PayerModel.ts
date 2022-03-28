import {Model, Type} from 'onecore';

export const payerModel: Model = {
  name: 'payer',
  attributes: {
    entityId: {
      type: Type.String,
      key: true
    },
    entityType: {
      type: Type.String,
      length: 255
    },
    entityName: {
      type: Type.String ,
      length: 255
    },
    shortName: {
      type: Type.String,
      length: 12
    },
    add1: {
      type: Type.String,
      length: 1
    },
    add2: {
      type: Type.String
    },
    add3: {
      type: Type.String,
      length: 255
    },
    postalCode: {
      type: Type.String,
      length: 20
    },
    stateName: {
      type: Type.String,
      length: 20
    },
    countryCode: {
      type: Type.String,
      length: 20
    },
    contactName: {
      type: Type.String,
      length: 20
    },
    contactNo: {
      type: Type.String,
      length: 20
    },
    faxNo: {
      type: Type.String,
      length: 20
    },
    mobilePhone: {
      type: Type.String,
      length: 20
    },
    emailAdd: {
      type: Type.String,
      length: 20
    },
    authMethod: {
      type: Type.String,
      length: 1
    },
    businessType: {
      type: Type.String,
      length: 4
    },
    ctrlStatus: {
      type: Type.String,
      length: 15
    },
    maxAtmPtrn: {
      type: Type.Integer,
      length: 15
    },
    webConfirmation: {
      type: Type.Integer
    }
  }
};

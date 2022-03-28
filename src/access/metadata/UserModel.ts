import {Model, Type} from 'onecore';

export const userModel: Model = {
  name: 'user',
  attributes: {
    bankAdminId: {
      type: Type.Integer,
      key: true
    },
    userId: {
      type: Type.String,
      length: 20,
      required: true
    },
    staffId: {
      type: Type.String,
      length: 20,
      required: true
    },
    firstName: {
      type: Type.String,
      length: 100,
      required: true
    },
    lastName: {
      type: Type.String,
      length: 100
    },
    title: {
      type: Type.String,
      length: 100
    },
    gender: {
      type: Type.String,
      length: 10
    },
    pos: {
      type: Type.String,
      length: 20
    },
    telephone: {
      type: Type.String,
      length: 100
    },
    email: {
      type: Type.String,
      length: 100
    },
    groupId: {
      type: Type.String,
      length: 20
    },
    roleType: {
      type: Type.String,
      length: 1,
      required: true
    },
    accessDateFrom: {
      type: Type.Date
    },
    accessDateTo: {
      type: Type.Date
    },
    accessTimeFrom: {
      type: Type.String
    },
    accessTimeTo: {
      type: Type.String
    },
    activate: {
      type: Type.String,
      length: 1
    },
    ctrlStatus: {
      type: Type.String,
      length: 1
    },
    actionStatus: {
      type: Type.String,
      length: 1
    },
    actedBy: {
      type: Type.String,
      length: 50
    },
    createdDate: {
      type: Type.String
    }
  }
};

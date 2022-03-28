import {Model, Type} from 'onecore';

export const userActivityLog: Model = {
  name: 'userActivityLog',
  attributes: {
    idActivityUser: {
      type: Type.String,
      key: true
    },
    consumer: {
      type: Type.String ,
      length: 60
    },
    entityName: {
      type: Type.String,
      length: 60
    },
    entityType: {
      type: Type.String ,
      length: 60
    },
    actedBy: {
      type: Type.String ,
      length: 60
    },
    actionDate: {
      type: Type.Date
    },
    actionStatus: {
      type: Type.String,
      length: 50
    },
    userId: {
      type: Type.String,
      length: 50
    }
  }
};

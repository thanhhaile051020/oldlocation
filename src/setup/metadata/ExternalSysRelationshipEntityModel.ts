import {Model, Type} from 'onecore';

export const externalSysRelationshipModel: Model = {
  name: 'externalSysRelationship',
  attributes: {
    esId: {
      type: Type.String,
      length: 50,
      key: true
    },
    profileId: {
      type: Type.String,
      length: 50
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
    actionDate: {
      type: Type.Date
    },
  }
};

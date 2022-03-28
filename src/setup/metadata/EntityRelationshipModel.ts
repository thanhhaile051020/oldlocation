import {Model, Type} from 'onecore';

export const entityRelationshipModel: Model = {
  name: 'entityRelationship',
  attributes: {
    esId: {
      type: Type.String,
      length: 50,
      key: true
    },
    payeeId: {
      type: Type.String,
      length: 50,
      key: true
    },
    entityName: {
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
    payers: {
      type: Type.Array,
    }
  }
};

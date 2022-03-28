import {Model, Type} from 'onecore';

export const branchModel: Model = {
  name: 'branch',
  attributes: {
    branchId: {
      type: Type.String,
      length: 45,
      key: true
    },
    clZoneNo: {
      type: Type.String,
      length: 45,
    },
    brZoneNo: {
      type: Type.String,
      length: 45,
    },
    brNameEng: {
      type: Type.String ,
      length: 45
    },
    brNameTh: {
      type: Type.String,
      length: 45
    },
  }
};

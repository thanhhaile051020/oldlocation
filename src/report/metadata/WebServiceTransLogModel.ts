import {Model, Type} from 'onecore';

export const webServiceTransLogModel: Model = {
  name: 'webServiceTransLog',
  attributes: {
    exSysRefNo: {
      type: Type.String,
      key: true
    },
    exSysName: {
      type: Type.String ,
      length: 60
    },
    transNo: {
      type: Type.String,
      key: true
    },
    webServicesType: {
      type: Type.String ,
      length: 60
    },
    receiveDate: {
      type: Type.Date
    },
    detail: {
      type: Type.String,
      length: 500
    },
    statusCode: {
      type: Type.String,
      length: 10
    }
  }
};

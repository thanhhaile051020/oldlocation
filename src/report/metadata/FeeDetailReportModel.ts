import {Model, Type} from 'onecore';

export const feeDetailReportModel: Model = {
  name: 'feeDetailReport',
  attributes: {
    payerName: {
      type: Type.String,
    },
    transactionDate: {
      type: Type.Date
    },
    transactionNo: {
      type: Type.String
    },
    internalReference: {
      type: Type.String ,
    },
    transactionStatus: {
      type: Type.String ,
    },
    transactionAmount: {
      type: Type.String,
    },
    feeAmount: {
      type: Type.String
    },
    feeTransactionNo: {
      type: Type.String,
    },
    feeEffectiveDate: {
      type: Type.Date
    },
    feePositingType: {
      type: Type.String,
    },
    feeDebitAccount: {
      type: Type.String,
    }
  }
};


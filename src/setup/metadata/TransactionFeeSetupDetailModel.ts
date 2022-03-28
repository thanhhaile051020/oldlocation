import {Model, Type} from 'onecore';

export const transactionFeeSetupDetailModel: Model = {
  name: 'transactionFeeSetupDetail',
  attributes: {
    transFeeId: {
      type: Type.Number,
      key: true
    },
    postingType: {
      type: Type.String,
      length: 255
    },
    postTypeDet: {
      type: Type.String,
      length: 255
    },
    transFix: {
      type: Type.String,
      length: 255
    },
    transMaxAmt: {
      type: Type.Integer,
      length: 15
    },
    transMinAmt: {
      type: Type.Integer,
      length: 15
    },
    transFixAmt: {
      type: Type.Integer,
      length: 15
    },
    postingOther: {
      type: Type.String,
      length: 255
    },
    effectiveDate: {
      type: Type.Date
    },
    postingDay: {
      type: Type.Integer,
      length: 15
    },
    payerDebitAcc: {
      type: Type.String,
      length: 255
    },
    payerCreditAcc: {
      type: Type.String,
      length: 255
    },
    payeeOther: {
      type: Type.String,
      length: 255
    },
    payeeDebitAcc: {
      type: Type.String,
      length: 255
    },
    payeeCreditAcc: {
      type: Type.String,
      length: 255
    },
    ruleType: {
      type: Type.String,
      length: 255
    },
  }
};

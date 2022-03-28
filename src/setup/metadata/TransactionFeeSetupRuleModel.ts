import {Model, Type} from 'onecore';

export const transactionFeeSetupRuleModel: Model = {
  name: 'transactionFeeSetupRule',
  attributes: {
    lowerLimit: {
      type: Type.Number
    },
    upperLimit: {
      type: Type.Number
    },
    transCharge: {
      type: Type.Number
    },
    lvlMinAmt: {
      type: Type.Number
    },
    lvlMaxAmt: {
      type: Type.Number
    },
    chargeUom: {
      type: Type.String,
      length: 2
    },
  }
};

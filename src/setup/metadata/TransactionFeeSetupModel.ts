import {Model, Type} from 'onecore';
import {transactionFeeSetupDetailModel} from './TransactionFeeSetupDetailModel';
import {transactionFeeSetupRuleModel} from './TransactionFeeSetupRuleModel';

export const transactionFeeSetupModel: Model = {
  name: 'transactionFeeSetup',
  attributes: {
    transFeeId: {
      type: Type.Number,
      key: true
    },
    esId: {
      type: Type.String,
      length: 255
    },
    payeeId: {
      type: Type.String,
      length: 255
    },
    actionStatus: {
      type: Type.String,
      length: 255
    },
    ctrlStaus: {
      type: Type.String,
      length: 255
    },
    entId: {
      type: Type.String,
      length: 255
    },
    chargeTo: {
      type: Type.String,
      length: 255
    },
    chargeType: {
      type: Type.String,
      length: 255
    },
    chargePerc: {
      type: Type.Number
    },
    feeReceipt: {
      type: Type.String,
      length: 255
    },
    zoneType: {
      type: Type.String,
      length: 255
    },
    userType: {
      type: Type.String,
      length: 255
    },
    transactionFeeSetupDetail: {
      type: Type.Object,
      typeof: transactionFeeSetupDetailModel
    },
    transactionFeeSetupRules: {
      type: Type.Array,
      typeof: transactionFeeSetupRuleModel
    }
  }
};


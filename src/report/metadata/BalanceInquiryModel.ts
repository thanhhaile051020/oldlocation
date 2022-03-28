import {Model, Type} from 'onecore';

export const balanceInquiryModel: Model = {
  name: 'balanceInquiry',
  attributes: {
    entityId: {
      type: Type.String,
      key: true
    },
    accountNo: {
      type: Type.String,
      key: true
    }
  }
};

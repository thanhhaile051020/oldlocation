import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprObservableEpics} from 'redux-plus';
import {applicationContext} from '../../config/ApplicationContext';
import {Payer} from '../../model/Payer';
import {PayerSM} from '../../search-model/PayerSM';
import {PayerActionType} from './PayerActionType';

const actionType = {
  searchType: PayerActionType.GET_PAYER_LIST,
  getByIdType: PayerActionType.GET_PAYER,
  updateType: PayerActionType.UPDATE_PAYER,
  insertType: PayerActionType.INSERT_PAYER,
  diff: PayerActionType.CHECK_PAYER,
  approveType: PayerActionType.APPROVE_PAYER,
  rejectType: PayerActionType.REJECT_PAYER,
};

const payerObservableEpics = new GenericSearchDiffApprObservableEpics<Payer, any, ResultInfo<Payer>, PayerSM>(actionType, applicationContext.payerService);

export const payerEpics = {
  search: payerObservableEpics.search,
  update: payerObservableEpics.update,
  insert: payerObservableEpics.insert,
  load: payerObservableEpics.load,
  diff: payerObservableEpics.diff,
  approve: payerObservableEpics.approve,
  reject: payerObservableEpics.reject,
};

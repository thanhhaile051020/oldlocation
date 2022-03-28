import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprObservableEpics} from 'redux-plus';
import {applicationContext} from '../../config/ApplicationContext';
import {Payee} from '../../model/Payee';
import {PayeeSM} from '../../search-model/PayeeSM';
import {PayeeActionType} from './PayeeActionType';

const actionType = {
  searchType: PayeeActionType.GET_PAYEE_LIST,
  getByIdType: PayeeActionType.GET_PAYEE,
  updateType: PayeeActionType.UPDATE_PAYEE,
  insertType: PayeeActionType.INSERT_PAYEE,
  diff: PayeeActionType.CHECK_PAYEE,
  approveType: PayeeActionType.APPROVE_PAYEE,
  rejectType: PayeeActionType.REJECT_PAYEE,
};

const payeeObservableEpics = new GenericSearchDiffApprObservableEpics<Payee, any, number|ResultInfo<Payee>, PayeeSM>(actionType, applicationContext.payeeService);

export const payeeEpics = {
  search: payeeObservableEpics.search,
  update: payeeObservableEpics.update,
  insert: payeeObservableEpics.insert,
  load: payeeObservableEpics.load,
  diff: payeeObservableEpics.diff,
  approve: payeeObservableEpics.approve,
  reject: payeeObservableEpics.reject,
};

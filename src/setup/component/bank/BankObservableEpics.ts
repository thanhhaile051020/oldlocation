import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprObservableEpics} from 'redux-plus';
import {applicationContext} from '../../config/ApplicationContext';
import {Bank} from '../../model/Bank';
import {BankSM} from '../../search-model/BankSM';
import {BankActionType} from './BankActionType';

const actionType = {
  searchType: BankActionType.GET_BANK_LIST,
  getByIdType: BankActionType.GET_BANK,
  updateType: BankActionType.UPDATE_BANK,
  insertType: BankActionType.INSERT_BANK,
  diff: BankActionType.CHECK_BANK,
  approveType: BankActionType.APPROVE_BANK,
  rejectType: BankActionType.REJECT_BANK,
};

const bankObservableEpics = new GenericSearchDiffApprObservableEpics<Bank, string, ResultInfo<Bank>, BankSM>(actionType, applicationContext.bankService);

export const bankEpics = {
  search: bankObservableEpics.search,
  update: bankObservableEpics.update,
  insert: bankObservableEpics.insert,
  load: bankObservableEpics.load,
  diff: bankObservableEpics.diff,
  approve: bankObservableEpics.approve,
  reject: bankObservableEpics.reject,
};

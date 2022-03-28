import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprObservableEpics} from 'redux-plus';
import {applicationContext} from '../../config/ApplicationContext';
import {TransactionFeeSetup} from '../../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../../search-model/TransactionFeeSetupSM';
import {TransactionFeeActionType} from './TransactionFeeActionType';

const actionType = {
  searchType: TransactionFeeActionType.GET_TRANSACTION_FEE_LIST,
  getByIdType: TransactionFeeActionType.GET_TRANSACTION_FEE,
  updateType: TransactionFeeActionType.UPDATE_TRANSACTION_FEE,
  insertType: TransactionFeeActionType.INSERT_TRANSACTION_FEE,
  diff: TransactionFeeActionType.CHECK_TRANSACTION_FEE,
  approveType: TransactionFeeActionType.APPROVE_TRANSACTION_FEE,
  rejectType: TransactionFeeActionType.REJECT_TRANSACTION_FEE,
};

const transactionObservableEpics =
  new GenericSearchDiffApprObservableEpics<TransactionFeeSetup, number, ResultInfo<TransactionFeeSetup>, TransactionFeeSetupSM>(
    actionType, applicationContext.transactionFeeSetupService
  );

  export const transactionFeeEpics = {
    search: transactionObservableEpics.search,
    update: transactionObservableEpics.update,
    insert: transactionObservableEpics.insert,
    load: transactionObservableEpics.load,
    diff: transactionObservableEpics.diff,
    approve: transactionObservableEpics.approve,
    reject: transactionObservableEpics.reject,
  };

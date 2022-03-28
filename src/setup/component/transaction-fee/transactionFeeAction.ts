import {ReducerActionType} from 'redux-plus';
import {TransactionFeeActionType} from './TransactionFeeActionType';

function createAction<T extends ReducerActionType<TransactionFeeActionType>>(d: T): T {
  return d;
}

export const getTransactionFeeList = (data: any) => createAction({
  type: TransactionFeeActionType.GET_TRANSACTION_FEE_LIST,
  payload: data
});

export const getTransactionFee = (data: any) => createAction({
  type: TransactionFeeActionType.GET_TRANSACTION_FEE,
  payload: data
});

export const updateTransactionFee = (data: any) => createAction({
  type: TransactionFeeActionType.UPDATE_TRANSACTION_FEE,
  payload: data
});

export const insertTransactionFee = (data: any) => createAction({
  type: TransactionFeeActionType.INSERT_TRANSACTION_FEE,
  payload: data
});

export const checkTransactionFee = (data: any) => createAction({
  type: TransactionFeeActionType.CHECK_TRANSACTION_FEE,
  payload: data
});

export const approveTransactionFee = (data: any) => createAction({
  type: TransactionFeeActionType.APPROVE_TRANSACTION_FEE,
  payload: data
});

export const rejectTransactionFee = (data: any) => createAction({
  type: TransactionFeeActionType.REJECT_TRANSACTION_FEE,
  payload: data
});

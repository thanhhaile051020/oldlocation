import {ReducerActionType} from 'redux-plus';
import {BankActionType} from './BankActionType';

function createAction<T extends ReducerActionType<BankActionType>>(d: T): T {
  return d;
}

export const getBankList = (data: any) => createAction({
  type: BankActionType.GET_BANK_LIST,
  payload: data
});

export const getBank = (data: any) => createAction({
  type: BankActionType.GET_BANK,
  payload: data
});

export const updateBank = (data: any) => createAction({
  type: BankActionType.UPDATE_BANK,
  payload: data
});

export const insertBank = (data: any) => createAction({
  type: BankActionType.INSERT_BANK,
  payload: data
});

export const diff = (data: any) => createAction({
  type: BankActionType.CHECK_BANK,
  payload: data
});

export const updateApprove = (data: any) => createAction({
  type: BankActionType.APPROVE_BANK,
  payload: data
});

export const updateReject = (data: any) => createAction({
  type: BankActionType.REJECT_BANK,
  payload: data
});

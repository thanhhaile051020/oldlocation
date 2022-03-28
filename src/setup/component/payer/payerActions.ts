import {ReducerActionType} from 'redux-plus';
import {ReduxModel} from 'redux-plus';
import {Payer} from 'src/setup/model/Payer';
import {PayerActionType} from './PayerActionType';

function createAction<T extends ReducerActionType<PayerActionType>>(d: T): T {
  return d;
}

export const getPayerList = (data: any) => createAction({
  type: PayerActionType.GET_PAYER_LIST,
  payload: data
});


export const getPayer = (data: ReduxModel<any, Payer>) => createAction({
  type: PayerActionType.GET_PAYER,
  payload: data
});

export const updatePayer = (data: any) => createAction({
  type: PayerActionType.UPDATE_PAYER,
  payload: data
});

export const insertPayer = (data: any) => createAction({
  type: PayerActionType.INSERT_PAYER,
  payload: data
});

export const checkPayer = (data: any) => createAction({
  type: PayerActionType.CHECK_PAYER,
  payload: data
});

export const approvePayer = (data: any) => createAction({
  type: PayerActionType.APPROVE_PAYER,
  payload: data
});

export const rejectPayer = (data: any) => createAction({
  type: PayerActionType.REJECT_PAYER,
  payload: data
});

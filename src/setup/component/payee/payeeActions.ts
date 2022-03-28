import {ReducerActionType} from 'redux-plus';
import {PayeeActionType} from './PayeeActionType';

function createAction<T extends ReducerActionType<PayeeActionType>>(d: T): T {
  return d;
}

export const getAllDynamicForm = (data: any) => createAction({
  type: PayeeActionType.GET_ALL_DYNAMIC_FORM,
  payload: data
});

export const getDynamicFormByModelName = (data: any) => createAction({
  type: PayeeActionType.GET_DYNAMIC_FORM_BY_MODEL_NAME,
  payload: data
});

export const getDynamicFormById = (data: any) => createAction({
  type: PayeeActionType.GET_DYNAMIC_FORM_BY_ID,
  payload: data
});

export const insertDynamicForm = (data: any) => createAction({
  type: PayeeActionType.INSERT_DYNAMIC_FORM,
  payload: data
});

export const updateDynamicForm = (data: any) => createAction({
  type: PayeeActionType.UPDATE_DYNAMIC_FORM,
  payload: data
});

export const deleteDynamicForm = (data: any) => createAction({
  type: PayeeActionType.DELETE_DYNAMIC_FORM,
  payload: data
});

export const getPayeeList = (data: any) => createAction({
  type: PayeeActionType.GET_PAYEE_LIST,
  payload: data
});

export const getPayee = (data: any) => createAction({
  type: PayeeActionType.GET_PAYEE,
  payload: data
});

export const updatePayee = (data: any) => createAction({
  type: PayeeActionType.UPDATE_PAYEE,
  payload: data
});

export const insertPayee = (data: any) => createAction({
  type: PayeeActionType.INSERT_PAYEE,
  payload: data
});

export const checkPayee = (data: any) => createAction({
  type: PayeeActionType.CHECK_PAYEE,
  payload: data
});

export const approvePayee = (data: any) => createAction({
  type: PayeeActionType.APPROVE_PAYEE,
  payload: data
});

export const rejectPayee = (data: any) => createAction({
  type: PayeeActionType.REJECT_PAYEE,
  payload: data
});

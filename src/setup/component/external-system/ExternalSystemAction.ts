import {ReducerActionType} from 'redux-plus';
import {ExternalSystemActionType} from './ExternalSystemActionType';

function createAction<T extends ReducerActionType<ExternalSystemActionType>>(d: T): T {
  return d;
}

export const getExternalSystemList = (data: any) => createAction({
  type: ExternalSystemActionType.GET_EXTERNALSYSTEM_LIST,
  payload: data
});

export const getExternalSystem = (data: any) => createAction({
  type: ExternalSystemActionType.GET_EXTERNALSYSTEM,
  payload: data
});

export const updateExternalSystem = (data: any) => createAction({
  type: ExternalSystemActionType.UPDATE_EXTERNALSYSTEM,
  payload: data
});

export const insertExternalSystem = (data: any) => createAction({
  type: ExternalSystemActionType.INSERT_EXTERNALSYSTEM,
  payload: data
});

export const checkExternalSystem = (data: any) => createAction({
  type: ExternalSystemActionType.CHECK_EXTERNALSYSTEM,
  payload: data
});

export const approveExternalSystem = (data: any) => createAction({
  type: ExternalSystemActionType.APPROVE_EXTERNALSYSTEM,
  payload: data
});

export const rejectExternalSystem = (data: any) => createAction({
  type: ExternalSystemActionType.REJECT_EXTERNALSYSTEM,
  payload: data
});

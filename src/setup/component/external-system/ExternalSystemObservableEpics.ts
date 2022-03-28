import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprObservableEpics} from 'redux-plus';
import {applicationContext} from '../../config/ApplicationContext';
import {ExternalSys} from '../../model/ExternalSys';
import {ExternalSysSM} from '../../search-model/ExternalSysSM';
import {ExternalSystemActionType} from './ExternalSystemActionType';

const actionType = {
  searchType: ExternalSystemActionType.GET_EXTERNALSYSTEM_LIST,
  getByIdType: ExternalSystemActionType.GET_EXTERNALSYSTEM,
  updateType: ExternalSystemActionType.UPDATE_EXTERNALSYSTEM,
  insertType: ExternalSystemActionType.INSERT_EXTERNALSYSTEM,
  diff: ExternalSystemActionType.CHECK_EXTERNALSYSTEM,
  approveType: ExternalSystemActionType.APPROVE_EXTERNALSYSTEM,
  rejectType: ExternalSystemActionType.REJECT_EXTERNALSYSTEM,
};

const externalSysObservableEpics = new GenericSearchDiffApprObservableEpics<ExternalSys, string, ResultInfo<ExternalSys>, ExternalSysSM>(actionType, applicationContext.externalSysService);

export const externalSysEpics = {
  search: externalSysObservableEpics.search,
  update: externalSysObservableEpics.update,
  insert: externalSysObservableEpics.insert,
  load: externalSysObservableEpics.load,
  diff: externalSysObservableEpics.diff,
  approve: externalSysObservableEpics.approve,
  reject: externalSysObservableEpics.reject,
};

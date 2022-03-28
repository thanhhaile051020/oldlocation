import {valueOf} from 'reflectx';
import {applicationContext} from '../../config/ApplicationContext';
import {PayeeActionType} from './PayeeActionType';

function initGlobalState<T extends object>(): T {
  const t: any = {};
  return t;
}

export function payeeReducer<T extends object>(state: T = initGlobalState(), action: any) {
  const service = applicationContext.payeeService;
  const { payload } = action;
  const self = valueOf(payload, 'callback.self');
  const execute = valueOf(payload, 'callback.execute');

  switch (action.type) {
    case PayeeActionType.GET_PAYEE_LIST:
      return service.search(payload.s).then(
        (sr: any) => payload.callback(payload.s, sr, payload.self),
        err => payload.self.handleError(err)
      );

    case PayeeActionType.GET_PAYEE:
      return service.load(payload.id).then(
        res => execute(res, self),
        err => self.handleError(err)
      );
      /*
      return service.load(payload.id).subscribe(
        res => execute(res, self),
        err => self.handleError(err)
      );
      */

    case PayeeActionType.CHECK_PAYEE:
      return service.diff(payload.id).then(
        res => execute(res, self),
        err => self.handleError(err)
      );

    case PayeeActionType.INSERT_PAYEE:
      return service.insert(payload.obj).then(
        res => {
          return execute(res, self);
        },
        err => self.handleError(err)
      );

    case PayeeActionType.UPDATE_PAYEE:
      return service.update(payload.obj).then(
        res => {
          return execute(res, self);
        },
        err => self.handleError(err)
      );

    case PayeeActionType.APPROVE_PAYEE:
      return service.approve(payload.obj).then(
        res => execute(self, true),
        err => execute(self, false, err)
      );

    case PayeeActionType.REJECT_PAYEE:
      return service.reject(payload.obj).then(
        res => execute(self, true),
        err => execute(self, false, err)
      );
    default:
      return state;
  }
}

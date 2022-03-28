import {createSelector} from 'reselect';
import {GlobalState, ViewListDiffGlobalStateSelector} from 'reselect-plus';
import {Payee} from '../../model/Payee';
import {DYNAMIC_LIST_FORM, PAYEE_DIFF_FORM, PAYEE_FORM, PAYEES_FORM} from './Constants';
import {PayeeGlobalState} from './PayeeGlobalState';

class PayeeSelector extends ViewListDiffGlobalStateSelector<PayeeGlobalState, Payee, any> {
  constructor() {
    super(PAYEE_FORM, PAYEES_FORM, PAYEE_DIFF_FORM);
  }

  selectDynamicForm = createSelector<GlobalState<PayeeGlobalState>, any, any>(
    (this as any).selectGlobalState,
    (globalState: PayeeGlobalState) => {
      if (globalState && (globalState as any).dynamicForm) {
        return (globalState as any).dynamicForm;
      }
      return {};
    }
  );

  selectListDynamicForm = createSelector<GlobalState<PayeeGlobalState>, any, any>(
    this.selectGlobalState,
    (globalState: PayeeGlobalState) => {
      if (globalState && globalState[DYNAMIC_LIST_FORM]) {
        return globalState[DYNAMIC_LIST_FORM];
      }
      return [];
    }
  );
}

export const payeeSelector = new PayeeSelector();

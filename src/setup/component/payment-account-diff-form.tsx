import * as React from 'react';
import {Diff} from 'react-diff-x';
import {buildId, DiffApprComponent, DiffState, HistoryProps} from 'react-onex';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {PaymentAccount} from '../model/PaymentAccount';

export class PaymentAccountDiffForm extends DiffApprComponent<PaymentAccount, any, HistoryProps, DiffState<PaymentAccount>> {
  constructor(props) {
    super(props, applicationContext.paymentAccountService, storage.resource(), getLocale, showToast, alertError, storage.loading());
    this.state = {
      banks: [],
      payers: [],
      selectedBank: {},
      origin: {},
      value: {}
    };
  }

  renderFields = [
    {resourceKey: 'payer_name', name: 'entityName'},
    {resourceKey: 'payer_short_name', name: 'shortName'},
    {resourceKey: 'bank_name', name: 'bankName'},
    {resourceKey: 'bank_short_name', name: 'bankShortName'},
    {resourceKey: 'bank_branch_id', name: 'branchId'},
    {resourceKey: 'account_currency', name: 'ccyCode'},
    {resourceKey: 'account_number', name: 'accNo'},
    {resourceKey: 'account_name', name: 'accName'},
    {resourceKey: 'enable_for_night_mode', name: 'nightMode'}
  ];
  private readonly bankService = applicationContext.bankService;
  private readonly payerService = applicationContext.payerService;

  async load(id: any) {
    Promise.all([
      this.bankService.all(),
      this.payerService.all()
    ]).then(values => {
      const [banks, payers] = values;
      this.setState(prevState => ({
        ...prevState,
        banks,
        payers
      }), () => super.load(id));
    }).catch(this.handleError);
  }

  getBank(bankId: string): any {
    for (const bank of this.state.banks) {
      if (bank.bankId === bankId) {
        return bank;
      }
    }
    return {};
  }

  getPayer = (id: string) => {
    for (const payer of this.state.payers) {
      if (payer.entityId === id) {
        return payer;
      }
    }
    return {};
  }

  formatFields(value) {
    const selectedBank = this.getBank(value.bankId);
    const selectedPayer = this.getPayer(value.entityId);
    const entityName = value && selectedPayer.entityName || '';
    const shortName = value && selectedPayer.shortName || '';
    const bankName = value && selectedBank.bankName || '';
    const branchId = value && selectedBank.branchId || '';
    const bankShortName = value && selectedBank.bankShortName || '';
    const nightMode = value && value.nightMode && value.nightMode === 'B' ? 'Enable' : 'None';
    return {...value, nightMode, bankName, entityName, shortName, bankShortName, branchId};
  }

  render() {
    const resource = this.resource;
    const { value, origin, disabled, rejectSuccess } = this.state;
    return (
      <div className='view-container'>
        <form id='paymentAccountForm' name='paymentAccountForm' model-name='paymentAccount' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{resource.payment_subject}</h2>
          </header>
          <Diff origin= {origin}
                     value= {value}
                     resource={resource}
                     renderFields={this.renderFields}
          />
          <footer>
            <button type='submit' id='btnSave' name='buttonApprove' onClick={this.approve} disabled={disabled}>
              {resource.approve}
            </button>
            <button type='button' id='btnReject' name='buttonReject' onClick={this.reject} disabled={disabled}>
              {resource.reject}
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

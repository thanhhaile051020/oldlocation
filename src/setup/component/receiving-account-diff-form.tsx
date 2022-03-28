import * as React from 'react';
import {Diff} from 'react-diff-x';
import {buildId, DiffApprComponent, DiffState, HistoryProps} from 'react-onex';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {EntityAccount} from '../model/EntityAccount';

export class ReceivingAccountDiffForm extends DiffApprComponent<EntityAccount, any, HistoryProps, DiffState<EntityAccount>> {
  constructor(props) {
    super(props, applicationContext.receivingAccountService, storage.resource(), getLocale, showToast, alertError, storage.loading());
    this.state = {
      isDisable: false,
      banks: [],
      payees: [],
      selectedBank: {},
      origin: {},
      value: {}
    };
  }

  renderFields = [
    {resourceKey: 'payee', name: 'entityName'},
    {resourceKey: 'payee_short_name', name: 'shortName'},
    {resourceKey: 'bank', name: 'bankName'},
    {resourceKey: 'bank_short_name', name: 'bankShortName'},
    {resourceKey: 'bank_branch_id', name: 'branchId'},
    {resourceKey: 'account_currency', name: 'ccyCode'},
    {resourceKey: 'account_number', name: 'accNo'},
    {resourceKey: 'account_name', name: 'accName'},
    {resourceKey: 'receiving_account_default_account', name: 'checkbox'},
    {resourceKey: 'receiving_account_night_mode', name: 'nightMode'},
  ];

  private readonly bankService = applicationContext.bankService;
  private readonly payeeService = applicationContext.payeeService;

  async load(id: any) {
    Promise.all([
      this.bankService.all(),
      this.payeeService.all()
    ]).then(values => {
      const [banks, payees] = values;
      this.setState(prevState => ({
        ...prevState,
        banks,
        payees
      }), () => super.load(id));
    }).catch(this.handleError);
  }

  formatFields(value) {
    const resource = this.resource;
    const selectedPayer = this.getPayee(value.entityId);
    const selectedBank = this.getBank(value.bankId);
    const entityName = value && selectedPayer.entityName || '' ;
    const shortName = value && selectedPayer.shortName || '' ;
    const bankName = value && selectedBank.bankName || '' ;
    const bankShortName = value && selectedBank.bankShortName || '' ;
    const branchId = value && selectedBank.branchId || '' ;
    const nightMode =  value && value.nightMode  && value.nightMode === 'D' ? resource.receiving_account_night_mode_disable : '' ||
                                    value.nightMode === 'B' ? resource.receiving_account_night_mode_block_credit : '' ||
                                    value.nightMode === 'U' ? resource.receiving_account_night_mode_unblock_credit : '';

    return {...value, entityName, shortName, bankName, bankShortName, branchId, nightMode};
  }

  getBank(bankId: string): any {
    return this.state.banks.find(bank => bank.bankId === bankId) || {};
  }

  getPayee = (id: string) => {
    return this.state.payees.find(payee => payee.entityId === id) || {};
  }

  render() {
    const resource = this.resource;
    const { origin, value, disabled } = this.state;
    return (
      <div className='view-container'>
        <form id='payerForm' name='payerForm' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{resource.receiving_account_name}</h2>
          </header>
          <Diff origin= {origin}
                     value= {value}
                     resource={resource}
                     renderFields={this.renderFields}
          />
          <footer>
            <button type='submit' id='btnApprove' name='btnApprove' onClick={this.approve} disabled={disabled}>
              {resource.approve}
            </button>
            <button type='button' id='btnReject' name='btnReject' onClick={this.reject} disabled={disabled}>
              {resource.reject}
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

import * as React from 'react';
import {buildId, EditComponent, HistoryProps} from 'react-onex';
import {alertError, confirm} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, storage} from 'uione';
import {requiredOnBlur} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {PaymentAccount} from '../model/PaymentAccount';

interface InternalState {
  paymentAccount: PaymentAccount;
}

export class PaymentAccountForm extends EditComponent<PaymentAccount, any, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.paymentAccountService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      banks: [],
      payers: [],
      paymentAccount: {},
      selectedBank: {},
      selectedBankId: '',
      shortName: ''
    };
    this.loadShortName = this.loadShortName.bind(this);
  }
  private readonly bankService = applicationContext.apprBankService;
  private readonly payerService = applicationContext.apprPayerService;

  async load(id: any) {
    Promise.all([
      this.bankService.all(),
      this.payerService.all()
    ]).then(arr => {
      const [banks, payers] = arr;
      this.setState(prevState => ({
        ...prevState,
        banks,
        payers
      }), () => {
        if (id) {
          if (id.hasOwnProperty('bankId') && id['bankId']) {
            const bankId = id['bankId'];
            this.getBank(bankId);
          }
          if (id.hasOwnProperty('entityId') && id['entityId']) {
            const entityId = id['entityId'];
            this.loadShortName(entityId);
          }
        }
        super.load(id);
      });
    });
    /*
    zip(
      this.bankService.all(),
      this.payerService.all()
    ).subscribe(([banks, payers]) => {
      this.setState(prevState => ({
        ...prevState,
        banks,
        payers
      }), () => {
        const objectIds = this.getId();
        if (objectIds && objectIds.hasOwnProperty('bankId') && objectIds['bankId']) {
          const bankId = objectIds['bankId'];
          this.getBank(bankId);
        }
        if (objectIds && objectIds.hasOwnProperty('entityId') && objectIds['entityId']) {
          const entityId = objectIds['entityId'];
          this.loadShortName(entityId);
        }
        this.loadData();
      }
      );
    }, this.handleError);
    */
  }

  createModel(): PaymentAccount {
    const paymentAccount = super.createModel();
    paymentAccount.nightMode = 'U';
    return paymentAccount;
  }

  getModel(): PaymentAccount {
    const paymentAccount = super.getModel();
    delete paymentAccount.bank;
    delete paymentAccount.profile;
    return paymentAccount;
  }

  getBank(bankId: string): any {
    for (const bank of this.state.banks) {
      if (bank.bankId === bankId) {
        return bank;
      }
    }
    return {};
  }

  selectBank = (event) => {
    event.preventDefault();
    const selectedBankId = event.target.value;
    const { paymentAccount } = this.state;
    paymentAccount.bankId = selectedBankId;
    const selectedBank = this.getBank(selectedBankId);
    this.setState({ selectedBankId, selectedBank, paymentAccount });
  }

  async loadShortName(entityId: string) {
    try {
      const payee = await applicationContext.payeeService.load(entityId);
      const shortName = payee.shortName;
      this.setState(prevState => ({
        ...prevState,
        shortName
      }));
    } catch (err) {
      this.handleError(err);
    }
  }

  getPayeeShortName(paymentAccount?: PaymentAccount): any {
    const { payers } = this.state;
    paymentAccount = paymentAccount === undefined ? this.state.paymentAccount : paymentAccount;
    for (const payee of payers) {
      if (payee.entityId === paymentAccount.entityId) {
        this.setState({ shortName: payee.shortName });
      }
    }
  }

  render() {
    const resource = this.resource;
    const { banks, payers, paymentAccount, shortName } = this.state;
    const selectedBank = this.getBank(paymentAccount.bankId);

    return (
      <div className='view-container'>
        <form id='paymentAccountForm' name='paymentAccountForm' model-name='paymentAccount' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{this.newMode ? resource.create : resource.edit} {resource.payment_subject}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.payer_name}
              <select id='entityId' name='entityId'
                disabled={!this.newMode}
                required={true}
                value={paymentAccount.entityId}
                onChange={(e) => {
                  this.updateState(e, this.getPayeeShortName);
                }}
              >
                <option selected={true} value=''>{resource.all}</option>
                )
                  {payers.map((payer, index) => (
                  <option key={index} value={payer.entityId}>{payer.entityName}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.payer_short_name}
              <input type='text'
                id='shortName' name='shortName' disabled={true}
                value={shortName}
                placeholder={resource.payer_short_name} />
            </label>
            <label className='col s12 m6'>
              {resource.bank_name}
              <select id='bankId' name='bankId'
                required={true}
                disabled={!this.newMode}
                value={paymentAccount.bankId}
                onChange={this.selectBank}
              >
                <option selected={true} value=''>{resource.all}</option>
                )
                  {banks.map((item, index) => (
                  <option key={index} value={item.bankId}>{item.bankName}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.bank_short_name}
              <p>{selectedBank.bankShortName}</p>
            </label>
            <label className='col s12 m6'>
              {resource.bank_branch_id}
              <input type='text'
                id='branchId' name='branchId'
                value={selectedBank.branchId}
                onChange={this.updateState}
                maxLength={255} required={true}
                placeholder={resource.bank_branch_id} />
            </label>
            <label className='col s12 m6'>
              {resource.account_currency}
              <input type='text'
                id='ccyCode' name='ccyCode'
                value={paymentAccount.ccyCode}
                onChange={this.updateState}
                maxLength={3} required={true}
                placeholder={resource.account_currency} />
            </label>
            <label className='col s12 m6'>
              {resource.account_number}
              <input type='text'
                id='accNo' name='accNo'
                disabled={!this.newMode}
                value={paymentAccount.accNo}
                onChange={this.updatePhoneState}
                onBlur={requiredOnBlur}
                maxLength={17} required={true}
                placeholder={resource.account_number} />
            </label>
            <label className='col s12 m6'>
              {resource.account_name}
              <input type='text'
                id='accName' name='accName'
                value={paymentAccount.accName}
                onChange={this.updateState}
                maxLength={255} required={true}
                placeholder={resource.account_name} />
            </label>
            <label className='col s12 m6 checkbox-container'>
              <input type='checkbox' id='nightMode' name='nightMode'
                value={paymentAccount.nightMode}
                checked={paymentAccount.nightMode === 'B'}
                onChange={this.updateState}
                data-on-value='B'
                data-off-value='U'/>
              {resource.enable_for_night_mode}
            </label>
          </div>
          <footer>
            { this.editable &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
              {resource.save}
              </button> }
          </footer>
        </form>
      </div>
    );
  }
}

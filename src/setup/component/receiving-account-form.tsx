import * as React from 'react';
import {buildId, EditComponent, HistoryProps} from 'react-onex';
import {alertError, confirm} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, storage} from 'uione';
import {requiredOnBlur} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {NightMode} from '../enum/NightMode';
import {EntityAccount} from '../model/EntityAccount';

interface InternalState {
  entityAccount: EntityAccount;
}

export class ReceivingAccountForm extends EditComponent<EntityAccount, any, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.receivingAccountService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      entityAccount: {},
      bankShortName: '',
      payeeShortName: '',
      branchId: '',
      payees: [],
      banks: []
    };
  }
  private readonly bankService = applicationContext.apprBankService;
  private readonly payeeService = applicationContext.apprPayeeService;

  async load(id: any) {
    Promise.all([
      this.bankService.all(),
      this.payeeService.all()
    ]).then(values => {
      const [banks, payees] = values;
      this.setState({ banks, payees }, () => super.load(id));
    }).catch(this.handleError);
  }

  createModel(): EntityAccount {
    const entityAccount = super.createModel();
    entityAccount.defaultType = 'T';
    entityAccount.nightMode = NightMode.Disable;
    return entityAccount;
  }

  formatModel(obj) {
    this.getBankShortName(obj);
    this.getPayeeShortName(obj);
    return obj;
  }

  getBankShortName(entityAccount?) {
    const { banks } = this.state;
    entityAccount = entityAccount === undefined ? this.state.entityAccount : entityAccount;
    for (const bank of banks) {
      if (bank.bankId === entityAccount.bankId) {
        this.setState({ bankShortName: bank.bankShortName, branchId: bank.branchId });
      }
    }
  }

  getPayeeShortName(entityAccount?: EntityAccount): any {
    const { payees } = this.state;
    entityAccount = entityAccount === undefined ? this.state.entityAccount : entityAccount;
    for (const payee of payees) {
      if (payee.entityId === entityAccount.entityId) {
        this.setState({ payeeShortName: payee.shortName });
      }
    }
  }

  render() {
    const resource = this.resource;
    const { entityAccount, payees, banks, bankShortName, payeeShortName, branchId } = this.state;
    return (
      <div className='view-container'>
        <form id='entityAccount' name='entityAccount' model-name='entityAccount' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{this.newMode ? resource.create : resource.edit} {resource.receiving_account_name}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.payee}
              <select id='entityId' name='entityId'
                disabled={!this.newMode}
                value={entityAccount.entityId}
                onChange={(e) => {
                  this.updateState(e, this.getPayeeShortName);
                }} required={true}>
                <option value='' disabled={true}>{resource.all}</option>
                {payees.map((item, index) => (
                  <option key={index}
                    value={item.entityId}>{item.entityName}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.payee_short_name}
              <input type='text'
                id='payeeShortName' name='payeeShortName'
                value={payeeShortName}
                disabled={true} />
            </label>
            <label className='col s12 m6'>
              {resource.bank}
              <select id='bankId' name='bankId'
                disabled={!this.newMode}
                value={entityAccount.bankId}
                onChange={(e) => {
                  this.updateState(e, this.getBankShortName);
                }} required={true}>
                <option value='' disabled={true}>{resource.all}</option>
                {banks.map((item, index) => (
                  <option key={index} value={item.bankId}
                  >{item.bankName}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.bank_short_name}
              <input type='text'
                id='bankShortName' name='bankShortName'
                value={bankShortName}
                disabled={true} />
            </label>
            <label className='col s12 m6'>
              {resource.bank_branch_id}
              <input type='text'
                id='branchId' name='branchId'
                value={branchId}
                disabled={true} />
            </label>
            <label className='col s12 m6'>
              {resource.account_currency}
              <input type='text'
                id='ccyCode' name='ccyCode'
                value={entityAccount.ccyCode}
                onChange={this.updateState}
                maxLength={3} required={true}
                placeholder={resource.account_currency} />
            </label>
            <label className='col s12 m6'>
              {resource.account_number}
              <input type='text'
                id='accNo' name='accNo'
                value={entityAccount.accNo}
                disabled={!this.newMode}
                onChange={this.updatePhoneState}
                onBlur={requiredOnBlur}
                maxLength={17} required={true}
                placeholder={resource.account_number} />
            </label>
            <label className='col s12 m6'>
              {resource.account_name}
              <input type='text'
                id='accName' name='accName'
                value={entityAccount.accName}
                onChange={this.updateState}
                maxLength={80} required={true}
                placeholder={resource.account_name} />
            </label>
            <label className='col s12 checkbox-container'>
              <input type='checkbox' id='defaultType' name='defaultType'
                value={entityAccount.defaultType}
                checked={entityAccount.defaultType === 'T'}
                onChange={this.updateState}
                data-on-value='T'
                data-off-value='F' />
              {resource.receiving_account_default_account}
            </label>
            <div className='col s12 radio-section'>
              {resource.receiving_account_night_mode}
              <div className='radio-group row'>
                <label className='col s12'>
                  <input type='radio' id='nightMode' name='nightMode' onChange={this.updateState}
                    value='D' checked={entityAccount.nightMode === 'D'} />
                  {resource.receiving_account_night_mode_disable}
                </label>
                <label className='col s12'>
                  <input type='radio' id='nightMode' name='nightMode' onChange={this.updateState}
                    value='B' checked={entityAccount.nightMode === 'B'} />
                  {resource.receiving_account_night_mode_block_credit}
                </label>
                <label className='col s12'>
                  <input type='radio' id='nightMode' name='nightMode' onChange={this.updateState}
                    value='U' checked={entityAccount.nightMode === 'U'} />
                  {resource.receiving_account_night_mode_unblock_credit}
                </label>
              </div>
            </div>
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

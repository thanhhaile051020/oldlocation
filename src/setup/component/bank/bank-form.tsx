import {ValueText} from 'onecore';
import * as React from 'react';
import {buildId, HistoryProps} from 'react-onex';
import {connect} from 'react-redux';
import {EditDispatchProps, ReduxEditComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer, updateGlobalState} from 'redux-plus';
import {ViewGlobalStateSelector} from 'reselect-plus';
import {alertError, confirm} from 'ui-alert';
import {formatter} from 'ui-plus';
import {showToast} from 'ui-toast';
import {emailOnBlur, faxOnBlur, getLocale, initForm, initMaterial, phoneOnBlur, requiredOnBlur, storage} from 'uione';
import {applicationContext} from '../../config/ApplicationContext';
import {bankModel} from '../../metadata/BankModel';
import {Bank} from '../../model/Bank';
import {getBank, insertBank, updateBank} from './bankActions';

export const BANK_FORM = 'bankForm';

interface InternalProps {
  bank: Bank;
}

type BankPropsType = InternalProps & EditDispatchProps<Bank, string> & HistoryProps;

export class BankComponent extends ReduxEditComponent<Bank, string, BankPropsType, any> {
  constructor(props) {
    super(props, bankModel, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.getKeyValue = this.getKeyValue.bind(this);
    this.state = {
      bank: {},
      branches: [],
    };
  }
  private readonly branchService = applicationContext.branchService;

  load(id: string) {
    this.branchService.all().then(xbranches => {
      const branches = this.getKeyValue(xbranches, 'branchId', 'brNameTh');
      this.setState(({
        branches
      }), () => super.load(id));
    }).catch(this.handleError);
  }

  getKeyValue(objs: any[], key: string, value: string): ValueText[] {
    return objs.map(item => {
      return { value: item[key], text: item[value] };
    });
  }
  protected createModel(): Bank {
    const bank = super.createModel();
    bank.countryCode = 'TH';
    bank.baseCcyCode = 'THB';
    bank.hostBankFlag = 'N';
    bank.passwordDeliveryMethod = 'P';
    return bank;
  }

  render() {
    const resource = this.resource;
    const { bank } = this.props;
    return (
      <div className='view-container'>
        <form id={BANK_FORM} name={BANK_FORM} model-name='bank' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{this.newMode ? resource.create : resource.edit} {resource.bank}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.bank_name}
              <input type='text'
                id='bankName' name='bankName'
                value={bank.bankName}
                onChange={this.updateState}
                maxLength={240} required={true}
                onBlur={requiredOnBlur}
                placeholder={resource.bank_name} />
            </label>
            <label className='col s12 m6'>
              {resource.bank_short_name}
              <input type='text'
                id='bankShortName' name='bankShortName'
                value={bank.bankShortName}
                onChange={this.updateState}
                maxLength={20} required={true}
                placeholder={resource.bank_short_name} />
            </label>
            <label className='col s12 m6'>
              {resource.bank_branch_id}
              <select id='branchId' name='branchId'
                value={bank.branchId}
                onChange={this.updateState}
                required={true}
              >
                <option defaultChecked={true} value=''>{resource.please_select}</option>
                )
                  {this.state.branches.map((item, index) => (
                  <option key={index} value={item.value}>{item.text}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.address + ' 1'}
              <input type='text'
                id='add1' name='add1'
                value={bank.add1}
                onChange={this.updateState}
                maxLength={240} required={true}
                placeholder={resource.address} />
            </label>
            <label className='col s12 m6'>
              {resource.address + ' 2'}
              <input type='text'
                id='add2' name='add2'
                value={bank.add2}
                onChange={this.updateState}
                maxLength={240}
                placeholder={resource.address} />
            </label>
            <label className='col s12 m6'>
              {resource.address + ' 3'}
              <input type='text'
                id='add3' name='add3'
                value={bank.add3}
                onChange={this.updateState}
                maxLength={240}
                placeholder={resource.address} />
            </label>
            <label className='col s12 m6'>
              {resource.postcode}
              <input type='text'
                id='postalCode' name='postalCode'
                value={bank.postalCode}
                onChange={this.updateState}
                maxLength={30}
                placeholder={resource.postcode} />
            </label>
            <label className='col s12 m6'>
              {resource.state}
              <input type='text'
                id='stateName' name='stateName'
                value={bank.stateName}
                onChange={this.updateState}
                maxLength={150}
                placeholder={resource.state} />
            </label>
            <label className='col s12 m6'>
              {resource.country}
              <input type='text'
                value='THAILAND'
                required={true} disabled={true} />
            </label>
            <label className='col s12 m6'>
              {resource.bank_base_currency}
              <input type='text'
                value='Thai Bath'
                required={true} disabled={true} />
            </label>
            <label className='col s12 m6'>
              {resource.contact_name}
              <input type='text'
                id='contactName' name='contactName'
                value={bank.contactName}
                onChange={this.updateState}
                maxLength={240} required={true}
                placeholder={resource.contact_name} />
            </label>
            <label className='col s12 m6'>
              {resource.contact_phone}
              <input type='tel'
                id='contactNo'
                name='contactNo'
                value={formatter.formatPhone(bank.contactNo)}
                onChange={this.updatePhoneState}
                onBlur={phoneOnBlur}
                maxLength={17}
                placeholder={resource.contact_phone} />
            </label>
            <label className='col s12 m6'>
              {resource.contact_fax}
              <input type='text'
                id='faxNo' name='faxNo'
                onChange={this.updatePhoneState}
                onBlur={faxOnBlur}
                value={formatter.formatFax(bank.faxNo)}
                maxLength={10}
                placeholder={resource.contact_fax} />
            </label>
            <label className='col s12 m6'>
              {resource.email}
              <input type='text'
                id='emailAdd' name='emailAdd'
                value={bank.emailAdd}
                data-type='email'
                onChange={this.updateState}
                onBlur={emailOnBlur}
                maxLength={100}
                placeholder={resource.email} />
            </label>
            <div className='col s12 m6 checkbox-section'>
              {resource.bank_host_bank}
              <label className='checkbox-container'>
                <input type='checkbox'
                  id='hostBankFlag' name='hostBankFlag'
                  value={bank.hostBankFlag}
                  onChange={this.updateState}
                  checked={bank.hostBankFlag === 'Y'}
                  data-on-value='Y'
                  data-off-value='N' />
                {resource.bank_host_bank}
              </label>
            </div>
            <div className='col s12 m6 radio-section'>
              {resource.password_delivery_method}
              <div className='radio-group'>
                <label>
                  <input type='radio' id='passwordDeliveryMethod' name='passwordDeliveryMethod' onChange={this.updateState}
                    value='P' checked={bank.passwordDeliveryMethod === 'P'} />
                  {resource.password_delivery_method_pin_mailer}
                </label>
                <label>
                  <input type='radio' id='passwordDeliveryMethod' name='passwordDeliveryMethod' onChange={this.updateState}
                    value='E' checked={bank.passwordDeliveryMethod === 'E'} />
                  {resource.bank_password_delivery_method_email_without_challenge}
                </label>
                <label>
                  <input type='radio' id='passwordDeliveryMethod' name='passwordDeliveryMethod' onChange={this.updateState}
                    value='C' checked={bank.passwordDeliveryMethod === 'C'} />
                  {resource.bank_password_delivery_method_email_with_challenge}
                </label>
              </div>
            </div>
          </div>
          <footer>
            {
              this.editable &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
                {resource.save}
              </button>
            }
          </footer>
        </form>
      </div>
    );
  }
}

const bankSelector = new ViewGlobalStateSelector(BANK_FORM);

function mapStateToProps(state) {
  return {
    bank: bankSelector.selectFormData(state),
  };
}

function mapDispatchToProps(dispatch): EditDispatchProps<Bank, string> {
  return {
    setGlobalState: (data) => dispatch(updateGlobalState(data)),
    load: (data) => dispatch(getBank(data)),
    update: (data) => dispatch(updateBank(data)),
    insert: (data) => dispatch(insertBank(data))
  };
}
const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const BankForm = compose(
  withStore,
  withConnect
)(BankComponent);

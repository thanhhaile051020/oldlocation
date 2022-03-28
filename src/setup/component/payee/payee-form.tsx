import * as React from 'react';
import {HistoryProps} from 'react-onex';
import {connect} from 'react-redux';
import {EditDispatchProps, ReduxEditComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer, updateGlobalState} from 'redux-plus';
import {alertError, confirm} from 'ui-alert';
import {formatter} from 'ui-plus';
import {showToast} from 'ui-toast';
import {emailOnBlur, getLocale, Locale, phoneOnBlur, requiredOnBlur, storage} from 'uione';
import {payeeModel} from '../../metadata/PayeeModel';
import {Payee} from '../../model/Payee';
import {PAYEE_FORM} from './Constants';
import {getPayee, insertPayee, updatePayee} from './payeeActions';
import {payeeSelector} from './PayeeSelector';

interface InternalProps {
  payee: Payee;
}

type PayeePropsType = InternalProps & EditDispatchProps<Payee, string> & HistoryProps;

class PayeeComponent extends ReduxEditComponent<Payee, string, PayeePropsType, any> {
  constructor(props) {
    super(props, payeeModel, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.formatCurrency = this.formatCurrency.bind(this);
    this.patchable = false;
    this.state = {
      date: new Date()
    };
  }

  createModel(): Payee {
    const payee = super.createModel();
    payee.entityType = 'E';
    return payee;
  }
  getModel(): Payee {
    const payee = super.getModel();
    // const locale = this.getLocale();
    // let data = typeof(payee.maxAtmPtrn) === 'string' ? payee.maxAtmPtrn.split(locale.groupSeparator).join('') : payee.maxAtmPtrn;
    // data = typeof(payee.maxAtmPtrn) === 'string' ? data.replace(locale.decimalSeparator, '.') : payee.maxAtmPtrn;
    // payee.maxAtmPtrn = parseFloat(data);
    payee.webConfirmation = 0;
    return payee;
  }
  protected currencyOnFocus(event: any) {
    event.preventDefault();
    storage.ui().currencyOnFocus(event, this.getLocale(), this.getCurrencyCode());
  }
  protected currencyOnBlur(event: any) {
    event.preventDefault();
    storage.ui().currencyOnBlur(event, this.getLocale(), this.getCurrencyCode(), this.currencySymbol());
  }
  protected formatCurrency(currency: string|number, locale?: Locale, currencyCode?: string) {
    if (!currencyCode) {
      currencyCode = this.getCurrencyCode();
    }
    if (!locale) {
      locale = this.getLocale();
    }
    let c: number;
    if (!currency) {
      return '';
    } else if (typeof currency === 'number') {
      c = currency;
    } else {
      let x: any = currency;
      x = x.replace(locale.decimalSeparator, '.');
      if (isNaN(x)) {
        return '';
      } else {
        c = parseFloat(x);
      }
    }
    return storage.locale().formatCurrency(c, currencyCode, locale);
  }
  render() {
    const resource = this.resource;
    const { payee } = this.props;

    return (
      <div className='view-container'>
        <form id={PAYEE_FORM} name={PAYEE_FORM} model-name='payee' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{this.newMode ? resource.create : resource.edit} {resource.payee}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.company_name}
              <input
                type='text'
                id='entityName'
                name='entityName'
                value={payee.entityName}
                onChange={this.updateState}
                maxLength={255}
                required={true}
                onBlur={requiredOnBlur}
                placeholder={resource.company_name} />
            </label>

            <label className='col s12 m6'>
              {resource.short_name}
              <input
                type='text'
                id='shortName'
                name='shortName'
                value={payee.shortName}
                onChange={this.updateState}
                maxLength={12}
                required={true}
                placeholder={resource.short_name} />
            </label>

            <label className='col s12 m6'>
              {resource.company_id}
              <input
                type='text'
                id='companyId'
                name='companyId'
                value={payee.companyId}
                onChange={this.updateState}
                maxLength={50}
                placeholder={resource.company_id} />
            </label>

            <label className='col s12 m6'>
              {resource.payment_amount_max}
              <input
                type='tel'
                id='maxAtmPtrn'
                name='maxAtmPtrn'
                className='text-right'
                data-type='currency'
                onChange={this.updateState}
                onBlur={this.currencyOnBlur}
                onFocus={this.currencyOnFocus}
                defaultValue={this.formatCurrency(payee.maxAtmPtrn)}
                maxLength={30}
                placeholder={resource.payment_amount_max} />
            </label>

            <label className='col s12'>
              {resource.address}
              <input
                type='text'
                id='add1'
                name='add1'
                value={payee.add1}
                onChange={this.updateState}
                maxLength={255}
                required={true}
                placeholder={resource.placeholder_address1} />
            </label>

            <label className='col s12'>
              <input
                type='text'
                id='add2'
                name='add2'
                value={payee.add2}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.placeholder_address2} />

              <input
                type='text'
                id='add3'
                name='add3'
                value={payee.add3}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.placeholder_address3} />
            </label>

            <label className='col s12 m6'>
              {resource.postcode}
              <input
                type='text'
                id='postalCode'
                name='postalCode'
                value={payee.postalCode}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.postcode} />
            </label>

            <label className='col s12 m6'>
              {resource.state}
              <input
                type='text'
                id='stateName'
                name='stateName'
                value={payee.stateName}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.state} />
            </label>

            <label className='col s12 m6'>
              {resource.country}
              <input
                type='text'
                value='THAILAND'
                required={true}
                disabled={true} />
            </label>
            <label className='col s12 m6'>
              {resource.contact_name}
              <input
                type='text'
                id='contactName'
                name='contactName'
                onChange={this.updateState}
                value={payee.contactName}
                maxLength={255}
                required={true}
                placeholder={resource.contact_name} />
            </label>

            <label className='col s12 m6'>
              {resource.contact_phone}
              <input
                type='text'
                id='contactNo'
                name='contactNo'
                value={formatter.formatPhone(payee.contactNo)}
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
                value={formatter.formatFax(payee.faxNo)}
                maxLength={12}
                placeholder={resource.contact_fax} />
            </label>

            <label className='col s12 m6'>
              {resource.mobile_phone_number}
              <input
                type='text'
                id='mobilePhone'
                name='mobilePhone'
                onChange={this.updatePhoneState}
                onBlur={phoneOnBlur}
                value={formatter.formatPhone(payee.mobilePhone)}
                maxLength={17}
                placeholder={resource.mobile_phone_number} />
            </label>

            <label className='col s12 m6'>
              {resource.email}
              <input
                type='text'
                id='emailAdd'
                name='emailAdd'
                data-type='email'
                onChange={this.updateState}
                value={payee.emailAdd}
                onBlur={emailOnBlur}
                maxLength={255} required={true}
                placeholder={resource.email} />
            </label>

            <div className='col s12 m6 checkbox-section'>
              {resource.entity_type}
              <label className='checkbox-container'>
                <input
                  type='checkbox'
                  id='entityType'
                  name='entityType'
                  value={payee.entityType}
                  checked={payee.entityType === 'R'}
                  onChange={this.updateState}
                  data-on-value='R'
                  data-off-value='E' />
                {resource.payee_set_as_payer}
              </label>
            </div>

            <div className='col s12 m6 radio-section'>
              {resource.business_type}
              <div className='radio-group'>
                <label>
                  <input type='radio' id='businessType' name='businessType' onChange={this.updateState}
                    checked={payee.businessType === 'B2B'} value='B2B' />
                  {resource.business_type_b2b}
                </label>

                <label>
                  <input type='radio' id='businessType' name='businessType' onChange={this.updateState}
                    checked={payee.businessType === 'B2C'} value='B2C' />
                  {resource.business_type_b2c}
                </label>

                <label>
                  <input type='radio' id='businessType' name='businessType' onChange={this.updateState}
                    checked={payee.businessType === 'BOTH'} value='BOTH' />
                  {resource.business_type_both}
                </label>
              </div>
            </div>
          </div>
          <footer>
            {this.editable &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
                {resource.save}
              </button>}
          </footer>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    payee: payeeSelector.selectFormData(state)
  };
}

function mapDispatchToProps(dispatch): EditDispatchProps<Payee, string> {
  return {
    setGlobalState: (data) => dispatch(updateGlobalState(data)),
    load: (data) => dispatch(getPayee(data)),
    update: (data) => dispatch(updatePayee(data)),
    insert: (data) => dispatch(insertPayee(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const PayeeForm = compose(
  withStore,
  withConnect
)(PayeeComponent);

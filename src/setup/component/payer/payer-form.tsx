import * as React from 'react';
import {HistoryProps} from 'react-onex';
import {connect} from 'react-redux';
import {EditDispatchProps, ReduxEditComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer, updateGlobalState} from 'redux-plus';
import {ViewGlobalStateSelector} from 'reselect-plus';
import {alertError, confirm} from 'ui-alert';
import {formatter} from 'ui-plus';
import {showToast} from 'ui-toast';
import {emailOnBlur, faxOnBlur, getLocale, Locale, phoneOnBlur, storage} from 'uione';
import {payerModel} from '../../metadata/PayerModel';
import {Payer} from '../../model/Payer';
import {getPayer, insertPayer, updatePayer} from './payerActions';

export const PAYER_FORM = 'payerForm';

interface InternalProps {
  payer: Payer;
}

type PayerPropsType = InternalProps & EditDispatchProps<Payer, string> & HistoryProps;

export class PayerComponent extends ReduxEditComponent<Payer, string, PayerPropsType, any> {
  constructor(props) {
    super(props, payerModel, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.patchable = false;
    this.state = {
      payer: {},
      date: new Date()
    };
  }

  createModel(): Payer {
    const payer = super.createModel();
    payer.entityType = 'R';
    return payer;
  }
  getModel(): Payer {
    const payer = super.getModel();
    // const data = typeof(payer.maxAtmPtrn) === 'string' ? payer.maxAtmPtrn.split(',').join('') : payer.maxAtmPtrn;
    // payer.maxAtmPtrn = parseFloat(data);
    // payer.webConfirmation = 0;
    return payer;
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
    const { payer } = this.props;

    return (
      <div className='view-container'>
        <form id={PAYER_FORM} name={PAYER_FORM} model-name='payer' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{this.newMode ? resource.create : resource.edit} {resource.payer}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.company_name}
              <input
                type='text'
                id='entityName'
                name='entityName'
                value={payer.entityName}
                onChange={this.updateState}
                maxLength={255}
                required={true}
                placeholder={resource.company_name} />
            </label>

            <label className='col s12 m6'>
              {resource.short_name}
              <input
                type='text'
                id='shortName'
                name='shortName'
                value={payer.shortName}
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
                value={payer.companyId}
                onChange={this.updateState}
                maxLength={50}
                placeholder={resource.company_id} />
            </label>

            <label className='col s12 m6'>
              {resource.contact_phone}
              <input
                type='text'
                id='contactNo'
                name='contactNo'
                value={formatter.formatPhone(payer.contactNo)}
                onChange={this.updatePhoneState}
                onBlur={phoneOnBlur}
                maxLength={17}
                placeholder={resource.contact_phone} />
            </label>

            <label className='col s12'>
              {resource.address}
              <input
                type='text'
                id='add1'
                name='add1'
                value={payer.add1}
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
                value={payer.add2}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.placeholder_address2} />

              <input
                type='text'
                id='add3'
                name='add3'
                value={payer.add3}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.placeholder_address3} />
            </label>

            <label className='col s12 m6 l3'>
              {resource.postcode}
              <input
                type='text'
                id='postalCode'
                name='postalCode'
                value={payer.postalCode}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.postcode} />
            </label>

            <label className='col s12 m6 l3'>
              {resource.state}
              <input
                type='text'
                id='stateName'
                name='stateName'
                value={payer.stateName}
                onChange={this.updateState}
                maxLength={255}
                placeholder={resource.state} />
            </label>

            <label className='col s12 m6 l3'>
              {resource.country}
              <input
                type='text'
                value='THAILAND'
                required={true}
                disabled={true} />
            </label>

            <label className='col s12 m6 l3'>
              {resource.contact_name}
              <input
                type='text'
                id='contactName'
                name='contactName'
                onChange={this.updateState}
                value={payer.contactName}
                maxLength={255}
                required={true}
                placeholder={resource.contact_name} />
            </label>

            <label className='col s12 m6 l3'>
              {resource.contact_fax}
              <input
                type='text'
                id='faxNo'
                name='faxNo'
                onChange={this.updatePhoneState}
                onBlur={faxOnBlur}
                value={formatter.formatFax(payer.faxNo)}
                maxLength={12}
                placeholder={resource.contact_fax} />
            </label>

            <label className='col s12 m6 l3'>
              {resource.mobile_phone_number}
              <input
                type='text'
                id='mobilePhone'
                name='mobilePhone'
                value={formatter.formatPhone(payer.mobilePhone)}
                onBlur={phoneOnBlur}
                onChange={this.updatePhoneState}
                maxLength={17}
                placeholder={resource.mobile_phone_number} />
            </label>

            <label className='col s12 m12 l6'>
              {resource.email}
              <input
                type='text'
                id='emailAdd'
                name='emailAdd'
                data-type='email'
                value={payer.emailAdd}
                onChange={this.updateState}
                onBlur={emailOnBlur}
                maxLength={255}
                required={true}
                placeholder={resource.email} />
            </label>
            <label className='col s12 m6 checkbox-container'>
              <input type='checkbox' id='entityType' name='entityType'
                value={payer.entityType}
                checked={payer.entityType === 'E'}
                onChange={this.updateState}
                data-on-value='E'
                data-off-value='R'
              />
              {resource.payer_set_as_payee}
            </label>
            <label className='col s12 m6 checkbox-container'>
              <input type='checkbox'
                id='pymtAccCtl' name='pymtAccCtl'
                onChange={this.updateState}
                checked={payer.pymtAccCtl ? true : false}
              />
              {resource.payer_pymt_acc_ctl}
            </label>
            <div className='col s12 m6 radio-section'>
              {resource.payer_payment_confirm}
              <div className='radio-group row'>
                <label className='col s12'>{resource.placeholder_no_payment_confirm}
                  <input type='radio' id='paymentConfirm' name='paymentConfirm' onChange={this.updateState}
                    checked={payer.paymentConfirm === 'NoPayment'} value='NoPayment' />
                </label>

                <label className='col s12'>{resource.placeholder_payment_confirm_for_all}
                  <input type='radio' id='paymentConfirm' name='paymentConfirm' onChange={this.updateState}
                    checked={payer.paymentConfirm === 'PaymentAll'} value='PaymentAll' />
                </label>

                <label className='col s12'>{resource.placeholder_payment_confirm_with_amount}
                  <input type='radio' id='paymentConfirm' name='paymentConfirm' onChange={this.updateState}
                    checked={payer.paymentConfirm === 'PaymentWithAmount'} value='PaymentWithAmount' />
                  <input
                    type='tel'
                    id='maxAtmPtrn'
                    name='maxAtmPtrn'
                    className='text-right currency-unit'
                    data-type='currency'
                    onChange={this.updateState}
                    onBlur={this.currencyOnBlur}
                    onFocus={this.currencyOnFocus}
                    defaultValue={this.formatCurrency(payer.maxAtmPtrn)}
                    maxLength={30}
                    disabled={payer.paymentConfirm !== 'PaymentWithAmount'}
                    placeholder={resource.payment_amount_max} />
                  <span className='suffix-value'>{resource.bath}</span>
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

const payerSelector = new ViewGlobalStateSelector(PAYER_FORM);

function mapStateToProps(state) {
  return {
    payer: payerSelector.selectFormData(state)
  };
}

function mapDispatchToProps(dispatch): EditDispatchProps<Payer, string> {
  return {
    setGlobalState: (data) => dispatch(updateGlobalState(data)),
    load: (data) => dispatch(getPayer(data)),
    update: (data) => dispatch(updatePayer(data)),
    insert: (data) => dispatch(insertPayer(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const PayerForm = compose(
  withStore,
  withConnect
)(PayerComponent);

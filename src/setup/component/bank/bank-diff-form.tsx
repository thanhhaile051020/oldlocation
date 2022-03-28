import * as React from 'react';
import {connect} from 'react-redux';
import {DiffApprDispatchProps, DiffApprPropsType, ReduxDiffApprComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {DiffSelector} from 'reselect-plus';
import {alertError} from 'ui-alert';
import {formatter} from 'ui-plus';
import {showToast} from 'ui-toast';
import {storage} from 'uione';
import {bankModel} from '../../metadata/BankModel';
import {Bank} from '../../model/Bank';
import {diff, updateApprove, updateReject} from './bankActions';
import {bankEpics} from './BankObservableEpics';

export const BANK_DIFF_FORM = 'bankDiffForm';

class BankDiffComponent extends ReduxDiffApprComponent<Bank, string, DiffApprPropsType<Bank, string>, any> {
  constructor(props) {
    super(props, bankModel, storage.resource(), showToast, alertError, storage.loading());
    this.state = {
      isDisable: false,
      origin: {},
      value: {}
    };
  }

  renderFields = [
    {resourceKey: 'bank_name', name: 'bankName'},
    {resourceKey: 'bank_short_name', name: 'bankShortName'},
    {resourceKey: 'bank_branch_id', name: 'branchId'},
    {resourceKey: 'address', name: 'add1'},
    {resourceKey: 'address', name: 'add2'},
    {resourceKey: 'address', name: 'add3'},
    {resourceKey: 'postcode', name: 'postalCode'},
    {resourceKey: 'state', name: 'stateName'},
    {resourceKey: 'country', name: 'countryCode'},
    {resourceKey: 'bank_base_currency', name: 'baseCcyCode'},
    {resourceKey: 'contact_name', name: 'contactName'},
    {resourceKey: 'contact_phone', name: 'contactNo'},
    {resourceKey: 'contact_fax', name: 'faxNo'},
    {resourceKey: 'email', name: 'emailAdd'},
    {resourceKey: 'bank_host_bank', name: 'hostBankFlag'},
    {resourceKey: 'password_delivery_method', name: 'passwordDeliveryMethod'},
  ];

  formatFields(value: Bank): Bank {
    const passwordDeliveryMethod =  value && value.passwordDeliveryMethod  && value.passwordDeliveryMethod === 'P' ? 'Pinmailer' : '' ||
                                    value.passwordDeliveryMethod === 'E' ? 'Email Without Challenge' : '' ||
                                    value.passwordDeliveryMethod === 'C' ? 'Email With Challenge' : '';
    const hostBankFlag = value && value.hostBankFlag  && value.hostBankFlag === 'Y' ? 'Enable Host Bank' : 'None Host Bank';
    const contactNo = value && value.contactNo  && formatter.formatPhone(value.contactNo.toString()) || '';
    const faxNo = value && value.faxNo && formatter.formatPhone(value.faxNo.toString()) || '';
    const countryCode = value && value.countryCode && value.countryCode === 'TH' ? 'THAILAND' : 'THAILAND' || '';
    const baseCcyCode = value && value.baseCcyCode && value.baseCcyCode === 'THB' ? 'Thai Bath' : 'Thai Bath' || '';
    const bankName = value && value.bankName || '';
    const bankShortName = value && value.bankShortName || '';
    const branchId = value && value.branchId || '';
    const stateName = value && value.stateName  || '';
    const contactName = value && value.contactName  || '';
    const emailAdd = value && value.emailAdd  || '';
    const postalCode = value && value.postalCode  || '';
    const add1 = value && value.add1  || '';
    const add2 = value && value.add2  || '';
    const add3 = value && value.add3  || '';
    return {...value, passwordDeliveryMethod, hostBankFlag, contactNo, faxNo, countryCode, baseCcyCode, bankName, bankShortName, branchId, stateName, contactName, emailAdd, postalCode, add1, add2, add3};
  }

  render() {
    const resource = this.resource;
    const { disabled } = this.state;
    const { diffModel = null } = this.props;
    const value = (diffModel && diffModel.value ? diffModel.value : {});
    const origin = (diffModel && diffModel.origin ? diffModel.origin : {});
    return (
      <div className='view-container'>
        <form id={BANK_DIFF_FORM} name={BANK_DIFF_FORM} model-name='bank' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{resource.bank}</h2>
          </header>
          <div className='diff'>
            <h4>
              <span>{resource.field}</span>
              <span>{resource.old_data_subject}</span>
              <span>{resource.new_data_subject}</span>
            </h4>
            {this.renderFields && this.renderFields.map((item, i) => {
              return (
                <p key={i} data-field={item.name}>
                  <label>{resource[item.resourceKey]}</label><span>{origin[item.name]}</span><span>{value[item.name]}</span>
                </p>
              );
            })}
          </div>
          <footer>
            <button type='submit' id='btnApprove' name='buttonApprove' onClick={this.approve} disabled={disabled}>
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

const bankDiffSelector = new DiffSelector(BANK_DIFF_FORM);

function mapStateToProps(state) {
  return {
    diffModel: bankDiffSelector.selectDiff(state)
  };
}

function mapDispatchToProps(dispatch): DiffApprDispatchProps<Bank, string> {
  return {
    diff: (data) => dispatch(diff(data)),
    approve: (data) => dispatch(updateApprove(data)),
    reject: (data) => dispatch(updateReject(data)),
  };
}

const withStore = withReducer(bankEpics, BANK_DIFF_FORM);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const BankDiffForm = compose(
  withStore,
  withConnect
)(BankDiffComponent);

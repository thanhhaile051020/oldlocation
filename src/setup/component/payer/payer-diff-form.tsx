import * as React from 'react';
import {Diff} from 'react-diff-x';
import {connect} from 'react-redux';
import {DiffApprDispatchProps, DiffApprPropsType, ReduxDiffApprComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {DiffSelector} from 'reselect-plus';
import {alertError} from 'ui-alert';
import {formatter} from 'ui-plus';
import {showToast} from 'ui-toast';
import {storage} from 'uione';
import {payerModel} from '../../metadata/PayerModel';
import {Payer} from '../../model/Payer';
import {approvePayer, checkPayer, rejectPayer} from './payerActions';
import {payerEpics} from './PayerObservableEpics';

export const PAYER_DIFF_FORM = 'payerDiffForm';

class PayerDiffComponent extends ReduxDiffApprComponent<Payer, any, DiffApprPropsType<Payer, any>, any> {
  constructor(props) {
    super(props, payerModel, storage.resource(), showToast, alertError, storage.loading());
    this.state = {
      origin: {},
      value: {}
    };
  }

  renderFields = [
    {resourceKey: 'company_name', name: 'entityName'},
    {resourceKey: 'short_name', name: 'shortName'},
    {resourceKey: 'company_id', name: 'companyId'},
    {resourceKey: 'contact_phone', name: 'contactNo'},
    {resourceKey: 'address', name: 'add1'},
    {resourceKey: 'address', name: 'add2'},
    {resourceKey: 'address', name: 'add3'},
    {resourceKey: 'postcode', name: 'postalCode'},
    {resourceKey: 'state', name: 'stateName'},
    {resourceKey: 'country', name: 'countryCode'},
    {resourceKey: 'contact_name', name: 'contactName'},
    {resourceKey: 'contact_fax', name: 'faxNo'},
    {resourceKey: 'mobile_phone_number', name: 'mobilePhone'},
    {resourceKey: 'payer_payment_confirm', name: 'authMethod'},
    {resourceKey: 'email', name: 'emailAdd'},
    {resourceKey: 'payer_set_as_payee', name: 'entityType'},
    {resourceKey: 'payer_pymt_acc_ctl', name: 'pymtAccCtl'}
  ];

  formatFields(value) {
    const resource = this.resource;
    const authMethod = value && value.authMethod && value.authMethod === 'NoPayment' ? resource.placeholder_no_payment_confirm : '' ||
          value.authMethod === 'PaymentAll' ? resource.placeholder_payment_confirm_for_all : '' ||
          value.authMethod === 'PaymentWithAmount' ? resource.placeholder_payment_confirm_with_amount : '';
    const contactNo = value && value.contactNo  && formatter.formatPhone(value.contactNo.toString()) || '';
    const companyId = value && value.companyId  || '';
    const entityType = value && value.entityType === 'E' ? 'Set as Payee' : '' ;
    const countryCode = value && value.countryCode && value.countryCode === 'TH' ? 'THAILAND' : 'THAILAND' || '';
    const add1 = value && value.add1  || '';
    const add2 = value && value.add2  || '';
    const add3 = value && value.add3  || '';
    const stateName = value && value.stateName  || '';
    const pymtAccCtl = value && value.pymtAccCtl  || '';
    return {...value, authMethod, companyId, contactNo, entityType, countryCode, add1, add2, add3, stateName, pymtAccCtl};
  }

  render() {
    const resource = this.resource;
    const { diffModel } = this.props;
    const { disabled } = this.state;
    return (
      <div className='view-container'>
        <form id={PAYER_DIFF_FORM} name={PAYER_DIFF_FORM} ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{resource.payer}</h2>
          </header>
          <Diff origin= {diffModel.origin ? diffModel.origin : {}} value= {diffModel.value ? diffModel.value : {}} resource={resource} renderFields={this.renderFields} />
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

const payerDiffSelector = new DiffSelector(PAYER_DIFF_FORM);

function mapStateToProps(state) {
  return {
    diffModel: payerDiffSelector.selectDiff(state)
  };
}

function mapDispatchToProps(dispatch): DiffApprDispatchProps<Payer, any> {
  return {
    diff: (data) => dispatch(checkPayer(data)),
    approve: (data) => dispatch(approvePayer(data)),
    reject: (data) => dispatch(rejectPayer(data)),
  };
}

const withStore = withReducer(payerEpics, PAYER_DIFF_FORM);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const PayerDiffForm = compose(
  withStore,
  withConnect
)(PayerDiffComponent);

import * as React from 'react';
import {Diff} from 'react-diff-x';
import {DiffState} from 'react-onex';
import {connect} from 'react-redux';
import {DiffApprDispatchProps, DiffApprPropsType, ReduxDiffApprComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer} from 'redux-plus';
import {DiffSelector} from 'reselect-plus';
import {alertError} from 'ui-alert';
import {formatter} from 'ui-plus';
import {showToast} from 'ui-toast';
import {storage} from 'uione';
import {payeeModel} from '../../metadata/PayeeModel';
import {Payee} from '../../model/Payee';
import {PAYEE_DIFF_FORM} from './Constants';
import {approvePayee, checkPayee, rejectPayee} from './payeeActions';

class PayeeDiffComponent extends ReduxDiffApprComponent<Payee, any, DiffApprPropsType<Payee, any>, DiffState<Payee>> {
  constructor(props) {
    super(props, payeeModel, storage.resource(), showToast, alertError, storage.loading());
    this.state = {
      origin: {},
      value: {}
    };
  }

  renderFields = [
    {resourceKey: 'company_name', name: 'entityName'},
    {resourceKey: 'short_name', name: 'shortName'},
    {resourceKey: 'company_id', name: 'companyId'},
    {resourceKey: 'payment_amount_max', name: 'maxAtmPtrn'},
    {resourceKey: 'address', name: 'add1'},
    {resourceKey: 'address', name: 'add2'},
    {resourceKey: 'address', name: 'add3'},
    {resourceKey: 'postcode', name: 'postalCode'},
    {resourceKey: 'state', name: 'stateName'},
    {resourceKey: 'country', name: 'countryCode'},
    {resourceKey: 'contact_name', name: 'contactName'},
    {resourceKey: 'contact_phone', name: 'contactNo'},
    {resourceKey: 'contact_fax', name: 'faxNo'},
    {resourceKey: 'mobile_phone_number', name: 'mobilePhone'},
    {resourceKey: 'email', name: 'emailAdd'},
    {resourceKey: 'entity_type', name: 'entityType'},
    {resourceKey: 'business_type', name: 'businessType'},
    {resourceKey: 'acted_by', name: 'actedBy'},
    {resourceKey: 'action_date', name: 'actionDate'},
    {resourceKey: 'ctrl_status', name: 'ctrlStatus'},
    {resourceKey: 'created_date', name: 'createdDate'},
  ];

  formatFields(value) {
    const maxAtmPtrn = value && value.maxAtmPtrn  && formatter.formatPhone(value.maxAtmPtrn.toString()) || '';
    const contactNo = value && value.contactNo  && formatter.formatPhone(value.contactNo.toString()) || '';
    const faxNo = value && value.faxNo && formatter.formatPhone(value.faxNo.toString()) || '';
    const companyId = value && value.companyId  || '';
    const postalCode = value && value.postalCode  || '';
    const stateName = value && value.stateName  || '';
    const mobilePhone = value && value.mobilePhone && formatter.formatPhone(value.mobilePhone.toString()) || '';

    return {...value, maxAtmPtrn, contactNo, faxNo, mobilePhone, companyId, postalCode, stateName};
  }

  render() {
    const resource = this.resource;
    const { disabled } = this.state;
    const { diffModel } = this.props;
    return (
      <div className='view-container'>
        <form id={PAYEE_DIFF_FORM} name={PAYEE_DIFF_FORM} ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{resource.payee}</h2>
          </header>
          <Diff origin= {diffModel.origin ? diffModel.origin : {}} value= {diffModel.value ? diffModel.value : {}} resource={resource} renderFields={this.renderFields} />
          <footer>
            <button type='button' id='btnApprove' name='btnApprove' onClick={this.approve} disabled={disabled}>
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

const payeeDiffSelector = new DiffSelector(PAYEE_DIFF_FORM);

function mapStateToProps(state) {
  return {
    diffModel: payeeDiffSelector.selectDiff(state)
  };
}

function mapDispatchToProps(dispatch): DiffApprDispatchProps<Payee, number> {
  return {
    diff: (data) => dispatch(checkPayee(data)),
    approve: (data) => dispatch(approvePayee(data)),
    reject: (data) => dispatch(rejectPayee(data)),
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const PayeeDiffForm = compose(
  withStore,
  withConnect
)(PayeeDiffComponent);

import * as React from 'react';
import {Diff} from 'react-diff-x';
import {connect} from 'react-redux';
import {DiffApprDispatchProps, DiffApprPropsType, ReduxDiffApprComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {DiffSelector} from 'reselect-plus';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {storage} from 'uione';
import {externalSysModel} from '../../metadata/ExternalSysModel';
import {ExternalSys} from '../../model/ExternalSys';
import {approveExternalSystem, checkExternalSystem, rejectExternalSystem} from './ExternalSystemAction';
import {externalSysEpics} from './ExternalSystemObservableEpics';

export const EXTERNALSYSTEM_DIFF_FORM = 'externalSystemDiffForm';

class ExternalSystemDiffComponent extends ReduxDiffApprComponent<ExternalSys, string, DiffApprPropsType<ExternalSys, string>, any> {
  constructor(props) {
    super(props, externalSysModel, storage.resource(), showToast, alertError, storage.loading());
    this.state = {
      isDisable: false,
      origin: {},
      value: {}
    };
  }

  renderFields = [
    {resourceKey: 'externalsys_name', name: 'esSysName'},
    {resourceKey: 'externalsys_short_name', name: 'esSysShortName'},
    {resourceKey: 'externalsys_url_entry', name: 'esUrl'},
    {resourceKey: 'externalsys_logout_url_entry', name: 'logoutUrl'},
    {resourceKey: 'externalsys_sign_on_approach_entry', name: 'signOnApproach'},
    {resourceKey: 'externalsys_acc_validation_entry', name: 'accValidation'},
    {resourceKey: 'externalsys_external_reference_number', name: 'exRefDup'},
    {resourceKey: 'externalsys_payment_effective_date_control', name: 'payDateCtl'}
  ];

  formatFields(value) {
    const signOnApproach = value.signOnApproach === 'dso' ? 'Double Sign On (DSO)' : '' || value.signOnApproach === 'sso' ? 'Single Sign On (SSO)' : '';
    const accValidation = value.accValidation === 'T' ? 'YES' : '' || value.accValidation === 'F' ? 'NO' : '';
    const exRefDup = value.exRefDup === 'F' ? 'Disallow Conditional Duplication' : '' || value.exRefDup === 'T' ? 'Allow Conditional Duplication' : '';
    const payDateCtl = value.payDateCtl === 'T' ? 'YES' : '' || value.payDateCtl === 'F' ? 'NO' : '';
    return {...value, signOnApproach, accValidation, exRefDup, payDateCtl};
  }

  render() {
    const resource = this.resource;
    const { diffModel } = this.props;
    const { disabled } = this.state;
    return (
      <div className='view-container'>
        <form id={EXTERNALSYSTEM_DIFF_FORM} name={EXTERNALSYSTEM_DIFF_FORM} ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{resource.externalsys_subject}</h2>
          </header>
          <Diff origin= {diffModel.origin ? diffModel.origin : {}} value= {diffModel.value ? diffModel.value : {}} resource={resource} renderFields={this.renderFields} />
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

const externalSystemDiffSelector = new DiffSelector(EXTERNALSYSTEM_DIFF_FORM);


function mapStateToProps(state) {
  return {
    diffModel: externalSystemDiffSelector.selectDiff(state)
  };
}

function mapDispatchToProps(dispatch): DiffApprDispatchProps<ExternalSys, string> {
  return {
    diff: (data) => dispatch(checkExternalSystem(data)),
    approve: (data) => dispatch(approveExternalSystem(data)),
    reject: (data) => dispatch(rejectExternalSystem(data)),
  };
}

const withStore = withReducer(externalSysEpics, EXTERNALSYSTEM_DIFF_FORM);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const ExternalSystemDiffForm = compose(
  withStore,
  withConnect
)(ExternalSystemDiffComponent);

import * as React from 'react';
import {HistoryProps} from 'react-onex';
import {connect} from 'react-redux';
import {EditDispatchProps, ReduxEditComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer, updateGlobalState} from 'redux-plus';
import {ViewGlobalStateSelector} from 'reselect-plus';
import {alertError, confirm} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, storage} from 'uione';
import {urlOnBlur} from 'uione';
import {externalSysModel} from '../../metadata/ExternalSysModel';
import {ExternalSys} from '../../model/ExternalSys';
import {getExternalSystem, insertExternalSystem, updateExternalSystem} from './ExternalSystemAction';

export const EXTERNALSYSTEM_FORM = 'externalSystemForm';

interface InternalProps {
  externalSys: ExternalSys;
}

type ExternalSystemPropsType = InternalProps & EditDispatchProps<ExternalSys, string> & HistoryProps;

export class ExternalSystemComponent extends ReduxEditComponent<ExternalSys, string, ExternalSystemPropsType, any> {
  constructor(props) {
    super(props, externalSysModel, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.patchable = false;
    this.state = {
      externalSys: {},
      date: new Date()
    };
  }

  createModel(): ExternalSys {
    const externalSys = super.createModel();
    const now = new Date();
    externalSys.esId = now.getFullYear().toString() + now.getMonth().toString() + now.getDate().toString() +
        now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
    externalSys.accValidation = 'T';
    externalSys.exRefDup = 'F';
    externalSys.payDateCtl = 'T';
    externalSys.allStatus = 'F';
    externalSys.signOnApproach = 'dso';
    return externalSys;
  }

  render() {
    const resource = this.resource;
    const {externalSys} = this.props;
    return (
        <div className='view-container'>
          <form id={EXTERNALSYSTEM_FORM} name={EXTERNALSYSTEM_FORM} model-name='externalSys' ref={this.ref}>
            <header>
              <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
              <h2>{this.newMode ? resource.create : resource.edit } {resource.externalsys_subject}</h2>
            </header>
            <div className='row'>
              <label className='col s12 m6'>
                {resource.externalsys_name}
                <input type='text'
                       id='esSysName' name='esSysName'
                       value={externalSys.esSysName}
                       onChange={this.updateState}
                       maxLength={240} required={true}
                       placeholder={resource.externalsys_name} />
              </label>
              <label className='col s12 m6'>
                {resource.externalsys_short_name}
                <input type='text'
                       id='esSysShortName' name='esSysShortName'
                       value={externalSys.esSysShortName}
                       onChange={this.updateState}
                       maxLength={20} required={true}
                       placeholder={resource.externalsys_short_name} />
              </label>
              <label className='col s12 m6'>
                {resource.externalsys_url_entry}
                <input type='url'
                       id='esUrl' name='esUrl'
                       value={externalSys.esUrl}
                       onChange={this.updateState}
                       onBlur={urlOnBlur}
                       maxLength={256}
                       placeholder={resource.externalsys_url_entry} />
              </label>
              <label className='col s12 m6'>
                {resource.externalsys_logout_url_entry}
                <input type='url'
                       id='logoutUrl' name='logoutUrl'
                       value={externalSys.logoutUrl}
                       onChange={this.updateState}
                       onBlur={urlOnBlur}
                       maxLength={256}
                       placeholder={resource.externalsys_logout_url_entry} />
              </label>
              <div className='col s12 m6 radio-section'>
                {resource.externalsys_acc_validation_entry}
                <div className='radio-group'>
                  <label>
                    <input type='radio' id='accValidation' name='accValidation' onChange={this.updateState}
                           value='T' checked={externalSys.accValidation === 'T'}/>
                    {resource.yes}
                  </label>
                  <label>
                    <input type='radio' id='accValidation' name='accValidation' onChange={this.updateState}
                           value='F' checked={externalSys.accValidation === 'F'}/>
                    {resource.no}
                  </label>
                </div>
              </div>
              <div className='col s12 m6 radio-section'>
                {resource.externalsys_payment_effective_date_control}
                <div className='radio-group'>
                  <label>
                    <input type='radio' id='payDateCtl' name='payDateCtl' onChange={this.updateState}
                           value='T' checked={externalSys.payDateCtl === 'T'}/>
                    {resource.yes}
                  </label>
                  <label>
                    <input type='radio' id='payDateCtl' name='payDateCtl' onChange={this.updateState}
                           value='F' checked={externalSys.payDateCtl === 'F'}/>
                    {resource.no}
                  </label>
                </div>
              </div>
              <div className='col s12 m12 l6 radio-section'>
                {resource.externalsys_sign_on_approach_entry}
                <div className='radio-group'>
                  <label>
                    <input type='radio' id='signOnApproach' name='signOnApproach' onChange={this.updateState}
                           value='dso' checked={externalSys.signOnApproach === 'dso'}/>
                    {resource.externalsys_double_sign_on}
                  </label>
                  <label>
                    <input type='radio' id='signOnApproach' name='signOnApproach' onChange={this.updateState}
                           value='sso' checked={externalSys.signOnApproach === 'sso'}/>
                    {resource.externalsys_single_sign_on}
                  </label>
                </div>
              </div>
              <div className='col s12 m12 l6 radio-section'>
                {resource.externalsys_external_reference_number}
                <div className='radio-group'>
                  <label>
                    <input type='radio' id='exRefDup' name='exRefDup' onChange={this.updateState}
                           value='F' checked={externalSys.exRefDup === 'F'}/>
                    {resource.externalsys_disallow_conditional_duplication}
                  </label>
                  <label>
                    <input type='radio' id='exRefDup' name='exRefDup' onChange={this.updateState}
                           value='T' checked={externalSys.exRefDup === 'T'}/>
                    {resource.externalsys_allow_conditional_duplication}
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

const externalSystemSelector = new ViewGlobalStateSelector(EXTERNALSYSTEM_FORM);

function mapStateToProps(state) {
  return {
    externalSys: externalSystemSelector.selectFormData(state)
  };
}

function mapDispatchToProps(dispatch): EditDispatchProps<ExternalSys, string> {
  return {
    setGlobalState: (data) => dispatch(updateGlobalState(data)),
    load: (data) => dispatch(getExternalSystem(data)),
    update: (data) => dispatch(updateExternalSystem(data)),
    insert: (data) => dispatch(insertExternalSystem(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const ExternalSystemForm = compose(
  withStore,
  withConnect
)(ExternalSystemComponent);

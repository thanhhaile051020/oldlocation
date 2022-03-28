import * as React from 'react';
import {DiffFields} from 'react-diff-x';
import {buildId} from 'react-onex';
import {connect} from 'react-redux';
import {DiffApprDispatchProps, DiffApprPropsType, ReduxDiffApprComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {DiffSelector} from 'reselect-plus';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {storage} from 'uione';
import {applicationContext} from '../../config/ApplicationContext';
import {transactionFeeSetupModel} from '../../metadata/TransactionFeeSetupModel';
import {TransactionFeeSetup} from '../../model/TransactionFeeSetup';
import {ReflectionUtil} from './ReflectionUtil';
import {ChargingPayeeCheck} from './transaction-fee-detail-form/charge-to-payee-check/charging-payee-check';
import {ChargingPayerCheck} from './transaction-fee-detail-form/charge-to-payer-check/charging-payer';
import {approveTransactionFee, checkTransactionFee, rejectTransactionFee} from './transactionFeeAction';
import {transactionFeeEpics} from './TransasctionFeeObservableEpics';

export const TRANSACTION_FEE_DIFF_FORM = 'transactionFeeDiffForm';

class TransactionFeeDiffComponent extends ReduxDiffApprComponent<TransactionFeeSetup, number, DiffApprPropsType<TransactionFeeSetup, number>, any> {
  constructor(props) {
    super(props, transactionFeeSetupModel, storage.resource(), showToast, alertError, storage.loading());
    this.state = {
      debitAccounts: [],
      rules: [],
      oldExternalName: '',
      oldPayeeName: '',
      newExternalName: '',
      newPayeeName: '',
      externalSystems: [],
      payees: [],
    };
  }

  renderFields = [
    { resourceKey: 'externalsys_name', name: 'esId' },
    { resourceKey: 'payee_name', name: 'payeeId' },
    { resourceKey: 'transaction_fee_setup_form_location', name: 'zoneType' },
    { resourceKey: 'user_type', name: 'userType' },
    { resourceKey: 'transaction_fee_setup_form_charge_type', name: 'chargeType' }
  ];

  private readonly payeeService = applicationContext.payeeService;
  private readonly externalSysService = applicationContext.externalSysService;
  private readonly masterDataService = applicationContext.masterDataService;

  getKeyValue(objs, key, value) {
    return objs.map(item => {
      return { value: item[key], text: item[value] };
    });
  }

  load(id: number) {
    Promise.all([
      this.masterDataService.getDefaultAcounts(),
      this.masterDataService.getTransactionFeeRules(),
      this.payeeService.all(),
      this.externalSysService.all(),
    ]).then(values => {
      const [
        debitAccounts,
        rules,
        xpayees,
        xexternalSystems,
      ] = values;
      const externalSystems = this.getKeyValue(xexternalSystems, 'esId', 'esSysName');
      const payees = this.getKeyValue(xpayees, 'entityId', 'entityName');
      this.setState(prevState => ({
        externalSystems,
        payees,
        debitAccounts,
        rules
      }), () => super.load(id));
    }).catch(this.handleError);
    /*
    zip(
      this.masterDataService.getDefaultAcounts(),
      this.masterDataService.getTransactionFeeRules(),
      this.payeeService.all(),
      this.externalSysService.all(),
    ).subscribe(([
      debitAccounts,
      rules,
      payees,
      externalSystems,
    ]) => {
      externalSystems = this.getKeyValue(externalSystems, 'esId', 'esSysName');
      payees = this.getKeyValue(payees, 'entityId', 'entityName');
      this.setState(prevState => ({
        externalSystems,
        payees,
        debitAccounts,
        rules
      }), this.loadData);
    }, this.handleError);
    */
  }

  formatFields = (value): TransactionFeeSetup => {
    if (!this.isEmpty(value)) {
      const externalItem = this.state.externalSystems.find(item => item.value === value.esId);
      const payeeItem = this.state.payees.find(item => item.value === value.payeeId);
      value.esId = !!externalItem ? externalItem.text : '';
      value.payeeId = !!payeeItem ? payeeItem.text : '';
      value.zoneType = value.zoneType === 'B' ? 'Both' : (value.zoneType === 'D' ? 'Different Zone' : (value.zoneType === 'S' ? 'Same Zone' : value.zoneType));
      value.userType = value.userType === 'T' ? 'Consumer' : (value.userType === 'F' ? 'Not Consumer' : value.userType);
      value.chargeType = value.chargeType === 'W' ? 'Waive' : (value.chargeType === 'R' ? 'Charge to Payer' : (value.chargeType === 'E' ? 'Charge to Payee' : value.chargeType));
    }
    return value;
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  getStyleDifferent = (diffObject, field) => {
    if (diffObject === undefined ||
      diffObject === null ||
      this.isEmpty(diffObject)) {
      return '';
    }
    if (diffObject[field] !== undefined) {
      return ' highlight ';
    } else {
      return '';
    }
  }

  renderDetailForm(valueForm, showFull, resource, nameType, differentObject) {
    const isHighlight = this.getStyleDifferent(differentObject, 'chargeType');
    if (this.isEmpty(valueForm)) {
      return null;
    }
    const locale = storage.getLocale();
    return (
      <React.Fragment>
        <div className={'col s12 m12 ' + (showFull ? 'l12' : 'l6')}>
          {valueForm.chargeType === 'Charge to Payee'
            && <ChargingPayeeCheck
              valueForm={valueForm.transactionFeeSetupDetail}
              valueForm1={valueForm}
              resource={resource}
              locale={locale}
              this={this}
              isHighlight={isHighlight}
              getStyleDifferent={this.getStyleDifferent}
              debitAccounts={this.state.debitAccounts}
              differentObject={differentObject.transactionFeeSetupDetail === undefined ? {} : differentObject.transactionFeeSetupDetail}
              nameType={nameType} />}
          {valueForm.chargeType === 'Charge to Payer'
            && <ChargingPayerCheck
              valueForm={valueForm}
              getStyleDifferent={this.getStyleDifferent}
              resource={resource}
              locale={locale}
              isHighlight={isHighlight}
              this={this}
              differentObject={differentObject}
              nameType={nameType} />}
        </div>
      </React.Fragment>
    );
  }


  render() {
    const resource = this.resource;
    const { diffModel = null } = this.props;
    const { disabled } = this.state;
    const differentObject = ReflectionUtil.diff(diffModel.origin, diffModel.value);
    console.log('differentObject: ', differentObject);

    return (
      <div className='view-container'>
        <form id={TRANSACTION_FEE_DIFF_FORM}
          name={TRANSACTION_FEE_DIFF_FORM}
          model-name='transactionFeeSetup' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{resource.transaction_fee_setup_form_transaction_fee_setup_approve_reject}</h2>
          </header>
          <div className='diff'>
            <h4>
              <span>{resource.field}</span>
              <span>{resource.old_data_subject}</span>
              <span>{resource.new_data_subject}</span>
            </h4>
            <DiffFields origin= {diffModel.origin ? diffModel.origin : {}} value= {diffModel.value ? diffModel.value : {}}resource={resource} renderFields={this.renderFields} />
            <React.Fragment>
              <section className='row'>
                {this.renderDetailForm(diffModel.origin, this.isEmpty(diffModel.value), resource, resource.old_data_subject, differentObject)}
                {this.renderDetailForm(diffModel.value, this.isEmpty(diffModel.origin), resource, resource.new_data_subject, differentObject)}
              </section>
            </React.Fragment>
          </div>
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

const transactionFeeDiffSelector = new DiffSelector(TRANSACTION_FEE_DIFF_FORM);

function mapStateToProps(state) {
  return {
    diffModel: transactionFeeDiffSelector.selectDiff(state)
  };
}

function mapDispatchToProps(dispatch): DiffApprDispatchProps<TransactionFeeSetup, number> {
  return {
    diff: (data) => dispatch(checkTransactionFee(data)),
    approve: (data) => dispatch(approveTransactionFee(data)),
    reject: (data) => dispatch(rejectTransactionFee(data)),
  };
}

const withStore = withReducer(transactionFeeEpics, TRANSACTION_FEE_DIFF_FORM);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const TransactionFeeDiffForm = compose(
  withStore,
  withConnect
)(TransactionFeeDiffComponent);

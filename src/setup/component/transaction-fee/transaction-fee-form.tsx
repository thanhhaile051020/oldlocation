import {elements} from 'form-util';
import * as React from 'react';
import {buildId, HistoryProps} from 'react-onex';
import {connect} from 'react-redux';
import {EditDispatchProps, ReduxEditComponent} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer, updateGlobalState} from 'redux-plus';
import {ViewGlobalStateSelector} from 'reselect-plus';
import {alertError, confirm} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, Locale, storage} from 'uione';
import {applicationContext} from '../../config/ApplicationContext';
import {transactionFeeSetupModel} from '../../metadata/TransactionFeeSetupModel';
import {TransactionFeeSetup} from '../../model/TransactionFeeSetup';
import {TransactionFeeSetupRule} from '../../model/TransactionFeeSetupRule';
import {ChargingPayee} from './transaction-fee-form/charging-payee';
import {ChargingPayer} from './transaction-fee-form/charging-payer';
import {getTransactionFee, insertTransactionFee, updateTransactionFee} from './transactionFeeAction';

export const TRANSACTION_FEE_FORM = 'transactionFeeSetupForm';

interface InternalProps {
  transactionFeeSetup: any;
}

type TransactionFeePropsType = InternalProps & EditDispatchProps<TransactionFeeSetup, any> & HistoryProps;

export class TransactionFeeComponent extends ReduxEditComponent<TransactionFeeSetup, any, TransactionFeePropsType, any> {
  constructor(props) {
    super(props, transactionFeeSetupModel, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.formatCurrency = this.formatCurrency.bind(this);
    this.state = {
      externalSystems: [],
      payees: [],
      debitAccounts: [],
      rules: [],
      showAddRule: true,
      date: new Date()
    };
  }
  private readonly payeeService = applicationContext.apprPayeeService;
  private readonly externalSysService = applicationContext.apprExternalSysService;
  private readonly masterDataService = applicationContext.masterDataService;
  private readonly apprReceivingAccountService = applicationContext.apprReceivingAccountService;

  load(id: any) {
    Promise.all([
      this.masterDataService.getTransactionFeeRules(),
      this.payeeService.all(),
      this.externalSysService.all(),
    ]).then(values => {
      const [
        rules,
        xpayees,
        xexternalSystems,
      ] = values;
      const externalSystems = this.getKeyValue(xexternalSystems, 'esId', 'esSysName');
      const payees = this.getKeyValue(xpayees, 'entityId', 'entityName');
      this.setState(() => ({
        externalSystems,
        payees,
        rules
      }), () => super.load(id));
    }).then(this.handleError);
    /*
    zip(
      this.masterDataService.getTransactionFeeRules(),
      this.payeeService.all(),
      this.externalSysService.all(),
    ).subscribe(([
      rules,
      payees,
      externalSystems,
    ]) => {
      externalSystems = this.getKeyValue(externalSystems, 'esId', 'esSysName');
      payees = this.getKeyValue(payees, 'entityId', 'entityName');
      this.setState(() => ({
        externalSystems,
        payees,
        rules
      }), this.loadData);
    }, this.handleError);
    */
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
  getKeyValue(objs, key, value) {
    return objs.map(item => {
      return { value: item[key], text: item[value] };
    });
  }

  showModel = (model: TransactionFeeSetup) => {
    const newTempRule = new TransactionFeeSetupRule();
    newTempRule.chargeUom = '%';
    const obj = { ...model, tempRule: newTempRule };
    super.showModel(obj);
    const trans = this.props.transactionFeeSetup;
    if (!this.newMode && (trans.transactionFeeSetupDetail.ruleType === 'fix-per' || trans.transactionFeeSetupDetail.ruleType === 'ufc')) {
      trans.tempRule = trans.transactionFeeSetupRules[0];
      this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
    }
    this.getLoadPayee(this.props.transactionFeeSetup.payeeId);
  }

  onUpdateState = (e) => {
    // // When Charge Type changed. Update content to default.
    switch (e.target.name) {
      case 'chargeType':
        this.setDefaultChargeType();
        break;
      case 'postingType':
        this.setDefaultPostingType();
        break;
      case 'transFix':
        this.setDefaultTransFix();
        break;
      case 'postingOther':
        this.setDefaultPostingOther();
        break;
      case 'ruleType':
        this.setDefaultRuleType();
        break;
      default: break;
    }
    this.updateState(e);
  }


  convertStringToFloat(value): any {
    const data = typeof (value) === 'string' ? value.split(',').join('') : value;
    return parseFloat(data);
  }

  getModel(): TransactionFeeSetup {
    const trans = super.getModel();
    trans.transactionFeeSetupDetail.transMaxAmt = this.convertStringToFloat(trans.transactionFeeSetupDetail.transMaxAmt);
    trans.transactionFeeSetupDetail.transMinAmt = this.convertStringToFloat(trans.transactionFeeSetupDetail.transMinAmt);
    trans.transactionFeeSetupDetail.transFixAmt = this.convertStringToFloat(trans.transactionFeeSetupDetail.transFixAmt);
    // trans.transactionFeeSetupDetail.effectiveDate = moment(trans.transactionFeeSetupDetail.effectiveDate).format();

    trans.transactionFeeSetupRules = trans.transactionFeeSetupRules.map(rule => {
      rule.lowerLimit = this.convertStringToFloat(rule.lowerLimit);
      rule.upperLimit = this.convertStringToFloat(rule.upperLimit);
      rule.transCharge = this.convertStringToFloat(rule.transCharge);
      rule.limitRange = this.convertStringToFloat(rule.limitRange);
      rule.lvlMaxAmt = this.convertStringToFloat(rule.lvlMaxAmt);
      rule.lvlMinAmt = this.convertStringToFloat(rule.lvlMinAmt);
      return rule;
    });
    return trans;
  }


  onChangeSelect = (event) => {
    this.updateState(event);
    this.getLoadPayee(event.target.value);
  }

  validateSaveOnClick = (event) => {
    event.preventDefault();
    event.persist();
    let hasValue = false;
    const form = event.currentTarget.form;
    const controls = elements(form, ['lowerLimit', 'upperLimit', 'transCharge', 'lvlMinAmt', 'lvlMaxAmt']);
    for (const control of controls) {
      if (control.value !== '') {
        hasValue = true;
        break;
      }
    }
    const ruleType = this.props.transactionFeeSetup.transactionFeeSetupDetail.ruleType;
    if (hasValue && (ruleType === 'sb' || ruleType === 'tb')) {
      const title = this.resource.confirm;
      const confirmMsg = this.resource.msg_confirm_rule;
      storage.alert().confirm(confirmMsg, title, () => {
        this.afterSaveOnClick(event);
      });
    } else {
      this.afterSaveOnClick(event);
    }
  }

  afterSaveOnClick = (event) => {
    event.persist();
    const tempRule = this.props.transactionFeeSetup.tempRule;
    let trans = this.props.transactionFeeSetup;
    const tempRuleCopy = Object.assign({}, tempRule);
    if (tempRule !== undefined) {
      if (trans.transactionFeeSetupDetail.ruleType === 'fix-per' || trans.transactionFeeSetupDetail.ruleType === 'ufc') {
        trans.transactionFeeSetupRules = [];
        trans.transactionFeeSetupRules.push(tempRuleCopy);
      }
    }
    trans = this.removeByKey(trans, 'tempRule');
    this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
    this.setState({ showAddRule: false }, () => {
      const promise = new Promise((resolve, reject) => {
        this.saveOnClick(event);
        resolve('Success!');
      });
      promise.then(() => {
        if (trans.transactionFeeSetupDetail.ruleType === 'fix-per' || trans.transactionFeeSetupDetail.ruleType === 'ufc') {
          trans.tempRule = tempRuleCopy;
          this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
          this.setState({ showAddRule: true });
        } else {
          trans.tempRule = new TransactionFeeSetupRule;
          trans.tempRule.chargeUom = '%';
          this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
          this.setState({ showAddRule: true });
        }
      });
    });
  }

  onAddRuleToList = () => {
    const tempRule = this.props.transactionFeeSetup.tempRule;
    const tempRuleCopy = Object.assign({}, tempRule);
    const newTempRule = new TransactionFeeSetupRule();
    newTempRule.chargeUom = '%';
    const trans = this.props.transactionFeeSetup;
    trans.transactionFeeSetupRules.push(tempRuleCopy);
    this.props.setGlobalState({
      transactionFeeSetupForm: {
        ...trans,
        ...{ tempRule: newTempRule }
      }
    });
  }

  onDeleteToList = (index) => {
    const trans = this.props.transactionFeeSetup;
    trans.transactionFeeSetupRules.splice(index, 1);
    this.props.setGlobalState({
      transactionFeeSetupForm: {
        ...trans
      }
    });
  }

  onEditARule = (index) => {
    const trans = this.props.transactionFeeSetup;
    const tempRuleCopy = Object.assign({}, trans.transactionFeeSetupRules[index]);
    trans.transactionFeeSetupRules.splice(index, 1);
    this.props.setGlobalState({
      transactionFeeSetupForm: {
        ...trans,
        ...{ tempRule: tempRuleCopy }
      }
    });
  }

  render() {
    const resource = this.resource;
    const locale = this.getLocale();
    const { transactionFeeSetup } = this.props;
    console.log('transactionFeeSetup: ', transactionFeeSetup);
    const transactionState = { ...this.state };
    const { debitAccounts } = this.state;
    console.log('this.state: ', this.state);
    return (
      <div className='view-container'>
        <form id={TRANSACTION_FEE_FORM}
          name={TRANSACTION_FEE_FORM}
          model-name='transactionFeeSetup' ref={this.ref}>
          <header>
            <button type='button' className='btn-back' onClick={this.back} />
            <h2>{this.newMode ? resource.create : resource.edit} {resource.transaction_fee_setup_form_transaction_fee_setup}</h2>
          </header>
          <div>
            <section className='row'>
              <label className='col s12 m6'>
                {resource.externalsys_name}
                <select id='esId' name='esId'
                  disabled={!this.newMode}
                  value={transactionFeeSetup.esId}
                  onChange={this.updateState}
                  required={true}>
                  <option selected={true} value=''>Please Select</option>
                  )
                  {this.state.externalSystems.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>)
                  )}
                </select>
              </label>
              <label className='col s12 m6'>
                {resource.payee_name}
                <select id='payeeId' name='payeeId'
                  value={transactionFeeSetup.payeeId}
                  onChange={this.onChangeSelect}
                  required={true}>
                  <option selected={true} value=''>Please Select</option>
                  )
                  {this.state.payees.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>)
                  )}
                </select>
              </label>
              <label className='col s12 checkbox-container'>
                <input type='checkbox' id='userType' name='userType'
                  checked={transactionFeeSetup.userType === 'T' ? true : false}
                  onChange={() => transactionFeeSetup.userType === 'T' ?
                    this.props.setGlobalState({ transactionFeeSetupForm: { ...transactionFeeSetup, ...{ userType: 'F' } } }) :
                    this.props.setGlobalState({ transactionFeeSetupForm: { ...transactionFeeSetup, ...{ userType: 'T' } } })
                  } />
                {resource.transaction_fee_setup_form_consumer}
              </label>
              <label className='col s12 l6'>
                {resource.transaction_fee_setup_form_location}
                <div className='radio-group'>
                  <label >
                    <input checked={transactionFeeSetup.zoneType === 'B' ? true : false} value='B'
                      onChange={this.updateState} type='radio' id='zoneType' name='zoneType' />
                    {resource.transaction_fee_setup_form_both}
                  </label>
                  <label >
                    <input checked={transactionFeeSetup.zoneType === 'D' ? true : false} value='D'
                      onChange={this.updateState} type='radio' id='zoneType' name='zoneType' />
                    {resource.transaction_fee_setup_form_different_zone}
                  </label>
                  <label>
                    <input checked={transactionFeeSetup.zoneType === 'S' ? true : false} value='S'
                      onChange={this.updateState} type='radio' id='zoneType' name='zoneType' />
                    {resource.transaction_fee_setup_form_same_zone}
                  </label>
                </div>
              </label>
              <label className='col s12 l6'>
                {resource.transaction_fee_setup_form_charge_type}
                <div className='radio-group'>
                  <label >
                    <input checked={transactionFeeSetup.chargeType === 'W' ? true : false}
                      value='W' onChange={this.onUpdateState}
                      type='radio' id='chargeType' name='chargeType' />
                    {resource.transaction_fee_setup_form_waived}
                  </label>
                  <label >
                    <input checked={transactionFeeSetup.chargeType === 'E' ? true : false}
                      value='E' onChange={this.onUpdateState} type='radio' id='chargeType' name='chargeType' />
                    {resource.transaction_fee_setup_form_charge_to_payee}
                  </label>
                  <label>
                    <input checked={transactionFeeSetup.chargeType === 'R' ? true : false}
                      value='R' onChange={this.onUpdateState} type='radio' id='chargeType' name='chargeType' />
                    {resource.transaction_fee_setup_form_charge_to_payer}
                  </label>
                </div>
              </label>
            </section>
            {transactionFeeSetup.chargeType === 'E' &&
              <ChargingPayee resource={resource}
                locale={locale}
                transactionState={transactionState}
                onUpdateState={this.onUpdateState}
                transactionFeeSetup={transactionFeeSetup}
                onAddRuleHandler={this.onAddRuleToList}
                onDeleteToList={this.onDeleteToList}
                onEditARule={this.onEditARule}
                formatCurrency={this.formatCurrency}
                currencyOnFocus={this.currencyOnFocus}
                currencyOnBlur={this.currencyOnBlur}
                debitAccounts={debitAccounts}
                showAddRule={this.state.showAddRule} />}
            {transactionFeeSetup.chargeType === 'R' &&
              <ChargingPayer resource={resource}
                locale={locale}
                transactionState={transactionState}
                onUpdateState={this.onUpdateState}
                transactionFeeSetup={transactionFeeSetup}
                onAddRuleHandler={this.onAddRuleToList}
                onDeleteToList={this.onDeleteToList}
                onEditARule={this.onEditARule}
                formatCurrency={this.formatCurrency}
                currencyOnFocus={this.currencyOnFocus}
                currencyOnBlur={this.currencyOnBlur}
                showAddRule={this.state.showAddRule} />}
          </div>
          <footer>
            {this.editable &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.validateSaveOnClick}>
                {resource.save}
              </button>}
          </footer>
        </form>
      </div>
    );
  }

  setDefaultChargeType() {
    const trans = this.props.transactionFeeSetup;
    trans.transactionFeeSetupDetail.payeeDebitAcc = '';
    trans.transactionFeeSetupDetail.payeeOther = '';
    trans.transactionFeeSetupDetail.payeeCreditAcc = '';
    trans.transactionFeeSetupDetail.postingType = 'I';
    //
    trans.transactionFeeSetupDetail.transFix = 'U';
    trans.transactionFeeSetupDetail.transMinAmt = null;
    trans.transactionFeeSetupDetail.transMaxAmt = null;
    trans.transactionFeeSetupDetail.transFixAmt = null;
    //
    trans.transactionFeeSetupDetail.postingOther = 'E';
    trans.transactionFeeSetupDetail.effectiveDate = new Date();
    //
    trans.transactionFeeSetupDetail.payerCreditAcc = '';
    trans.transactionFeeSetupDetail.ruleType = 'fix-per';
    //
    trans.transactionFeeSetupDetail.transCharge = null;
    trans.tempRule = new TransactionFeeSetupRule();
    trans.tempRule.chargeUom = '%';
    trans.transactionFeeSetupRules = [];
    this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
  }

  setDefaultPostingType() {
    const trans = this.props.transactionFeeSetup;

    trans.transactionFeeSetupDetail.transFix = 'U';
    trans.transactionFeeSetupDetail.transMinAmt = null;
    trans.transactionFeeSetupDetail.transMaxAmt = null;
    trans.transactionFeeSetupDetail.transFixAmt = null;
    //
    trans.transactionFeeSetupDetail.postingOther = 'E';
    trans.transactionFeeSetupDetail.effectiveDate = new Date();
    // this.setState({ transactionFeeSetup: trans });
    this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });

  }

  setDefaultTransFix() {
    const trans = this.props.transactionFeeSetup;

    trans.transactionFeeSetupDetail.transMinAmt = null;
    trans.transactionFeeSetupDetail.transMaxAmt = null;
    trans.transactionFeeSetupDetail.transFixAmt = null;

    trans.transactionFeeSetupDetail.transCharge = null;
    trans.tempRule = new TransactionFeeSetupRule();
    trans.tempRule.chargeUom = '%';
    trans.transactionFeeSetupRules = [];
    // this.setState({ transactionFeeSetup: trans });
    this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
  }

  setDefaultPostingOther() {
    const trans = this.props.transactionFeeSetup;
    trans.transactionFeeSetupDetail.effectiveDate = new Date();
    // this.setState({ transactionFeeSetup: trans });
    this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
  }

  setDefaultRuleType() {
    const trans = this.props.transactionFeeSetup;
    trans.transactionFeeSetupDetail.transCharge = null;
    trans.tempRule = new TransactionFeeSetupRule();
    trans.tempRule.chargeUom = '%';
    trans.transactionFeeSetupRules = [];
    // this.setState({ transactionFeeSetup: trans });
    this.props.setGlobalState({ transactionFeeSetupForm: { ...trans } });
  }

  removeByKey(myObj, deleteKey) {
    return Object.keys(myObj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
      }, {});
  }

  async getLoadPayee(payeeId) {
    const account = await this.apprReceivingAccountService.getByPayeeId(payeeId);
    this.setState(() => ({
      debitAccounts: this.getKeyValue(account, 'accNo', 'accName')
    }));
  }
}

const TransactionFeeSelector = new ViewGlobalStateSelector(TRANSACTION_FEE_FORM);

function mapStateToProps(state) {
  return {
    transactionFeeSetup: TransactionFeeSelector.selectFormData(state)
  };
}

function mapDispatchToProps(dispatch): EditDispatchProps<TransactionFeeSetup, any> {
  return {
    setGlobalState: (data) => dispatch(updateGlobalState(data)),
    load: (data) => dispatch(getTransactionFee(data)),
    update: (data) => dispatch(updateTransactionFee(data)),
    insert: (data) => dispatch(insertTransactionFee(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const TransactionFeeForm = compose(
  withStore,
  withConnect
)(TransactionFeeComponent);

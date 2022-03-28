import {elements} from 'form-util';
import * as React from 'react';
import {validateElements} from 'ui-plus';
import {Locale, storage} from 'uione';

export class ChargingRuleTierBasic extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.locale = props.locale;
    this.validateAndAddRule = this.validateAndAddRule.bind(this);
  }
  private locale: Locale;

  validateAndAddRule = (event) => {
    const form = event.currentTarget.form;
    const controls = elements(form, ['lowerLimit', 'upperLimit', 'transCharge', 'lvlMinAmt', 'lvlMaxAmt']);
    const valid = validateElements(controls, this.locale);
    const tempRule = this.props.transactionFeeSetup.tempRule;
    let isValidLimit = true;
    if (!!valid) {
      for (const rule of this.props.transactionFeeSetup.transactionFeeSetupRules) {
        if (!(rule.lowerLimit >= tempRule.upperLimit || rule.upperLimit <= tempRule.lowerLimit)) {
          isValidLimit = false;
          break;
        }
      }
      if (isValidLimit) {
        this.props.onAddRuleHandler();
      } else {
        storage.toast().showToast(this.props.resource.error_invalid_payment_rule);
      }
    }
  }

  deleteRule = (event) => {
    this.props.onDeleteToList(event.target.value);
  }
  editRule = (event) => {
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
    if (hasValue) {
      const title = this.props.resource.confirm;
      const confirmMsg = this.props.resource.msg_confirm_rule;
      storage.alert().confirm(confirmMsg, title, () => {
        this.props.onEditARule(event.target.value);
      });
    } else {
      this.props.onEditARule(event.target.value);
    }
  }
  render() {
    const { resource, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState, showAddRule } = this.props;
    const { tempRule } = transactionFeeSetup;

    return (
      <div className='col s12 detail'>
        <hr />
        <header className='row'>
          <h4 className='col s1'>{resource.sequence}</h4>
          <div className='col s3 no-padding row no-margin'>
            <h4 className='col s12 m6'>{resource.transaction_fee_setup_charging_rule_lower_limit}</h4>
            <h4 className='col s12 m6'>{resource.transaction_fee_setup_charging_rule_upper_limit}</h4>
          </div>
          <div className='col s4'>
            <h4>{resource.fee_charges}</h4>
          </div>
          <div className='col s3 no-padding row no-margin'>
            <h4 className='col s12 m6'>{resource.transaction_fee_setup_charging_rule_min_amount}</h4>
            <h4 className='col s12 m6'>{resource.transaction_fee_setup_charging_rule_max_amount}</h4>
          </div>
          <div className='col s1'>
            <h4>Action</h4>
          </div>
        </header >
        {transactionFeeSetup.transactionFeeSetupRules.map((value, index) => {
          return (
            <div key={index} className='row'>
              <span className='col s1 text-right'>
                {index + 1}
              </span>
              <div className='col s3 no-padding row no-margin'>
                <span className='col s12 m12 l6 text-right'>
                  {formatCurrency(value.lowerLimit)}
                </span>
                <span className='col s12 m12 l6 text-right'>
                  {formatCurrency(value.upperLimit)}
                </span>
              </div>
              <span className='col s4 text-right'>
                {formatCurrency(value.transCharge) + ' ' + value.chargeUom}
              </span>
              <div className='col s3 no-padding row no-margin'>
                <span className='col s12 m12 l6 text-right'>
                  {formatCurrency(value.lvlMinAmt)}
                </span>
                <span className='col s12 m12 l6 text-right'>
                  {formatCurrency(value.lvlMaxAmt)}
                </span>
              </div>
              <div className='col s1'>
                <button value={index} type='button' className='btn-remove' onClick={this.deleteRule} />
                <button value={index} type='button' className='btn-edit' onClick={this.editRule} />
              </div>
            </div>
          );
        })}
        <hr />
        {showAddRule && <div className='row'>
          <label className='col s1'>
            *
          </label>
          <div className='col s3 no-padding row no-margin'>
            <label className='col s12 m12 l6'>
              <input type='tel' id='lowerLimit' name='lowerLimit'
                className='text-right'
                data-type='currency'
                min='0'
                maxLength={13}
                required={true}
                resource-key='transaction_fee_setup_charging_rule_lower_limit'
                defaultValue={formatCurrency(!!tempRule ? tempRule.lowerLimit : 0)}
                data-field='tempRule.lowerLimit'
                ignore-on-submit='true'
                onChange={onUpdateState}
                onFocus={currencyOnFocus}
                onBlur={currencyOnBlur} />
            </label>
            <label className='col s12 m12 l6'>
              <input type='tel' id='upperLimit'
                name='upperLimit'
                data-field='tempRule.upperLimit'
                ignore-on-submit='true'
                className='text-right'
                data-type='currency'
                min-field='lowerLimit'
                min='0'
                maxLength={13}
                required={true}
                resource-key='transaction_fee_setup_charging_rule_upper_limit'
                defaultValue={formatCurrency(!!tempRule ? tempRule.upperLimit : 0)}
                onChange={onUpdateState}
                onFocus={currencyOnFocus}
                onBlur={currencyOnBlur} />
            </label>
          </div>
          <div className='col s4 no-padding row no-margin'>
            <label className='col s12 m8'>
              <input type='tel'
                id='transCharge' name='transCharge'
                className='text-right'
                data-type='currency'
                min='0'
                maxLength={13}
                required={true}
                resource-key='fee_charges'
                defaultValue={formatCurrency(!!tempRule ? tempRule.transCharge : 0)}
                data-field='tempRule.transCharge'
                onChange={onUpdateState}
                onFocus={currencyOnFocus}
                onBlur={currencyOnBlur}
              />
            </label>
            <label className='col s12 m4'>
              <select id='chargeUom' name='chargeUom'
                value={!!tempRule ? tempRule.chargeUom : ''}
                data-field='tempRule.chargeUom'
                onChange={onUpdateState}>
                <option selected={true} value='%'> % </option>
                <option value='$'> $ </option>
              </select>
            </label>
          </div>
          <div className='col s3 no-padding row no-margin'>
            <label className='col s12 m12 l6 error-align-right'>
              <input type='tel' id='lvlMinAmt' name='lvlMinAmt'
                className='text-right'
                data-type='currency'
                min='0'
                maxLength={13}
                resource-key='transaction_fee_setup_charging_rule_min_amount'
                defaultValue={formatCurrency(!!tempRule ? tempRule.lvlMinAmt : 0)}
                data-field='tempRule.lvlMinAmt'
                onChange={onUpdateState}
                onFocus={currencyOnFocus}
                onBlur={currencyOnBlur} />
            </label>
            <label className='col s12 m12 l6 error-align-right'>
              <input type='tel' id='lvlMaxAmt' name='lvlMaxAmt'
                className='text-right'
                data-type='currency'
                min-field='lvlMinAmt'
                min='0'
                maxLength={13}
                resource-key='transaction_fee_setup_charging_rule_max_amount'
                defaultValue={formatCurrency(!!tempRule ? tempRule.lvlMaxAmt : 0)}
                data-field='tempRule.lvlMaxAmt'
                onChange={onUpdateState}
                onFocus={currencyOnFocus}
                onBlur={currencyOnBlur} />
            </label>
          </div>
          <div className='col s1'>
            <button className='btn-add' type='button' onClick={this.validateAndAddRule} />
          </div>
        </div>}
      </div>
    );
  }
}

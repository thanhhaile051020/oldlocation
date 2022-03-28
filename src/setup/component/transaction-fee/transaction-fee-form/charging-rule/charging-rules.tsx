import * as React from 'react';

import {ChargingRuleFixPerTransaction} from './charging-rule-fix-per-transaction';
import {ChargingRuleSlabBasic} from './charging-rule-slab-basic';
import {ChargingRuleTierBasic} from './charging-rule-tier-basic';
import {ChargingRuleUtilityFeeCharging} from './charging-rule-utility-fee-charging';

export class ChargingRules extends React.Component<any, any> {

  render() {
    const { resource, locale, onChangeHandler, transactionState, onAddRuleHandler, onDeleteToList, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState, showAddRule, onEditARule } = this.props;
    return (
      <React.Fragment>
        <section className='row'>
          <h4>{resource.transaction_fee_setup_charge_to_payer_charging_rules_charging_rules}</h4>
          <label className='col s12 m6'>
            {resource.transaction_fee_setup_charge_to_payer_charging_rules_charge_type}
            <select
              id='ruleType'
              name='ruleType'
              data-field='transactionFeeSetupDetail.ruleType'
              value={transactionFeeSetup.transactionFeeSetupDetail.ruleType}
              onChange={onUpdateState}>
              <option selected={true} value=''>{resource.please_select}</option>
              )
                {transactionState.rules.map((item) => (
                <option key={item.id} value={item.value}>{item.text}</option>)
              )}
            </select>
          </label>
          {transactionFeeSetup.transactionFeeSetupDetail.ruleType === 'fix-per' &&
            <ChargingRuleFixPerTransaction
              resource={resource}
              onChangeHandler={onChangeHandler}
              transactionState={transactionState}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup}
              showAddRule={showAddRule}
            />}
          {transactionFeeSetup.transactionFeeSetupDetail.ruleType === 'sb' &&
            <ChargingRuleSlabBasic
              resource={resource}
              locale={locale}
              onChangeHandler={onChangeHandler}
              transactionState={transactionState}
              onAddRuleHandler={onAddRuleHandler}
              onDeleteToList={onDeleteToList}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup}
              showAddRule={showAddRule}
              onEditARule={onEditARule} />}
          {transactionFeeSetup.transactionFeeSetupDetail.ruleType === 'tb' &&
            <ChargingRuleTierBasic
              resource={resource}
              locale={locale}
              onChangeHandler={onChangeHandler}
              transactionState={transactionState}
              onAddRuleHandler={onAddRuleHandler}
              onDeleteToList={onDeleteToList}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup}
              showAddRule={showAddRule}
              onEditARule={onEditARule}
            />}
          {transactionFeeSetup.transactionFeeSetupDetail.ruleType === 'ufc' &&
            <ChargingRuleUtilityFeeCharging
              resource={resource}
              onChangeHandler={onChangeHandler}
              transactionState={transactionState}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup}
              showAddRule={showAddRule} />}
        </section>
      </React.Fragment>
    );
  }
}

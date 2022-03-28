import * as React from 'react';
import {ChargingRules} from './charging-rule/charging-rules';
import {DailyType} from './posting-type/daily-type';
import {ImmediatelyType} from './posting-type/immediately-type';
import {MonthlyType} from './posting-type/monthly-type';

export class ChargingPayee extends React.Component<any, any> {
  render() {
    const { debitAccounts, resource, locale, onChangeHandler, transactionState, onAddRuleHandler, onDeleteToList, formatCurrency, currencyOnFocus, currencyOnBlur, onUpdateState, transactionFeeSetup, showAddRule, onEditARule } = this.props;
    return (
      <React.Fragment>
        <section className='row'>
          <h4>{resource.transaction_fee_setup_charging_detail}</h4>
          <label className='col s12 m12 l4'>
            {resource.transaction_fee_setup_posting_type}
            <div className='radio-group'>
              <label>
                {resource.transaction_fee_setup_immediately}
                <input type='radio' id='postingType' name='postingType'
                  data-field='transactionFeeSetupDetail.postingType'
                  onChange={onUpdateState} value='I'
                  checked={transactionFeeSetup.transactionFeeSetupDetail.postingType === 'I' ? true : false} />
              </label>
              <label>
                {resource.transaction_fee_setup_charge_to_payee_charging_payee_daily}
                <input type='radio' id='postingType'
                  name='postingType'
                  data-field='transactionFeeSetupDetail.postingType'
                  onChange={onUpdateState} value='D'
                  checked={transactionFeeSetup.transactionFeeSetupDetail.postingType === 'D' ? true : false} />
              </label>
              <label>
                {resource.transaction_fee_setup_charge_to_payee_charging_payee_monthly}
                <input type='radio' id='postingType'
                  name='postingType'
                  data-field='transactionFeeSetupDetail.postingType'
                  onChange={onUpdateState} value='M'
                  checked={transactionFeeSetup.transactionFeeSetupDetail.postingType === 'M' ? true : false} />
              </label>
            </div>
          </label>
          {transactionFeeSetup.transactionFeeSetupDetail.postingType === 'I' &&
            <ImmediatelyType resource={resource}
              transactionState={transactionState}
              onChangeHandler={onChangeHandler}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup} />}
          {transactionFeeSetup.transactionFeeSetupDetail.postingType === 'D' &&
            <DailyType resource={resource}
              transactionState={transactionState}
              onChangeHandler={onChangeHandler}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup} />}
          {transactionFeeSetup.transactionFeeSetupDetail.postingType === 'M' &&
            <MonthlyType resource={resource}
              transactionState={transactionState}
              onChangeHandler={onChangeHandler}
              formatCurrency={formatCurrency}
              currencyOnFocus={currencyOnFocus}
              currencyOnBlur={currencyOnBlur}
              onUpdateState={onUpdateState}
              transactionFeeSetup={transactionFeeSetup} />}
          <label className='col s12'>
            {resource.transaction_fee_setup_debit_account}
            <select id='payeeDebitAcc' name='payeeDebitAcc'
              data-field='transactionFeeSetupDetail.payeeDebitAcc'
              value={transactionFeeSetup.transactionFeeSetupDetail.payeeDebitAcc}
              onChange={onUpdateState}
              required={true}>
              <option selected={true} value=''>{resource.please_select}</option>
              )
                  {debitAccounts.map((item, index) => (
                <option key={index} value={item.value}>{item.text}</option>)
              )}
            </select>
          </label>
        </section>
        {transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' &&
          <ChargingRules resource={resource}
            locale={locale}
            onChangeHandler={onChangeHandler}
            transactionState={transactionState}
            formatCurrency={formatCurrency}
            currencyOnFocus={currencyOnFocus}
            currencyOnBlur={currencyOnBlur}
            onAddRuleHandler={onAddRuleHandler}
            onDeleteToList={onDeleteToList}
            onEditARule={onEditARule}
            onUpdateState={onUpdateState}
            transactionFeeSetup={transactionFeeSetup}
            showAddRule={showAddRule} />
        }
      </React.Fragment>
    );
  }
}

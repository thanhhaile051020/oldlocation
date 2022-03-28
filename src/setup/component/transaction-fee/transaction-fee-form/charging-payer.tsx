import * as React from 'react';
import {ChargingRules} from './charging-rule/charging-rules';
import {ImmediatelyType} from './posting-type/immediately-type';

export class ChargingPayer extends React.Component<any, any>  {
  render() {
    const { resource, locale, onChangeHandler, transactionState, onAddRuleHandler, onDeleteToList, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState, showAddRule, onEditARule } = this.props;
    return (
      <React.Fragment>
        <section className='row'>
          <h4>{resource.transaction_fee_setup_charging_detail}</h4>
          <div className='col s12 m12 l4 radio-section'>
            {resource.transaction_fee_setup_posting_type}
            <div className='radio-group'>
              <label>
                <input type='radio'
                  id='postingType'
                  name='postingType'
                  value='I'
                  onChange={onUpdateState}
                  data-field='transactionFeeSetupDetail.postingType'
                  checked={transactionFeeSetup.transactionFeeSetupDetail.postingType === 'I' ? true : false} />
                {resource.transaction_fee_setup_immediately}
              </label>
            </div>
          </div>
          <ImmediatelyType resource={resource}
            transactionState={transactionState}
            onChangeHandler={onChangeHandler}
            formatCurrency={formatCurrency}
            currencyOnFocus={currencyOnFocus}
            currencyOnBlur={currencyOnBlur}
            onUpdateState={onUpdateState}
            transactionFeeSetup={transactionFeeSetup} />
        </section>
        <ChargingRules resource={resource}
          locale={locale}
          onChangeHandler={onChangeHandler}
          transactionState={transactionState}
          onAddRuleHandler={onAddRuleHandler}
          onDeleteToList={onDeleteToList}
          onEditARule={onEditARule}
          formatCurrency={formatCurrency}
          currencyOnFocus={currencyOnFocus}
          currencyOnBlur={currencyOnBlur}
          onUpdateState={onUpdateState}
          transactionFeeSetup={transactionFeeSetup}
          showAddRule={showAddRule} />
      </React.Fragment>
    );
  }
}

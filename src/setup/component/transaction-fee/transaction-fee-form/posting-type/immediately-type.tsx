import * as React from 'react';

export class ImmediatelyType extends React.Component<any, any> {
  render() {
    const { resource, onChangeHandler, transactionState, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState } = this.props;
    return (
      <React.Fragment>
        <label className='col s6 m6 l4'>
          {resource.transaction_fee_setup_minimum_amount_per_transaction}
          <input type='tel' id='transMinAmt' name='transMinAmt'
            className='text-right'
            data-type='currency'
            min='0'
            maxLength={13}
            data-field='transactionFeeSetupDetail.transMinAmt'
            defaultValue={formatCurrency(transactionFeeSetup.transactionFeeSetupDetail.transMinAmt)}
            onChange={onUpdateState}
            onFocus={currencyOnFocus}
            onBlur={currencyOnBlur}
          />
        </label>
        <label className='col s6 m6 l4'>
          {resource.transaction_fee_setup_maximum_amount_per_transaction}
          <input type='tel' id='transMaxAmt' name='transMaxAmt'
            className='text-right'
            data-type='currency'
            min-field='transMinAmt'
            min='0'
            maxLength={13}
            data-field='transactionFeeSetupDetail.transMaxAmt'
            defaultValue={formatCurrency(transactionFeeSetup.transactionFeeSetupDetail.transMaxAmt)}
            onChange={onUpdateState}
            onFocus={currencyOnFocus}
            onBlur={currencyOnBlur} />
        </label>
      </React.Fragment>
    );
  }
}

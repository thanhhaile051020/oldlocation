import * as React from 'react';

export class DailyType extends React.Component<any, any> {
  render() {
    const { resource, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState } = this.props;
    return (
      <div className='radio-group row'>
        <label className='col s12 m12 l6'>
          {resource.transaction_fee_setup_fix_per_transaction}
          <input type='radio'
            id='transFix'
            name='transFix'
            value='U'
            data-field='transactionFeeSetupDetail.transFix'
            checked={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' ? true : false}
            onChange={onUpdateState} />
          {transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' &&
            <div className='row'>
              <label className='col s6'>
                {resource.transaction_fee_setup_minimum_amount_per_day}
                <input type='tel' id='transMinAmt' name='transMinAmt'
                  className='text-right'
                  data-type='currency'
                  min='0'
                  data-field='transactionFeeSetupDetail.transMinAmt'
                  maxLength={13}
                  disabled={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' ? false : true}
                  defaultValue={formatCurrency(transactionFeeSetup.transactionFeeSetupDetail.transMinAmt)}
                  onChange={onUpdateState}
                  onFocus={currencyOnFocus}
                  onBlur={currencyOnBlur} />
              </label >
              <label className='col s6'>
                {resource.transaction_fee_setup_maximum_amount_per_day}
                <input type='tel' id='transMaxAmt' name='transMaxAmt'
                  disabled={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' ? false : true}
                  className='text-right'
                  data-type='currency'
                  min-field='transMinAmt'
                  min='0'
                  data-field='transactionFeeSetupDetail.transMaxAmt'
                  maxLength={13}
                  defaultValue={formatCurrency(transactionFeeSetup.transactionFeeSetupDetail.transMaxAmt)}
                  onChange={onUpdateState}
                  onFocus={currencyOnFocus}
                  onBlur={currencyOnBlur} />
              </label >
            </div>
          }
        </label>
        <label className='col s12 m12 l6'>
          {resource.transaction_fee_setup_fixed_amount}
          <input type='radio'
            id='transFix'
            name='transFix'
            data-field='transactionFeeSetupDetail.transFix'
            value='D'
            checked={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'D' ? true : false}
            onChange={onUpdateState} />
          {transactionFeeSetup.transactionFeeSetupDetail.transFix === 'D' &&
            <div className='row'>
              <label className='col s12'>
                {resource.transaction_fee_setup_amount}
                <input type='tel'
                  id='transFixAmt'
                  name='transFixAmt'
                  disabled={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'D' ? false : true}
                  className='text-right'
                  data-type='currency'
                  min='0'
                  maxLength={13}
                  data-field='transactionFeeSetupDetail.transFixAmt'
                  defaultValue={formatCurrency(transactionFeeSetup.transactionFeeSetupDetail.transFixAmt)}
                  onChange={onUpdateState}
                  onFocus={currencyOnFocus}
                  onBlur={currencyOnBlur} />
              </label>
            </div>
          }
        </label>
      </div>
    );
  }
}


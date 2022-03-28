import * as moment from 'moment';
import * as React from 'react';

export class MonthlyType extends React.Component<any, any> {
  render() {
    const { resource, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState } = this.props;
    return (
      <React.Fragment>
        <div className='radio-group row'>
          <label className='col s6 m4 l2'>
            {resource.transaction_fee_setup_charge_to_payee_monthly_type_end_of_month}
            <input type='radio'
              id='postingOther'
              name='postingOther'
              value='E'
              data-field='transactionFeeSetupDetail.postingOther'
              onChange={onUpdateState}
              checked={transactionFeeSetup.transactionFeeSetupDetail.postingOther === 'E' ? true : false} />
          </label>
          <label className='col s6 m6'>
            {resource.transaction_fee_setup_charge_to_payee_monthly_type_other}
            <input type='radio'
              id='postingOther'
              name='postingOther'
              value='O'
              data-field='transactionFeeSetupDetail.postingOther'
              onChange={onUpdateState}
              checked={transactionFeeSetup.transactionFeeSetupDetail.postingOther === 'O' ? true : false} />
            {transactionFeeSetup.transactionFeeSetupDetail.postingOther === 'O' &&
              <input type='date'
                id='effectiveDate'
                name='effectiveDate'
                disabled={transactionFeeSetup.transactionFeeSetupDetail.postingOther === 'O' ? false : true}
                data-field='transactionFeeSetupDetail.effectiveDate'
                value={moment(transactionFeeSetup.transactionFeeSetupDetail.effectiveDate).format('YYYY-MM-DD')}
                onChange={onUpdateState} />
            }
          </label>
        </div>
        <div className='radio-group row'>
          <label className='col s12 m12 l6'>
            {resource.transaction_fee_setup_fix_per_transaction}
            <input type='radio'
              id='transFix'
              name='transFix'
              value='U'
              onChange={onUpdateState}
              data-field='transactionFeeSetupDetail.transFix'
              checked={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' ? true : false} />
            {transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' &&
              <div className='row'>
                <label className='col s6'>
                  {resource.transaction_fee_setup_minimum_amount_per_day}
                  <input type='tel'
                    id='transMinAmt'
                    name='transMinAmt'
                    disabled={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' ? false : true}
                    className='text-right'
                    data-type='currency'
                    min='0'
                    maxLength={13}
                    data-field='transactionFeeSetupDetail.transMinAmt'
                    defaultValue={formatCurrency(transactionFeeSetup.transactionFeeSetupDetail.transMinAmt)}
                    onChange={onUpdateState}
                    onFocus={currencyOnFocus}
                    onBlur={currencyOnBlur} />
                </label>
                <label className='col s6'>
                  {resource.transaction_fee_setup_maximum_amount_per_day}
                  <input type='tel' id='transMaxAmt' name='transMaxAmt'
                    disabled={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'U' ? false : true}
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
                </label >
              </div>
            }
          </label>
          <label className='col s12 m12 l6'>
            {resource.transaction_fee_setup_fixed_amount}
            <input type='radio'
              id='transFix'
              name='transFix'
              value='D'
              data-field='transactionFeeSetupDetail.transFix'
              onChange={onUpdateState}
              checked={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'D' ? true : false} />
            {transactionFeeSetup.transactionFeeSetupDetail.transFix === 'D' &&
              <div className='row'>
                <label className='col s12'>
                  {resource.transaction_fee_setup_amount}
                  <input type='tel' id='transFixAmt' name='transFixAmt'
                    disabled={transactionFeeSetup.transactionFeeSetupDetail.transFix === 'D' ? false : true}
                    className='text-right'
                    data-type='string-currency'
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
      </React.Fragment>
    );
  }
}

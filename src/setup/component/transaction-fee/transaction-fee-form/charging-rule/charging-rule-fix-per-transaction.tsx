import * as React from 'react';

export class ChargingRuleFixPerTransaction extends React.Component<any, any> {
  render() {
    const { resource, formatCurrency, currencyOnFocus, currencyOnBlur, transactionFeeSetup, onUpdateState, showAddRule } = this.props;
    const { tempRule } = transactionFeeSetup;
    return (
      <React.Fragment>
        <label className='col s10 m4'>
          {resource.fee_charges}
          <input
            type='text'
            id='transCharge'
            name='transCharge'
            className='text-right'
            data-type='currency'
            required={true}
            min='0'
            maxLength={13}
            defaultValue={showAddRule ?
              formatCurrency(!!tempRule ? tempRule.transCharge : 0) :
              formatCurrency(transactionFeeSetup.transactionFeeSetupRules[0].transCharge)}
            data-field='tempRule.transCharge'
            onChange={onUpdateState}
            onFocus={currencyOnFocus}
            onBlur={currencyOnBlur} />
        </label>
        <label className='col s2 m2'>
          {resource.transaction_fee_setup_charge_uom}
          <select
            id='chargeUom'
            name='chargeUom'
            value={showAddRule ?
              !!tempRule ? tempRule.chargeUom : '' :
              transactionFeeSetup.transactionFeeSetupRules[0].chargeUom}
            data-field='tempRule.chargeUom'
            onChange={onUpdateState} >
            <option selected={true} value='%'> % </option>
            <option value='$'>$</option>
          </select>
        </label>
      </React.Fragment>
    );
  }
}

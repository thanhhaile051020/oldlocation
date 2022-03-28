import * as React from 'react';

export class ChargingRuleTierBasic extends React.Component<any, any> {

  render() {
    const { resource, valueForm, isHighlight } = this.props;
    return (
      <div className='detail'>
        <header className={'row' + isHighlight}>
          <div className='col s1'>
            {resource.sequence}
          </div>
          <div className='col s2'>
            {resource.transaction_fee_setup_charging_rule_lower_limit}
          </div>
          <div className='col s2'>
            {resource.transaction_fee_setup_charging_rule_upper_limit}
          </div>
          <div className='col s3'>
            {resource.fee_charges}
          </div>
          <div className='col s2'>
            {resource.transaction_fee_setup_charging_rule_min_amount}
          </div>
          <div className='col s2'>
            {resource.transaction_fee_setup_charging_rule_max_amount}
          </div>
        </header >
        {valueForm.transactionFeeSetupRules.map((value, index) => {
          return (
            <div key={index} className={'row' + isHighlight}>
              <div className='col s1'>
                {index + 1}
              </div>
              <div className='col s2'>
                {value.lowerLimit}
              </div>
              <div className='col s2'>
                {value.upperLimit}
              </div>
              <div className='col s3'>
                {value.transCharge + ' ' + value.chargeUom}
              </div>
              <div className='col s2'>
                {value.lvlMinAmt}
              </div>
              <div className='col s2'>
                {value.lvlMaxAmt}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

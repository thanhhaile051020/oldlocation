import * as React from 'react';

export class ChargingRuleSlabBasic extends React.Component<any, any> {

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
              <div className='col s1 text-right'>
                {index + 1}
              </div>
              <div className='col s2 text-right'>
                {value.lowerLimit}
              </div>
              <div className='col s2 text-right'>
                {value.upperLimit}
              </div>
              <div className='col s3 text-right'>
                {value.transCharge + ' ' + value.chargeUom}
              </div>
              <div className='col s2 text-right'>
                {value.lvlMinAmt}
              </div>
              <div className='col s2 text-right'>
                {value.lvlMaxAmt}
              </div>
            </div>
          );
        })}
        <hr />
      </div>
    );
  }
}

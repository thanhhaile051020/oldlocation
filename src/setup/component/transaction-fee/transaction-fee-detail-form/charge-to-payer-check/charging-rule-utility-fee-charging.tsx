import * as React from 'react';

export class ChargingRuleUtilityFeeCharging extends React.Component<any, any> {

  render() {
    const { resource, valueForm, isHighlight } = this.props;
    return (
      <p className={'col s12' + isHighlight}>
        <span>{resource.fee_charges}: </span>
        {valueForm.transactionFeeSetupRules[0].transCharge + ' ' + valueForm.transactionFeeSetupRules[0].chargeUom}
      </p>
    );
  }
}

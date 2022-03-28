import * as React from 'react';

export class ChargingDetail extends React.Component<any, any> {

  render() {
    const { resource, getStyleDifferent, differentObject, valueForm, isHighlight, nameType } = this.props;
    return (
      <React.Fragment>
        <h4 className='section-header'>{resource.transaction_fee_setup_charging_detail + nameType}</h4>
        <p className={isHighlight}>
          <span>{resource.transaction_fee_setup_posting_type}: </span>
          {resource.transaction_fee_setup_immediately}
        </p>
        <p className={getStyleDifferent(differentObject, 'transMinAmt') + isHighlight}>
          <span>{resource.transaction_fee_setup_minimum_amount_per_transaction}: </span>
          {valueForm.transMinAmt}
        </p >
        <p className={isHighlight + getStyleDifferent(differentObject, 'transMaxAmt')}>
          <span>{resource.transaction_fee_setup_maximum_amount_per_transaction}: </span>
          {valueForm.transMaxAmt}
        </p>
        <p className={isHighlight + getStyleDifferent(differentObject, 'payerCreditAcc')}>
          <span>{resource.transaction_fee_setup_credit_account}: </span>
          {valueForm.payerCreditAcc}
        </p>
      </React.Fragment>
    );
  }
}

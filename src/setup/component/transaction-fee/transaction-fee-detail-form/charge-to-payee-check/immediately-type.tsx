import * as React from 'react';

export class ImmediatelyTypeCheck extends React.Component<any, any> {
  render() {
    const { resource, getStyleDifferent, differentObject, valueForm, isHighlight } = this.props;
    return (
      <div className='row'>
        <p className={'col s12 m12 ' +
          getStyleDifferent(differentObject, 'transMinAmt') +
          isHighlight}>
          <span>{resource.transaction_fee_setup_minimum_amount_per_transaction}: </span>
          {valueForm.transMinAmt}
        </p >
        <p className={'col s12 m12 ' +
          getStyleDifferent(differentObject, 'transMaxAmt') +
          isHighlight}>
          <span>{resource.transaction_fee_setup_maximum_amount_per_transaction}: </span>
          {valueForm.transMaxAmt}
        </p>
      </div>
    );
  }

}


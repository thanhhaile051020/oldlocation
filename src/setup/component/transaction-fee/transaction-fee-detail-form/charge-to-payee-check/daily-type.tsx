import * as React from 'react';

export class DailyTypeCheck extends React.Component<any, any> {

  render() {
    const { resource, getStyleDifferent, valueForm, differentObject, isHighlight } = this.props;
    return (
      <div className='row'>
        {(valueForm.transFix === 'U') &&
          <ul className={'col s12 ' +
            getStyleDifferent(differentObject, 'transFix') +
            isHighlight}>
            {resource.transaction_fee_setup_fix_per_transaction}
            <li className={'col s12 m12 ' +
              getStyleDifferent(differentObject, 'transMinAmt') +
              isHighlight}>
              <span>{resource.transaction_fee_setup_minimum_amount_per_day}: </span>
              {valueForm.transMinAmt}
            </li >
            <li className={'col s12 m12 ' +
              getStyleDifferent(differentObject, 'transMaxAmt') +
              isHighlight}>
              <span>{resource.transaction_fee_setup_maximum_amount_per_day}: </span>
              {valueForm.transMaxAmt}
            </li >
          </ul>
        }
        {(valueForm.transFix === 'D') &&
          <p className={'col s12 ' +
            getStyleDifferent(differentObject, 'transFixAmt') +
            getStyleDifferent(differentObject, 'transFix') +
            isHighlight}>
            <span>{resource.transaction_fee_setup_fixed_amount}: </span>
            {valueForm.transFixAmt}
          </p>}
      </div>
    );
  }

}


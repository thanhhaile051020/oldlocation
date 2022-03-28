import * as moment from 'moment';
import * as React from 'react';

export class MonthlyTypeCheck extends React.Component<any, any> {

  render() {
    const { resource, getStyleDifferent, differentObject, valueForm, isHighlight } = this.props;
    return (
      <div className='row'>
        <ul className={'col s12 ' + getStyleDifferent(differentObject, 'postingOther') + isHighlight}>
          {resource.transaction_fee_setup_charge_to_payee_monthly_posting_of_every_month}
          {valueForm.postingOther === 'E' &&
            <li>
              {resource.transaction_fee_setup_charge_to_payee_monthly_type_end_of_month}
            </li>}
          {valueForm.postingOther === 'O' &&
            <li className={getStyleDifferent(differentObject, 'effectiveDate') + isHighlight}>
              <span>{resource.transaction_fee_setup_charge_to_payee_monthly_type_other}: </span>
              {moment(valueForm.effectiveDate).format('YYYY-MM-DD')}
            </li>}
        </ul>
        {(valueForm.transFix === 'U') &&
          <ul className={'col s12 ' + getStyleDifferent(differentObject, 'transFix') + isHighlight}>
            {resource.transaction_fee_setup_fix_per_transaction}
            <li className={'col s12 m12 ' + getStyleDifferent(differentObject, 'transMinAmt') + isHighlight}>
              <span>{resource.transaction_fee_setup_minimum_amount_per_day}: </span>
              {valueForm.transMinAmt}
            </li >
            <li className={'col s12 m12 ' + getStyleDifferent(differentObject, 'transMaxAmt') + isHighlight}>
              <span>{resource.transaction_fee_setup_maximum_amount_per_day}: </span>
              {valueForm.transMaxAmt}
            </li >
          </ul>
        }
        {(this.props.valueForm.transFix === 'D') &&
          <p className={'col s12 ' + getStyleDifferent(differentObject, 'transFixAmt') + isHighlight}>
            <span>{resource.transaction_fee_setup_fixed_amount}: </span>
            {valueForm.transFixAmt}
          </p>
        }
      </div>
    );
  }

}


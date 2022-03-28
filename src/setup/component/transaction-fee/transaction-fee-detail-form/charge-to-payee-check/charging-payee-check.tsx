import * as React from 'react';
import {ChargingRules} from '../charge-to-payer-check/charging-rules';
import {DailyTypeCheck} from './daily-type';
import {ImmediatelyTypeCheck} from './immediately-type';
import {MonthlyTypeCheck} from './monthly-type';

export class ChargingPayeeCheck extends React.Component<any, any> {
  render() {
    const { resource, locale, differentObject, valueForm, valueForm1, getStyleDifferent, isHighlight, nameType } = this.props;
    return (
      <React.Fragment>
        <h4 className='section-header'>{resource.transaction_fee_setup_charging_detail + nameType}</h4>
        <p className={getStyleDifferent(differentObject, 'postingType')}>
          <span>{resource.transaction_fee_setup_posting_type}: </span>
          {(valueForm.postingType === 'D') ? 'Daily' : (
            (valueForm.postingType === 'M') ? 'Monthly' : 'Immediately'
          )}
        </p>
        {valueForm.postingType === 'I' &&
          <ImmediatelyTypeCheck
            valueForm={valueForm}
            resource={resource}
            differentObject={differentObject}
            isHighlight={getStyleDifferent(differentObject, 'postingType') +
              isHighlight}
            getStyleDifferent={getStyleDifferent}
            this={this.props.this} />}
        {valueForm.postingType === 'D' &&
          <DailyTypeCheck
            valueForm={valueForm}
            resource={resource}
            isHighlight={getStyleDifferent(differentObject, 'postingType') +
              isHighlight}
            getStyleDifferent={getStyleDifferent}
            differentObject={differentObject}
            this={this.props.this} />}
        {valueForm.postingType === 'M' &&
          <MonthlyTypeCheck
            valueForm={valueForm}
            resource={resource}
            isHighlight={getStyleDifferent(differentObject, 'postingType') +
              isHighlight}
            getStyleDifferent={getStyleDifferent}
            differentObject={differentObject}
            this={this.props.this} />}
        <p className={isHighlight + getStyleDifferent(differentObject, 'payeeDebitAcc')}>
          <span>{resource.transaction_fee_setup_debit_account}: </span>
          {valueForm.payeeDebitAcc }
        </p>
        {valueForm.transFix === 'U' &&
          <p className={isHighlight + getStyleDifferent(differentObject, 'ruleType')}>
          <ChargingRules
            valueForm={valueForm1}
            resource={resource}
            locale={locale}
            isHighlight={isHighlight}
            differentObject={differentObject}
            getStyleDifferent={getStyleDifferent} />
        </p>
        }
      </React.Fragment>
    );
  }
}

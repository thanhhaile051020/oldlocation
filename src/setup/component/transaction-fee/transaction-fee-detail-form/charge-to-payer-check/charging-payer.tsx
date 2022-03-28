import * as React from 'react';
import {ChargingDetail} from './charging-detail';
import {ChargingRules} from './charging-rules';

export class ChargingPayerCheck extends React.Component<any, any>  {

  render() {
    const { valueForm, differentObject, getStyleDifferent, resource, locale, isHighlight, nameType } = this.props;
    return (
      <React.Fragment>
        <ChargingDetail
          valueForm={valueForm.transactionFeeSetupDetail}
          resource={resource}
          isHighlight={isHighlight}
          differentObject={differentObject.transactionFeeSetupDetail}
          getStyleDifferent={getStyleDifferent}
          nameType={nameType} />
        <hr/>
        <ChargingRules
          valueForm={valueForm}
          resource={resource}
          locale={locale}
          isHighlight={isHighlight}
          differentObject={differentObject}
          getStyleDifferent={getStyleDifferent} />
      </React.Fragment >
    );
  }
}

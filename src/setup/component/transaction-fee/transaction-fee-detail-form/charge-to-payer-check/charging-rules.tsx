import * as React from 'react';

import {ChargingRuleFixPerTransaction} from './charging-rule-fix-per-transaction';
import {ChargingRuleSlabBasic} from './charging-rule-slab-basic';
import {ChargingRuleTierBasic} from './charging-rule-tier-basic';
import {ChargingRuleUtilityFeeCharging} from './charging-rule-utility-fee-charging';

export class ChargingRules extends React.Component<any, any> {

  render() {
    const { resource, getStyleDifferent, differentObject, valueForm, isHighlight } = this.props;
    return (
      <React.Fragment>
        <div className={isHighlight +
          getStyleDifferent(differentObject, 'ruleType')}>
          <div className='section-subheader'>{resource.transaction_fee_setup_charge_to_payer_charging_rules_charging_rules}</div>
          <p className={isHighlight +
            getStyleDifferent(differentObject.transactionFeeSetupDetail, 'ruleType')}>
            <span>{resource.transaction_fee_setup_charge_to_payer_charging_rules_charge_type}: </span>
            {(valueForm.transactionFeeSetupDetail.ruleType === 'sb') ? 'Slab Basic' : (
              (valueForm.transactionFeeSetupDetail.ruleType === 'tb') ? 'Tier Basic' : (
                (valueForm.transactionFeeSetupDetail.ruleType === 'ufc') ? 'Utility Fee Charging' : (
                  (valueForm.transactionFeeSetupDetail.ruleType !== 'fix-per') ? 'None' : 'Fix Per Transaction'
                )
              )
            )
            }
          </p>
          {valueForm.transactionFeeSetupDetail.ruleType === 'fix-per' &&
            <ChargingRuleFixPerTransaction
              valueForm={valueForm}
              differentObject={differentObject}
              isHighlight={isHighlight
                + getStyleDifferent(differentObject.transactionFeeSetupDetail, 'ruleType')}
              resource={resource}
              getStyleDifferent={getStyleDifferent} />}
          {valueForm.transactionFeeSetupDetail.ruleType === 'sb' &&
            <ChargingRuleSlabBasic
              valueForm={valueForm}
              resource={resource}
              isHighlight={isHighlight
                + getStyleDifferent(differentObject.transactionFeeSetupDetail, 'ruleType')
                + getStyleDifferent(differentObject, 'transactionFeeSetupRules')}
              differentObject={differentObject}
              getStyleDifferent={getStyleDifferent} />
          }
          {valueForm.transactionFeeSetupDetail.ruleType === 'tb' &&
            <ChargingRuleTierBasic
              valueForm={valueForm}
              resource={resource}
              isHighlight={isHighlight
                + getStyleDifferent(differentObject.transactionFeeSetupDetail, 'ruleType')
                + getStyleDifferent(differentObject, 'transactionFeeSetupRules')}
              differentObject={differentObject}
              getStyleDifferent={getStyleDifferent} />
          }
          {valueForm.transactionFeeSetupDetail.ruleType === 'ufc' &&
            <ChargingRuleUtilityFeeCharging
              valueForm={valueForm}
              differentObject={differentObject}
              isHighlight={isHighlight +
                getStyleDifferent(differentObject.transactionFeeSetupDetail, 'ruleType')}
              resource={resource}
              getStyleDifferent={getStyleDifferent} />}
        </div>
      </React.Fragment>
    );
  }
}

import * as H from 'history';
import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {updateGlobalState} from 'redux-plus';
import {authenticated, storage} from 'uione';
import {WithDefaultProps} from '../core/default';
import {PrivateRoute} from '../PrivateRoute';
import {BankDiffForm} from './component/bank/bank-diff-form';
import {BankForm} from './component/bank/bank-form';
import {BanksForm} from './component/bank/banks-form';
import {EntityRelationshipDiffForm} from './component/entity-relationship-diff-form';
import {EntityRelationshipForm} from './component/entity-relationship-form';
import {EntityRelationshipsForm} from './component/entity-relationships-form';
import {ExternalSystemDiffForm} from './component/external-system/external-system-diff-form';
import {ExternalSystemForm} from './component/external-system/external-system-form';
import {ExternalSystemsForm} from './component/external-system/external-systems-form';
import {PayeeDiffForm} from './component/payee/payee-diff-form';
import {PayeeForm} from './component/payee/payee-form';
import {PayeesForm} from './component/payee/payees-form';
import {PayerDiffForm} from './component/payer/payer-diff-form';
import {PayerForm} from './component/payer/payer-form';
import {PayersForm} from './component/payer/payers-form';
import {PaymentAccountDiffForm} from './component/payment-account-diff-form';
import {PaymentAccountForm} from './component/payment-account-form';
import {PaymentAccountsForm} from './component/payment-accounts-form';
import {ReceivingAccountDiffForm} from './component/receiving-account-diff-form';
import {ReceivingAccountForm} from './component/receiving-account-form';
import {ReceivingAccountsForm} from './component/receiving-accounts-form';
import {TransactionFeeDiffForm} from './component/transaction-fee/transaction-fee-diff-form';
import {TransactionFeeForm} from './component/transaction-fee/transaction-fee-form';
import {TransactionFeesForm} from './component/transaction-fee/transaction-fees-form';

// import {PayerForm} from './component/dynamic-form/dynamic-action-form';
// import {PayersForm} from './component/dynamic-form/dynamic-list';
// import {PayeeForm} from './component/dynamic-form/dynamic-payee-form';
// import {PayeesForm} from './component/dynamic-form/dynamic-payees-form';

interface AppProps {
  history: H.History;
  setGlobalState: (data: any) => void;
  rootPath: string;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    const commonProps = {
      rootUrl: this.props.match.url,
      exact: true,
      setGlobalState: this.props.setGlobalState
    };
    if (authenticated()) {
      return (
        <React.Fragment>
          <PrivateRoute path={this.props.match.url + '/payee'} rootPath={this.props.match.url + '/payee'} exact={true} {...commonProps} component={WithDefaultProps(PayeesForm)} />
          <PrivateRoute path={this.props.match.url + '/payee/add'} rootPath={this.props.match.url + '/payee'} exact={true} {...commonProps} component={WithDefaultProps(PayeeForm)} />
          <PrivateRoute path={this.props.match.url + '/payee/edit/:entityId'} rootPath={this.props.match.url + '/payee'} exact={true} {...commonProps} component={WithDefaultProps(PayeeForm)} />
          <PrivateRoute path={this.props.match.url + '/payee/approve/:entityId'} rootPath={this.props.match.url + '/payee'} exact={true} {...commonProps} component={WithDefaultProps(PayeeDiffForm)} />

          <PrivateRoute path={this.props.match.url + '/payer'} rootPath={this.props.match.url + '/payer'} exact={true} {...commonProps} component={WithDefaultProps(PayersForm)} />
          <PrivateRoute path={this.props.match.url + '/payer/add'} rootPath={this.props.match.url + '/payer'} exact={true} {...commonProps} component={WithDefaultProps(PayerForm)} />
          <PrivateRoute path={this.props.match.url + '/payer/edit/:entityId'} rootPath={this.props.match.url + '/payer'} exact={true} {...commonProps} component={WithDefaultProps(PayerForm)} />
          <PrivateRoute path={this.props.match.url + '/payer/approve/:entityId'} rootPath={this.props.match.url + '/payer'} exact={true} {...commonProps} component={WithDefaultProps(PayerDiffForm)} />

          <Route path={this.props.match.url + '/entity-relationship/approve/:esId/:payeeId'} exact={true} component={WithDefaultProps(EntityRelationshipDiffForm)} />
          <Route path={this.props.match.url + '/entity-relationship/edit/:esId/:payeeId'} exact={true} component={WithDefaultProps(EntityRelationshipForm)} />
          <Route path={this.props.match.url + '/entity-relationship/add'} exact={true} component={WithDefaultProps(EntityRelationshipForm)} />
          <Route path={this.props.match.url + '/entity-relationship'} exact={true} component={WithDefaultProps(EntityRelationshipsForm)} />

          <PrivateRoute path={this.props.match.url + '/external-system'} rootPath={this.props.match.url + '/external-system'} exact={true} {...commonProps} component={WithDefaultProps(ExternalSystemsForm)} />
          <PrivateRoute path={this.props.match.url + '/external-system/add'} rootPath={this.props.match.url + '/external-system'} exact={true} {...commonProps} component={WithDefaultProps(ExternalSystemForm)} />
          <PrivateRoute path={this.props.match.url + '/external-system/edit/:esId'} rootPath={this.props.match.url + '/external-system'} exact={true} {...commonProps} component={WithDefaultProps(ExternalSystemForm)} />
          <PrivateRoute path={this.props.match.url + '/external-system/approve/:esId'} rootPath={this.props.match.url + '/external-system'} exact={true} {...commonProps} component={WithDefaultProps(ExternalSystemDiffForm)} />

          <PrivateRoute path={this.props.match.url + '/bank/approve/:bankId'} rootPath={this.props.match.url + '/bank'} exact={true} {...commonProps} component={WithDefaultProps(BankDiffForm)} />
          <PrivateRoute path={this.props.match.url + '/bank/add'} rootPath={this.props.match.url + '/bank'} exact={true} {...commonProps} component={WithDefaultProps(BankForm)} />
          <PrivateRoute path={this.props.match.url + '/bank/edit/:bankId'} rootPath={this.props.match.url + '/bank'} exact={true} {...commonProps} component={WithDefaultProps(BankForm)} />
          <PrivateRoute path={this.props.match.url + '/bank'} rootPath={this.props.match.url + '/bank'} exact={true} {...commonProps} component={WithDefaultProps(BanksForm)} />

          <Route path={this.props.match.url + '/odd-account'} exact={true} component={WithDefaultProps(PaymentAccountsForm)} />
          <Route path={this.props.match.url + '/odd-account/add'} exact={true} component={WithDefaultProps(PaymentAccountForm)} />
          <Route path={this.props.match.url + '/odd-account/edit/:bankId/:entityId/:accNo/:accType'} exact={true} component={WithDefaultProps(PaymentAccountForm)} />
          <Route path={this.props.match.url + '/odd-account/approve/:bankId/:entityId/:accNo/:accType'} exact={true} component={WithDefaultProps(PaymentAccountDiffForm)} />

          <Route path={this.props.match.url + '/receiving-account/approve/:bankId/:entityId/:accNo/:accType'} exact={true} component={WithDefaultProps(ReceivingAccountDiffForm)} />
          <Route path={this.props.match.url + '/receiving-account/edit/:bankId/:entityId/:accNo/:accType'} exact={true} component={WithDefaultProps(ReceivingAccountForm)} />
          <Route path={this.props.match.url + '/receiving-account/add'} exact={true} component={WithDefaultProps(ReceivingAccountForm)} />
          <Route path={this.props.match.url + '/receiving-account'} exact={true} component={WithDefaultProps(ReceivingAccountsForm)} />

          <PrivateRoute path={this.props.match.url + '/transaction-fee'} rootPath={this.props.match.url + '/transaction-fee'} exact={true} {...commonProps} component={WithDefaultProps(TransactionFeesForm)} />
          <PrivateRoute path={this.props.match.url + '/transaction-fee/add'} rootPath={this.props.match.url + '/transaction-fee'} exact={true} {...commonProps} component={WithDefaultProps(TransactionFeeForm)} />
          <PrivateRoute path={this.props.match.url + '/transaction-fee/edit/:transFeeId'} rootPath={this.props.match.url + '/transaction-fee'} exact={true} {...commonProps} component={WithDefaultProps(TransactionFeeForm)} />
          <PrivateRoute path={this.props.match.url + '/transaction-fee/approve/:transFeeId'} rootPath={this.props.match.url + '/transaction-fee'} exact={true} {...commonProps} component={WithDefaultProps(TransactionFeeDiffForm)} />
          <PrivateRoute path={this.props.match.url + '/transaction-fees'} rootPath={this.props.match.url + '/transaction-fee'} exact={true} {...commonProps} component={WithDefaultProps(TransactionFeesForm)} />
        </React.Fragment>
      );
    } else {
      const r = storage.resource();
      const title = r.value('error_permission');
      const msg = r.value('error_unauthorized');
      storage.alert().alertError(msg, title);
      return <Redirect to={{ pathname: '/auth', state: { from: this.props.location } }} />;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalState: (res) => dispatch(updateGlobalState(res))
  };
}

const withConnect = connect(null, mapDispatchToProps);

const SetupRoutes = compose(
  withRouter,
  withConnect
)(StatelessApp);
export default SetupRoutes;

import * as H from 'history';
import * as React from 'react';
import {Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {authenticated, storage} from 'uione';
import {WithDefaultProps} from '../core/default';
import {BalanceInquiryForm} from './component/balance-inquiry-form';
import {FeeDetailReportForm} from './component/fee-detail-report-form';
import {PaymentDetailHistoryForm} from './component/payment-detail-history-form';
import {PaymentDetailSearchForm} from './component/payment-detail-search-form';
import {TransactionLogsForm} from './component/transaction-logs-form';
import {UserActivityLogForm} from './component/user-activity-log-form';
import {WebServiceTransLogsForm} from './component/web-service-trans-logs-form';

interface AppProps {
  history: H.History;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    if (authenticated()) {
      return (
        <React.Fragment>
          <Route path={this.props.match.url + '/user-activity-log'} exact={true} component={WithDefaultProps(UserActivityLogForm)} />
          <Route path={this.props.match.url + '/transaction-log'} exact={true} component={WithDefaultProps(TransactionLogsForm)} />
          <Route path={this.props.match.url + '/web-services-trans-log'} exact={true} component={WithDefaultProps(WebServiceTransLogsForm)} />

          <Route path={this.props.match.url + '/balance-inquiry/'} exact={true} component={WithDefaultProps(BalanceInquiryForm)} />

          <Route path={this.props.match.url + '/payment-detail-search'} exact={true} component={WithDefaultProps(PaymentDetailSearchForm)} />
          <Route path={this.props.match.url + '/payment-detail-search/history'} exact={true} component={WithDefaultProps(PaymentDetailHistoryForm)} />

          <Route path={this.props.match.url + '/fee-detail-report'} exact={true} component={WithDefaultProps(FeeDetailReportForm)} />
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

const AccountInfoRoutes = compose(
  withRouter,
)(StatelessApp);
export default AccountInfoRoutes;

import * as csv from 'csvtojson';
import {DefaultCurrencyService, DefaultLocaleService} from 'locale-service';
import * as moment from 'moment';
import {phonecodes} from 'phonecodes';
import * as React from 'react';
import * as LazyLoadModule from 'react-loadable/lib/index';
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {uialert} from 'ui-alert';
import {loading} from 'ui-loading';
import {DefaultUIService, resources as uiresources} from 'ui-plus';
import {storage} from 'uione';
import {resources as vresources} from 'validation-util';
import {DefaultCsvService, resource, SearchConfig} from 'web-clients';
import AuthenticationRoutes from './authentication/AuthenticationRoutes';
import NotFoundPage from './core/containers/400/page';
import UnAuthorizedPage from './core/containers/401/page';
import InternalServerErrorPage from './core/containers/500/page';
import DefaultWrapper from './core/default';
import {Loading} from './core/Loading';
import Resources from './core/Resources';
import {WelcomeForm} from './core/welcome-form';

// const NotFoundPage = LazyLoadModule({ loader: () => import(`./core/containers/400/page`), loading: Loading });
// const UnAuthorizedPage = LazyLoadModule({ loader: () => import(`./core/containers/401/page`), loading: Loading });
// const InternalServerErrorPage = LazyLoadModule({ loader: () => import(`./core/containers/500/page`), loading: Loading });
// const DefaultWrapper = LazyLoadModule({ loader: () => import(`./container/default`), loading: Loading });
// const AuthenticationRoutes = LazyLoadModule({ loader: () => import(`./authentication/AuthenticationRoutes`), loading: Loading });
const AccessRoutes = LazyLoadModule({ loader: () => import(`./access/AccessRoutes`), loading: Loading });
// const SetupRoutes = LazyLoadModule({ loader: () => import(`./setup/SetupRoutes`), loading: Loading });
const ReportRoutes = LazyLoadModule({ loader: () => import(`./report/ReportRoutes`), loading: Loading });
const ContentRoutes = LazyLoadModule({ loader: () => import(`./content/ContentRoutes`), loading: Loading });
const BoLocationRoutes = LazyLoadModule({ loader: () => import(`./bo-location/BoLocationRoutes`), loading: Loading });
const LocationRoutes = LazyLoadModule({ loader: () => import(`./location/LocationRoutes`), loading: Loading });

interface StateProps {
  anyProps?: any;
}

type AppProps = StateProps;

class MomentDateService {
  parse(value: string, format: string): Date {
      // const isDate = moment(value, dateFormat.toUpperCase(), true).isValid(); // DateUtil.isDate(value, dateFormat);

      if (!format || format.length === 0) {
        format = 'MM/DD/YYYY';
      } else {
        format = format.toUpperCase();
      }
      try {
        const d = moment(value, format).toDate(); // DateUtil.parse(value, dateFormat);
        return d;
      } catch (err) {
        return null;
      }
  }
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  constructor(props) {
    super(props);

    const localeService = new DefaultLocaleService();
    const currencyService = new DefaultCurrencyService();
    resource.csv = new DefaultCsvService(csv);
    /*
    const c: SearchConfig = {
      page: 'pageIndex',
      limit: 'pageSize',
      firstLimit: 'firstPageSize'
    };
    resource.config = c;
    */
    storage.moment = true;
    storage.home = '/welcome';
    storage.setAlertService(uialert);
    storage.setResources(Resources);
    storage.setCurrencyService(currencyService);
    storage.setLocaleService(localeService);
    storage.setLoadingService(loading);
    storage.setUIService(new DefaultUIService());
    const resourceService = storage.resource();
    const dateService = new MomentDateService();
    vresources.phonecodes = phonecodes;
    uiresources.dateService = dateService;
    uiresources.currencyService = currencyService;
    uiresources.localeService = localeService;
    uiresources.resourceService = resourceService;
  }
  render() {
    if (location.href.startsWith(storage.redirectUrl) || location.href.startsWith(location.origin + '/index.html?oauth_token=')) {
      window.location.href = location.origin + '/auth/connect/oauth2' + location.search;
    }
    return (
      <Switch>
        <Route path='/401' component={UnAuthorizedPage} />
        <Route path='/500' component={InternalServerErrorPage} />
        <Route path='/auth' component={AuthenticationRoutes} />
        <Route path='/' exact={true} render={(props) => (<Redirect to='/auth' {...props} />)} />

        <DefaultWrapper history={this.props.history} location={this.props.location}>
          <Route path='/welcome' component={WelcomeForm} />
          <Route path='/odd/access' component={AccessRoutes} />
          {/*
          <Route path='/odd/setup' component={SetupRoutes} />
          */}
          <Route path='/odd/report' component={ReportRoutes} />
          <Route path='/content' component={ContentRoutes} />
          <Route path='/bo-location' component={BoLocationRoutes} />
          <Route path='/location' component={LocationRoutes} />
        </DefaultWrapper>

        <Route path='**' component={NotFoundPage} />
      </Switch>
    );
  }
}

// const withStore = withReducer(globalStateReducer, GLOBAL_STATE);

export const App = compose(
  withRouter
)(StatelessApp);

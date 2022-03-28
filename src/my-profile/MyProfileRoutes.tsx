import * as React from 'react';
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {alertError, authenticated, storage} from 'uione';
import MyProfileForm from './component/my-profile-form';
import MySettingsForm from './component/my-settings-form';

interface StateProps {
  anyProps?: any;
}

type AppProps = StateProps;
class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    const currentUrl = this.props.match.url;
    if (authenticated()) {
      return (
        <Switch>
          <Route path={currentUrl + '/my-settings'} exact={true} component={MySettingsForm} />
          <Route path={currentUrl} exact={true} component={MyProfileForm} />
        </Switch>
      );
    } else {
      const r = storage.resource();
      const title = r.value('error_permission');
      const msg = r.value('error_unauthorized');
      alertError(msg, title);
      return <Redirect to={{ pathname: '/auth', state: { from: this.props.location } }} />;
    }
  }
}

const MyProfileRoutes = compose(
  withRouter,
)(StatelessApp);
export default MyProfileRoutes;

// import {Component} from 'react';
// import * as React from 'react';
// import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';
// import {AuthorizationRequiredService} from './common/service/AuthorizationRequiredService';
//
// export const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render={props => (
//         AuthorizationRequiredService.isLoggedIn() ?
//             AuthorizationRequiredService.checkPrevileges(props.match.path)
//                 ? <Component {...props}/>
//                 : <Redirect to={{pathname: '401', state: {from: props.location}}}/>
//         : <Redirect to={{pathname: 'auth', state: {from: props.location}}}/>
//         )}/>
// );

import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {storage} from 'uione';
import {authorized} from './core/authorization';

interface PrivateRouteProps {
  rootUrl: string;
  path: string;
  component: any;
  exact: boolean;
  rootPath: string;
  setGlobalState: (data: any) => void;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
  const { component: Component, path, rootPath, exact, setGlobalState } = props;
  if (authorized(rootPath)) {
    return (
      <Route path={path} exact={exact} render={(propsRoute) => (<Component key={path} {...propsRoute} setGlobalState={setGlobalState}/>)}/>
    );
  } else {
    const resourceService = storage.resource();
    const title = resourceService.value('error_permission');
    const msg = resourceService.value('error_permission_view');
    storage.alert().alertError(msg, title);
    return <Redirect to={{pathname: '/auth'}}/>;
  }
};

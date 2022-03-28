import * as H from 'history';
import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {updateGlobalState} from 'redux-plus';
import {authenticated, storage} from 'uione';
import {WithDefaultProps} from '../core/default';
import {GroupDiffForm} from './component/group-diff-form';
import {GroupForm} from './component/group-form';
import {GroupsForm} from './component/groups-form';
import {RoleAssignmentDiffForm} from './component/role-assignment-diff-form';
import {RoleAssignmentForm} from './component/role-assignment-form';
import {RoleAssignmentsForm} from './component/role-assignments-form';
import {RoleDiffForm} from './component/role-diff-form';
import {RoleForm} from './component/role-form';
import {RolesForm} from './component/roles-form';
import {UserDiffForm} from './component/user-diff-form';
import {UserForm} from './component/user-form';
import {UsersForm} from './component/users-form';

interface AppProps {
  history: H.History;
  setGlobalState: (data: any) => void;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    if (authenticated()) {
      return (
        <React.Fragment>
          <Route path={this.props.match.url + '/bank-admin'} exact={true} component={WithDefaultProps(UsersForm)} />
          <Route path={this.props.match.url + '/bank-admin/add'} exact={true} component={WithDefaultProps(UserForm)} />
          <Route path={this.props.match.url + '/bank-admin/edit/:id'} exact={true} component={WithDefaultProps(UserForm)} />
          <Route path={this.props.match.url + '/bank-admin/approve/:id'} exact={true} component={WithDefaultProps(UserDiffForm)} />

          <Route path={this.props.match.url + '/access-role-definition'} exact={true} component={WithDefaultProps(RolesForm)} />
          <Route path={this.props.match.url + '/access-role-definition/add'} exact={true} component={WithDefaultProps(RoleForm)} />
          <Route path={this.props.match.url + '/access-role-definition/edit/:roleId/:cId'} exact={true} component={WithDefaultProps(RoleForm)} />
          <Route path={this.props.match.url + '/access-role-definition/approve/:roleId/:cId'} exact={true} component={WithDefaultProps(RoleDiffForm)} />

          <Route path={this.props.match.url + '/access-role-assignment'} exact={true} component={WithDefaultProps(RoleAssignmentsForm)} />
          <Route path={this.props.match.url + '/access-role-assignment/add'} exact={true} component={WithDefaultProps(RoleAssignmentForm)} />
          <Route path={this.props.match.url + '/access-role-assignment/edit/:roleId/:cId'} exact={true} component={WithDefaultProps(RoleAssignmentForm)} />
          <Route path={this.props.match.url + '/access-role-assignment/approve/:roleId/:cId'} exact={true} component={WithDefaultProps(RoleAssignmentDiffForm)} />

          <Route path={this.props.match.url + '/access-group'} exact={true} component={WithDefaultProps(GroupsForm)} />
          <Route path={this.props.match.url + '/access-group/add'} exact={true} component={WithDefaultProps(GroupForm)} />
          <Route path={this.props.match.url + '/access-group/edit/:groupId/:cId'} exact={true} component={WithDefaultProps(GroupForm)} />
          <Route path={this.props.match.url + '/access-group/approve/:groupId/:cId'} exact={true} component={WithDefaultProps(GroupDiffForm)} />
        </React.Fragment>
      );
    } else {
      const resourceService = storage.resource();
      const title = resourceService.value('error_permission');
      const msg = resourceService.value('error_unauthorized');
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

const RoleRoutes = compose(
  withRouter,
  withConnect
)(StatelessApp);
export default RoleRoutes;

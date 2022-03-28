import * as H from 'history';
import * as React from 'react';
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {WithDefaultProps} from '../core/default';
import {BookableForm} from './component/bookable-form';
import {BookablesForms} from './component/bookables-forms';
import {BookingForm} from './component/booking-form';
import {BookingsForm} from './component/bookings-form';
import {EventForm} from './component/event-form';
import {EventsForms} from './component/events-forms';
import {LocationForm} from './component/location-form';
import {LocationsForm} from './component/locations-form';

interface AppProps {
  history: H.History;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    return (
      <React.Fragment>
        <Route path={this.props.match.url + '/location'} exact={true} component={WithDefaultProps(LocationsForm)} />
        <Route path={this.props.match.url + '/location/add'} exact={true} component={WithDefaultProps(LocationForm)} />
        <Route path={this.props.match.url + '/location/edit/:id'} exact={true} component={WithDefaultProps(LocationForm)} />
        <Route path={this.props.match.url + '/bookable'} exact={true} component={WithDefaultProps(BookablesForms)} />
        <Route path={this.props.match.url + '/bookable/add'} exact={true} component={WithDefaultProps(BookableForm)} />
        <Route path={this.props.match.url + '/bookable/edit/:id'} exact={true} component={WithDefaultProps(BookableForm)} />
        <Route path={this.props.match.url + '/event'} exact={true} component={WithDefaultProps(EventsForms)} />
        <Route path={this.props.match.url + '/event/add'} exact={true} component={WithDefaultProps(EventForm)} />
        <Route path={this.props.match.url + '/event/edit/:id'} exact={true} component={WithDefaultProps(EventForm)} />
        <Route path={this.props.match.url + '/booking'} exact={true} component={WithDefaultProps(BookingsForm)} />
        <Route path={this.props.match.url + '/booking/add'} exact={true} component={WithDefaultProps(BookingForm)} />
        <Route path={this.props.match.url + '/booking/edit/:id'} exact={true} component={WithDefaultProps(BookingForm)} />
      </React.Fragment>
    );
  }
}

const LocationRoutes = compose(
  withRouter,
)(StatelessApp);
export default LocationRoutes;


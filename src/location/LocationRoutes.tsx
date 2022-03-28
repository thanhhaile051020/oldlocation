import * as H from 'history';
import * as React from 'react';
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';

import {WithDefaultProps} from '../core/default';
import BookingForm from './component/booking-form';
import {BookingsForm} from './component/bookings-form';
import LocationForm from './component/location-form';
import {LocationsForm} from './component/locations-form';
import TourForm from './component/tour-form';
import {ToursForm} from './component/tours-form';
import TripForm from './component/trip-form';
import {TripsForm} from './component/trips-form';

interface AppProps {
    history: H.History;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
    render() {
        return (
            <>
                <Route path={this.props.match.url + '/location/:id'} exact={true} component={WithDefaultProps(LocationForm)} />
                <Route path={this.props.match.url + '/location/:id/review'} exact={true} component={WithDefaultProps(LocationForm)} />
                <Route path={this.props.match.url + '/location/:id/photo'} exact={true} component={WithDefaultProps(LocationForm)} />
                <Route path={this.props.match.url + '/location/:id/about'} exact={true} component={WithDefaultProps(LocationForm)} />
                <Route path={this.props.match.url + '/location/:id/bookable'} exact={true} component={WithDefaultProps(LocationForm)} />
                <Route path={this.props.match.url + '/location/:id/bookable/add'} exact={true} component={WithDefaultProps(LocationForm)} />

                <Route path={this.props.match.url + '/location' } exact={true} component={WithDefaultProps(LocationsForm)} />
                <Route path={this.props.match.url + '/tour'} exact={true} component={WithDefaultProps(ToursForm)} />
                <Route path={this.props.match.url + '/tour/:id'} exact={true} component={WithDefaultProps(TourForm)} />
                <Route path={this.props.match.url + '/trip'} exact={true} component={WithDefaultProps(TripsForm)} />
                <Route path={this.props.match.url + '/trip/:id'} exact={true} component={WithDefaultProps(TripForm)} />
                <Route path={this.props.match.url + '/booking'} exact={true} component={WithDefaultProps(BookingsForm)} />
                <Route path={this.props.match.url + '/booking/:id'} exact={true} component={WithDefaultProps(BookingForm)} />
                {/*<Route path={this.props.match.url + '/event-scheduler'} exact={true} component={WithDefaultProps(EventScheduler)} />*/}
            </>
        );
    }
}

const LocationRoutes = compose(
    withRouter,
)(StatelessApp);
export default LocationRoutes;


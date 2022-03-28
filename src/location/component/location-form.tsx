import * as React from 'react';
import {BaseComponent, HistoryProps} from 'react-onex';
import {NavLink, Route} from 'react-router-dom';
import {getLocale, storage} from 'uione';
import imageOnline from '../../assets/images/status/online.svg';
import applicationContext from '../config/ApplicationContext';
import About from './about';
import AddBooking from './add-booking-form';
import Bookable from './bookables-form';
import OverView from './overview';
import Photo from './photo';
import Review from './review';

interface InternalState {
  isEditingAbout: boolean;
  isEditingInterest: boolean;
  isEditingAchievement: boolean;
  achievementName: string;
  hightLightAchie: string;
  achievementDes: string;
}

export default class LocationForm extends BaseComponent<HistoryProps, InternalState> {
  private id;
  constructor(props) {
    super(props, storage.resource(),storage.ui(), getLocale, storage.loading());
    if (props.match) {
      this.id = (props.id ? props.id : props.match.params.id);
    } else {
      this.id = (props['props']['id'] ? props['props']['id'] : props['props'].match.params.id);
    }
    this.state = {
      objectReviews: [],
      location: {},
    };
  }
  private readonly locationService = applicationContext.getLocationService();
  private readonly locationRateService = applicationContext.getLocationRateService();
  async componentDidMount() {
    const location = await this.locationService.load(this.id);
    // this.setState({ location }, this.loadData);
    this.setState({ location });
  }
  test = () => {
    console.log('test');
  }

  recieve = (obj) => {
    console.log('obj', obj);
  }

  render() {
    const { location } = this.state;
    return (
      <div className='profile view-container'>
        <form id='locationForm' name='locationForm'>
          <header className='border-bottom-highlight'>
            <div className='cover-image'>
              {
                (location.thumbnail) && <img src={`data:image/jpeg;base64,${location.thumbnail}`} />
                || <img src='https://pre00.deviantart.net/6ecb/th/pre/f/2013/086/3/d/facebook_cover_1_by_alphacid-d5zfrww.jpg' />
              }
              <div className='contact-group'>
                <button id='btnPhone' name='btnPhone' className='btn-phone'/>
                <button id='btnEmail' name='btnEmail' className='btn-email'/>
              </div>
              <button id='btnFollow' name='btnFollow' className='btn-follow'>Follow</button>
            </div>
            <button id='btnCamera' name='btnCamera' className='btn-camera'/>
            <div className='avatar-wrapper'>
              <img className='avatar' src={location.image || 'https://www.bluebridgewindowcleaning.co.uk/wp-content/uploads/2016/04/default-avatar.png'} />
              <img className='profile-status' alt='status' src={imageOnline} />
            </div>
            <div className='profile-title'>
              <h3>{location.locationName}</h3>
              <p>{location.description}</p>
              <p>500 followers</p>
            </div>
            {/*
            <div className='card'>
              <h3>{location.locationName}</h3>
              <p>{location.description}</p>
            </div>*/}
            <nav className='menu'>
              <ul>
                <li><NavLink to={`/tripal/location/${this.id}`} exact={true} > Overview </NavLink></li>
                <li><NavLink to={`/tripal/location/${this.id}/bookable`} exact={true} > Bookable </NavLink></li>
                <li><NavLink to={`/tripal/location/${this.id}/review`} exact={true} > Review </NavLink></li>
                <li><NavLink to={`/tripal/location/${this.id}/photo`} exact={true} > Photo </NavLink></li>
                <li><NavLink to={`/tripal/location/${this.id}/about`} exact={true} > About </NavLink></li>
              </ul>
            </nav>
          </header>
          <div className='row'>
            <Route path='/tripal/location/:id' exact={true} render={() => <OverView location={location} />} />
            <Route path='/tripal/location/:id/bookable' exact={true} component={() => <Bookable  locationId = {this.id}  location={this.props.location} history={this.props.history}/>} />
            <Route path='/tripal/location/:id/review' exact={true} component={() => <Review locationId = {this.id}/>}/>
            <Route path='/tripal/location/:id/photo' exact={true} component={Photo}/>
            <Route path='/tripal/location/:id/about' exact={true} component={About}/>
            <Route path='/tripal/location/:id/bookable/add' exact={true} component={() => <AddBooking locationId = {this.id} recieve={this.recieve}/>}/>
          </div>
        </form>
      </div>
    );
  }
}


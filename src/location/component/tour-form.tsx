import * as React from 'react';
import {BaseComponent, HistoryProps} from 'react-onex';
import {getLocale, handleError, storage} from 'uione';
import imageOnline from '../../assets/images/status/online.svg';
import applicationContext from '../config/ApplicationContext';

interface InternalState {
  isEditingAbout: boolean;
  isEditingInterest: boolean;
  isEditingAchievement: boolean;
  achievementName: string;
  hightLightAchie: string;
  achievementDes: string;
}

export default class TourForm extends BaseComponent<HistoryProps, InternalState> {
  private id;
  constructor(props) {
    super(props,storage.resource(), storage.ui(), getLocale, storage.loading());
    if (props.match) {
      this.id = (props.id ? props.id : props.match.params.id);
    } else {
      this.id = (props['props']['id'] ? props['props']['id'] : props['props'].match.params.id);
    }
    this.state = {
      tour: {},
    };
  }
  private readonly tourService = applicationContext.getTourService();
  componentDidMount() {
    this.tourService.load(this.id).then(tour => {
      // this.setState({ tour }, this.loadData);
      this.setState({ tour });
    }).catch(handleError);
  }
  render() {
    const { tour } = this.state;
    return (
      <div className='profile view-container'>
        <form id='locationForm' name='locationForm'>
          <header className='border-bottom-highlight'>
            <picture className='cover-image'>
              <img
                src='https://pre00.deviantart.net/6ecb/th/pre/f/2013/086/3/d/facebook_cover_1_by_alphacid-d5zfrww.jpg' />
            </picture>
            <div className='profile-wallpaper-wrapper'>
              <div className='avatar-wrapper'>
                <img className='avatar'
                  src={'https://www.bluebridgewindowcleaning.co.uk/wp-content/uploads/2016/04/default-avatar.png'} />
                <img className='profile-status' alt='status'
                  src={imageOnline} />
              </div>
              <div className='profile-title'>
                <h3>CNBC International</h3>
                <p>Technology Channel</p>
              </div>
              <div className='profile-description'>
                <a><i className='fa fa-user-o highlight' /> Followers <span>100</span></a>
                <a><i className='fa fa-user-o highlight' /> Following <span>100</span></a>
              </div>
            </div>
          </header><br /><br /><br /><br /><br /><br />
          <div className='row'>
            <h3>Tour</h3>
            <h4>Tour id: {tour.tourId}</h4>
            <h4>Start Time: {`${tour.startTime}`}</h4>
            <h4>End Time: {`${tour.endTime}`}</h4>
            <h4>Locations: </h4>
            <form className='list-result'>
              <div className='table-responsive'>
                <table>
                  <thead>
                    <tr>
                      <th data-field='locationId'><button type='button' id='sortUserId' >Location id</button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tour.locations && tour.locations.map((trip, i) => {
                      return (
                        <tr key={i}>
                          <td>{trip}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </form>
      </div>
    );
  }
}

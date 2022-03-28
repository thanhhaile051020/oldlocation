import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import {alertError, getLocale, showToast, storage} from 'uione';
import imageOnline from '../../assets/images/status/online.svg';
import applicationContext from '../config/ApplicationContext';
import {Trip} from '../model/Trip';
import {TripSM} from '../search-model/TripSM';

export class TripsForm extends SearchComponent<Trip, TripSM, HistoryProps, SearchState<Trip>> {
  constructor(props) {
    super(props, applicationContext.getTripService(), storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      keyword: '',
      results: [],
      locationName: ''
    };
  }
  viewDetail = (e, id: string) => {
    e.preventDefault();
    this.props.history.push(`trip/${id}`);
  }
  protected clearUserId = () => {
    this.setState({
      locationName: ''
    });
  }
  render() {
    console.log('trip', this.state.result);
    const resource = this.resource;
    const { locationName } = this.state;
    return (
      <div className='profile view-container'>
        <form id='toursForm' name='toursForm' ref='form'>
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
            <form className='list-result'>
              <section className='row search-group'>
                <label className='col s12 m6 search-input'>
                  <input type='text'
                    id='locationName' name='locationName'
                    value={locationName}
                    onChange={this.updateState}
                    maxLength={255}
                    placeholder={resource.search} />
                  <button type='button' hidden={!this.state.locationName} className='btn-remove-text' onClick={this.clearUserId} />
                  <button type='submit' className='btn-search' onClick={this.searchOnClick} />
                </label>
              </section>
              <div className='table-responsive'>
                <table>
                  <thead>
                    <tr>
                      <th>{resource.sequence}</th>
                      <th data-field='tripId'><button type='button' id='sortUserId' onClick={this.sort}>Trip id</button></th>
                      <th data-field='StartTime'><button type='button' id='sortRoleType' onClick={this.sort}>Start Time</button></th>
                      <th data-field='EndTime'><button type='button' id='sortActivate' onClick={this.sort}>End Time</button></th>
                      <th data-field='locations'><button type='button' id='sortCtrlStatus' onClick={this.sort}>Locations</button></th>
                      <th className='action'>{resource.quick_action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state && this.state.results && this.state.results.map((trip, i) => {
                      return (
                        <tr key={i}>
                          <td className='text-right'>{trip.sequenceNo}</td>
                          <td>{trip.tripId}</td>
                          <td>{`${trip.startTime}`}</td>
                          <td>{`${trip.endTime}`}</td>
                          <td>{trip.locations ? trip.locations[0].locationId : null}</td>
                          <td>
                            <button type='button' className={this.editable ? 'btn-edit' : 'btn-view'}
                              onClick={(e) => this.viewDetail(e, trip.tripId)} />
                          </td>
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

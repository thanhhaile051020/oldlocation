import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import {alertError, getLocale, showToast, storage} from 'uione';
import imageOnline from '../../assets/images/status/online.svg';
import applicationContext from '../config/ApplicationContext';
import {Booking} from '../model/Booking';
import {BookingSM} from '../search-model/BookingSM';

export class BookingsForm extends SearchComponent<Booking, BookingSM, HistoryProps, SearchState<Booking>> {
  constructor(props) {
    super(props, applicationContext.getBookingService(), storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      keyword: '',
      results: [],
      locationName: ''
    };
  }
  viewDetail = (e, id: string) => {
    e.preventDefault();
    this.props.history.push(`booking/${id}`);
  }
  protected clearUserId = () => {
    this.setState({
      locationName: ''
    });
  }
  render() {
    const resource = this.resource;
    const { locationName } = this.state;
    return (
      <div className='profile view-container'>
        <form id='locationsForm' name='locationsForm' ref='form'>
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
                      <th data-field='bookingId'><button type='button' id='sortLocationId' onClick={this.sort}>Booking Id</button></th>
                      <th data-field='userId'><button type='button' id='sortLocationName' onClick={this.sort}>User Id</button></th>
                      <th data-field='bookableId'><button type='button' id='sortDescription' onClick={this.sort}>Bookable Id</button></th>
                      <th data-field='subject'><button type='button' id='sortLongitude' onClick={this.sort}>Subject</button></th>
                      <th data-field='description'><button type='button' id='sortLatitude' onClick={this.sort}>Description</button></th>
                      <th data-field='startBookingTime'><button type='button' id='sortType' onClick={this.sort}>Start Booking Time</button></th>
                      <th data-field='endBookingTime'><button type='button' id='sortType' onClick={this.sort}>End Booking Time</button></th>
                      <th data-field='status'><button type='button' id='sortType' onClick={this.sort}>Status</button></th>
                      <th className='action'>{resource.quick_action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state && this.state.results && this.state.results.map((booking, i) => {
                      return (
                        <tr key={i}>
                          <td className='text-right'>{booking.sequenceNo}</td>
                          <td>{booking.bookingId}</td>
                          <td>{booking.userId}</td>
                          <td>{booking.bookableId}</td>
                          <td>{booking.subject}</td>
                          <td>{booking.description}</td>
                          <td>{`${booking.startBookingTime}`}</td>
                          <td>{`${booking.endBookingTime}`}</td>
                          <td>{booking.status}</td>
                          <td>
                            <button type='button' className={this.editable ? 'btn-edit' : 'btn-view'}
                              onClick={(e) => this.viewDetail(e, booking.bookingId)} />
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

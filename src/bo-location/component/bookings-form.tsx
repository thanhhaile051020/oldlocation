import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Booking} from '../model/Booking';
import {BookingSM} from '../search-model/BookingSM';

export class BookingsForm extends SearchComponent<Booking, BookingSM, HistoryProps, SearchState<Booking>> {
  constructor(props) {
    super(props, applicationContext.bookingService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      keyword: '',
      results: [],
      bookingName: ''
    };
  }
  private bookingService = applicationContext.bookingService;
/*
  async initData() {
    const results = await this.bookingService.search(this.state.keyword);
    this.setState({
      results: results.results
    });
  }
*/
  viewDetail = (e, id: string) => {
    e.preventDefault();
    this.props.history.push(`booking/edit/${id}`);
  }

  protected clearSearch = () => {
    this.setState({
      bookingName: ''
    });
  }

  navigate(stateTo: string, props?: any) {
    this.props.history.push(stateTo, props);
  }

  render() {
    const BookingStatus = {
      N: 'New',
      S: 'Submitted',
      A: 'Approved',
      R: 'Rejected',
      C: 'Cancelled',
    };
    const resource = this.resource;
    const { bookingName } = this.state;
    console.log(this.state);
    return (
      <div className='profile view-container'>
        <div className='row'>
          <form className='list-result'>
            <section className='row search-group'>
              <label className='col s6 m6 search-input'>
                <input type='text'
                  id='bookingName' name='bookingName'
                  value={bookingName}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.search + ' Booking'} />
                <button type='button' hidden={!this.state.bookingName} className='btn-remove-text'
                  onClick={this.clearSearch} />
                <button type='submit' className='btn-search' onClick={this.searchOnClick} />
              </label>
            </section>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field='bookingId'>
                      <button type='button' id='sortBookingId' onClick={this.sort}>Booking Id</button>
                    </th>
                    <th data-field='userId'>
                      <button type='button' id='sortUserId' onClick={this.sort}>User Id</button>
                    </th>
                    <th data-field='bookableId'>
                      <button type='button' id='sortBookableId' onClick={this.sort}>Bookable Id</button>
                    </th>
                    <th data-field='subject'>
                      <button type='button' id='sortSubject' onClick={this.sort}>Subject</button>
                    </th>
                    <th data-field='description'>
                      <button type='button' id='sortDescription' onClick={this.sort}>Description</button>
                    </th>
                    <th data-field='startBookingTime'>
                      <button type='button' id='sortStartBookingTime' onClick={this.sort}>Start Booking Time</button>
                    </th>
                    <th data-field='endBookingTime'>
                      <button type='button' id='sortEndBookingTime' onClick={this.sort}>End Booking Time</button>
                    </th>
                    <th data-field='status'>
                      <button type='button' id='sortStatus' onClick={this.sort}>Status</button>
                    </th>
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
                        <td>{`${booking.startBookingTime.toLocaleDateString()}`}</td>
                        <td>{`${booking.endBookingTime.toLocaleDateString()}`}</td>
                        <td>{BookingStatus[booking.status]}</td>
                        <td>
                          <button type='button'
                            className={this.editable ? 'btn-edit' : 'btn-view'}
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
      </div>
    );
  }

}

import * as React from 'react';
import {DayModifiers} from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {EditComponent, HistoryProps} from 'react-onex';
import {alertError, confirm, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Booking} from '../model/Booking';

interface InternalState {
  booking: Booking;
}

export class BookingForm extends EditComponent<Booking, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.bookingService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      bookableId: props.props && props.props.location && props.props.location.state && props.props.location.state.bookableId ? props.props.location.state.bookableId : '',
      bookingId: '',
      description: '',
      endBookingTime: '',
      startBookingTime: '',
      status: '',
      subject: '',
      userId: '',
    };
  }
  id: string;
  private readonly bookingService = applicationContext.bookingService;

  async load(id: string) {
    this.id = id;
    if (this.id) {
      const data = await this.bookingService.load(id);
      console.log(data);
      this.setState({
        ...data
      });
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(preState => {
      const booking = Object.assign({}, preState);
      booking[name] = value;
      return { ...booking };
    });
  }

  protected updateDayPicker(day: Date, dayModifiers: DayModifiers, dayPickerInput: DayPickerInput) {
    const ctr = dayPickerInput;
    const props: any = ctr.props;
    const value = ctr.state.value;
    const dataField = props['data-field'];
    const valueSplit = value.split('/');
    const date = new Date(valueSplit[2], valueSplit[0] - 1, valueSplit[1]);

    this.setState(preState => {
      const booking = Object.assign({}, preState);
      booking[dataField] = date;
      return { ...booking };
    });
  }

  back = () => {
    this.props.history.push('/bo-tripal/booking');
  }

  render() {
    const resource = this.resource;
    const booking = this.state;
    const bookingID = this.id ?
      <>
        <label className='col s12 m6' htmlFor='bookableId'>
          Bookable ID
          <input
            id='bookableId'
            type='text'
            name='bookableId'
            value={booking.bookableId}
            readOnly={true} />
        </label>
        <label className='col s12 m6' htmlFor='bookingId'>
          Booking ID
          <input
            id='bookingId'
            type='text'
            name='bookingId'
            value={booking.bookingId}
            readOnly={true} />
        </label>
      </>
      :
      <>
        <label className='col s12 m12' htmlFor='bookableId'>
          Bookable ID
          <input
            id='bookableId'
            type='text'
            name='bookableId'
            value={booking.bookableId}
            readOnly={true} />
        </label>
      </>;
    return (
      <div className='view-container'>
        <form id='bookingForm' name='bookingForm' model-name='booking' ref='form' noValidate={true}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{!this.id ? resource.create : resource.edit} Booking</h2>
          </header>
          <div className='row'>
            {bookingID}
            <label className='col s12 m6' htmlFor='description'>
              Description
              <input
                id='description'
                type='text'
                name='description'
                value={booking.description}
                onChange={this.handleChange}
                readOnly={true} />
            </label>
            <label className='col s12 m6' htmlFor='startBookingTime'>
              Start Booking Time
              <input
                id='startBookingTime'
                type='text'
                name='startBookingTime'
                value={booking.startBookingTime}
                onChange={this.handleChange}
                readOnly={true} />
            </label>

            <label className='col s12 m6' htmlFor='endBookingTime'>
              End Booking Time
              <input
                id='endBookingTime'
                type='text'
                name='endBookingTime'
                value={booking.endBookingTime}
                onChange={this.handleChange}
                readOnly={true} />
            </label>
            <label className='col s12 m6' htmlFor='status'>
              Status
              <input
                id='status'
                type='text'
                name='status'
                value={booking.status}
                onChange={this.handleChange}
                readOnly={true} />
            </label>
            <label className='col s12 m6' htmlFor='subject'>
              Subject
              <input
                id='subject'
                type='text'
                name='subject'
                value={booking.subject}
                onChange={this.handleChange}
                readOnly={true} />
            </label>
            <label className='col s12 m6' htmlFor='userId'>
              User ID
              <input
                id='userId'
                type='text'
                name='userId'
                value={booking.userId}
                onChange={this.handleChange}
                readOnly={true} />
            </label>
          </div>
          {/*<footer>*/}
          {/*</footer>*/}
        </form>
      </div>
    );
  }
}

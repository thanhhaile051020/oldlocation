import * as React from 'react';
import {Component} from 'react';
import {storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Booking} from '../model/Booking';

export default class AddBookingForm extends Component<any, any> {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      bookingId: '',
      description: '',
      endBookingTime: '',
      startBookingTime: '',
      status: 'N',
      subject: '',
      userId: '',
      bookableId: ''
    };
  }

  private readonly bookingService = applicationContext.getBookingService();
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }

  timeConvert(date) {
    let time = this.createDateAsUTC(date).toISOString();
    time = time.slice(0, 16);
    return time;
  }
  componentDidMount() {
    const props = this.props;
    this.setState({
      startBookingTime: this.timeConvert(props.objTimeBooking.startTime),
      endBookingTime: this.timeConvert(props.objTimeBooking.endTime),
      bookableId: props.bookableSelect.bookableId
    });
  }

  closeModal = (index) => {
    this.props.closeModal(index);
  }

  async submit(event) {
    event.preventDefault();
    if (!this.state.bookingId) {
      const { bookingId,
        description,
        endBookingTime,
        startBookingTime,
        status,
        subject,
        userId,
        bookableId } = this.state;
      const startTime1 = startBookingTime + ':00Z';
      const endTime1 = endBookingTime + ':00Z';
      if (!description || !subject || !userId) {
        storage.alert().alertError('Please fill enough field!!');
      } else {
        const booking: Booking = {};
        booking.bookableId = bookableId;
        booking.bookingId = bookingId;
        booking.status = status;
        booking.subject = subject;
        booking.userId = userId;
        booking.description = description;
        booking.startBookingTime = new Date(startTime1);
        booking.endBookingTime = new Date(endTime1);
        const res = await this.bookingService.submit(booking);
        // @ts-ignore
        if (res['status'] === 'C') {
          storage.alert().alertError('Error');
          this.closeModal(1);
          this.props.changeDate(this.createDateAsUTC(booking.startBookingTime));
        } else {
          storage.alert().alertSuccess('Success');
          this.closeModal(1);
          this.props.changeDate(this.createDateAsUTC(booking.startBookingTime));
        }
      }
    } else {

    }
  }

  render() {
    const state = this.state;
    const a = this.props;
    console.log('a: ', a);
    return (
      <>
        <div className='view-container'>
          <form id='bookingForm' name='bookingForm' model-name='booking' ref='form' noValidate={true}>
            <header>
              <button type='button' id='btnClose' name='btnClose' className='btn-close' onClick={() => this.closeModal(1)} />
              <h2>Add Booking</h2>
            </header>
            <div className='row'>
              <label className='col s12 m12' htmlFor='description'>
                Bookable Id
                <input
                  id='bookableId'
                  type='text'
                  name='bookableId'
                  disabled={true}
                  value={state.bookableId}
                />
              </label>
              <label className='col s12 m12' htmlFor='description'>
                Booking Id
                <input
                  id='bookingId'
                  type='text'
                  name='bookingId'
                  disabled={true}
                  value={state.bookingId}
                />
              </label>
              <label className='col s12 m12' htmlFor='startBookingTime'>
                Start Booking Time
                <input
                  type='datetime-local'
                  id='startBookingTime'
                  name='startBookingTime'
                  disabled={true}
                  value={state.startBookingTime}
                  placeholder='' />
              </label>
              <label className='col s12 m12' htmlFor='endBookingTime'>
                End Booking Time
                <input
                  type='datetime-local'
                  id='endBookingTime'
                  name='endBookingTime'
                  disabled={true}
                  value={state.endBookingTime}
                  placeholder='' />
              </label>
              <label className='col s12 m12' htmlFor='status'>
                User ID
                <input
                  id='userId'
                  type='text'
                  name='userId'
                  value={state.userId}
                  onChange={this.handleChange}
                />
              </label>
              <label className='col s12 m12' htmlFor='subject'>
                Subject
                <input
                  id='subject'
                  type='text'
                  name='subject'
                  value={state.subject}
                  onChange={this.handleChange}
                />
              </label>
              <label className='col s12 m12' htmlFor='userId'>
                Description
                <input
                  id='description'
                  type='text'
                  name='description'
                  value={state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label className='col s12 m12' htmlFor='userId'>
                Status
                <input
                  id='status'
                  type='text'
                  name='status'
                  disabled={true}
                  value={state.status}
                />
              </label>
            </div>
            <footer>
              <button type='submit' id='btnSave' name='btnSave' onClick={this.submit}>
                Submit
                            </button>
            </footer>
          </form>
        </div>
      </>
    );
  }
}

import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {alertError, confirm, getLocale, handleError, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Event} from '../model/Event';

interface InternalState {
  event: Event;
}

export class EventForm extends EditComponent<Event, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.eventService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      eventName: '',
      startTime: '',
      endTime: '',
      locationId: '',
      lat: '',
      long: ''
    };
    this.saveModel = this.saveModel.bind(this);
  }
  id: string;
  private readonly eventService = applicationContext.eventService;

  async load(id: string) {
    this.id = id;
    if (this.id) {
      const data = await this.eventService.load(id);
      let startTimeConvert = data['startTime'].toISOString();
      startTimeConvert = startTimeConvert.slice(0, 16);
      let endTimeConvert = data.endTime.toISOString();
      endTimeConvert = endTimeConvert.slice(0, 16);
      this.setState({
        eventName: data.eventName,
        startTime: startTimeConvert,
        endTime: endTimeConvert,
        locationId: data.locationId,
        lat: data.lat,
        long: data.long
      });
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async saveModel(event) {
    event.preventDefault();
    const {
      eventName,
      startTime,
      endTime,
      locationId,
      lat,
      long
    } = this.state;
    const startTime1 = startTime + ':00Z';
    const endTime1 = endTime + ':00Z';

    // @ts-ignore
    const event1: Event = {};
    event1.eventName = eventName;
    event1.startTime = new Date(startTime1);
    event1.endTime = new Date(endTime1);
    event1.locationId = locationId;
    event1.lat = Number(lat);
    event1.long = Number(long);
    event1.eventId = this.id;

    try {
      if (this.id) {
        await this.service.update(event1);
        storage.toast().showToast('Update Event Success!');
        this.props.history.push('/tripal/event');
      } else {
        await this.service.insert(event1);
        storage.toast().showToast('Insert Event Success!');
        this.props.history.push('/tripal/event');
      }
    } catch (err) {
      handleError(err);
    }
    /*
    if (this.id) {
      this.service.update(event1).subscribe((res) => {
        storage.toast().showToast('Update Event Success!');
        this.navigate('/tripal/event');
      }, this.handleError);
    } else {
      this.service.insert(event1).subscribe((res) => {
        storage.toast().showToast('Insert Event Success!');
        this.navigate('/tripal/event');
      }, this.handleError);
    }
    */
  }

  back = () => {
    this.props.history.push('/bo-tripal/event');
  }

  render() {
    const resource = this.resource;
    const {
      eventName,
      startTime,
      endTime,
      locationId,
      lat,
      long
    } = this.state;
    return (
      <div className='view-container'>
        <form id='bookableForm' name='bookableForm' model-name='bookable' ref='form' noValidate={true}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{this.newMode ? resource.create : resource.edit} Event</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6 required' htmlFor='eventName'>
              Event Name
              <input
                id='eventName'
                type='text'
                name='eventName'
                value={eventName}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' data-field='startTime'>
              Start Time
              <input
                type='datetime-local'
                id='startTime'
                name='startTime'
                onChange={this.handleChange}
                value={startTime}
                placeholder='start time' />
            </label>
            <label className='col s12 m6' data-field='endTime'>
              End Time
              <input
                type='datetime-local'
                id='endTime'
                name='endTime'
                onChange={this.handleChange}
                value={endTime}
                placeholder='end time' />
            </label>
            <label className='col s12 m6' htmlFor='locationId'>
              Locataion Id
              <input
                id='locationId'
                type='text'
                name='locationId'
                value={locationId}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='lat'>
              Lat
              <input
                id='lat'
                type='number'
                name='lat'
                value={lat}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='long'>
              Long
              <input
                id='long'
                type='number'
                name='long'
                value={long}
                onChange={this.handleChange} />
            </label>
          </div>
          <footer>
            {
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveModel}>
                {resource.save}
              </button>
            }
          </footer>
        </form>
      </div>
    );
  }
}

import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {alertError, confirm, getLocale, handleError, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Bookable} from '../model/Bookable';

interface InternalState {
  bookable: Bookable;
}

export class BookableForm extends EditComponent<Bookable, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.bookableService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      bookableName: '',
      bookableDescription: '',
      bookableCapacity: '',
      image: '',
      locationId: '',
      bookableType: '',
      listType: [{
        name: 'Room',
        value: 'R'
      },
      {
        name: 'Projector',
        value: 'P'
      }]
    };
    this.saveModel = this.saveModel.bind(this);
  }
  id: string;
  private readonly bookableService = applicationContext.bookableService;

  async load(id: string) {
    this.id = id;
    if (this.id) {
      const data = await this.bookableService.load(id);
      this.setState({
        bookableName: data.bookableName,
        bookableDescription: data.bookableDescription,
        bookableCapacity: data.bookableCapacity,
        image: data.image,
        locationId: data.locationId,
        bookableType: data.bookableType
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
      bookableName,
      bookableDescription,
      bookableCapacity,
      image,
      locationId,
      bookableType
    } = this.state;
    const bookable: Bookable = {};
    bookable.bookableCapacity = bookableCapacity;
    bookable.bookableName = bookableName;
    bookable.bookableDescription = bookableDescription;
    bookable.image = image;
    bookable.locationId = locationId;
    bookable.bookableType = bookableType;
    bookable.bookableId = this.id;
    if (this.id) {
      try {
        await this.service.update(bookable);
        storage.toast().showToast('Update Bookable Success!');
        this.props.history.push('/bo-tripal/bookable');
      } catch (err) {
        handleError(err);
      }
    } else {
      try {
        await this.service.insert(bookable);
        storage.toast().showToast('Insert Bookable Success!');
        this.props.history.push('/bo-tripal/bookable');
      } catch (err) {
        handleError(err);
      }
    }
    /*
    if (this.id) {
      this.service.update(bookable).subscribe((res) => {
        storage.toast().showToast('Update Bookable Success!');
        this.navigate('/bo-tripal/bookable');
      }, this.handleError);
    } else {
      this.service.insert(bookable).subscribe((res) => {
        storage.toast().showToast('Insert Bookable Success!');
        this.navigate('/bo-tripal/bookable');
      }, this.handleError);
    }
    */
  }

  back = () => {
    this.props.history.push('/bo-tripal/bookable');
  }

  render() {
    const resource = this.resource;
    const {
      bookableName,
      bookableDescription,
      bookableCapacity,
      image,
      locationId,
      bookableType
    } = this.state;
    return (
      <div className='view-container'>
        <form id='bookableForm' name='bookableForm' model-name='bookable' ref='form' noValidate={true}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{this.newMode ? resource.create : resource.edit} Bookable</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6 required' htmlFor='bookableName'>
              Bookable Name
              <input
                id='bookableName'
                type='text'
                name='bookableName'
                value={bookableName}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6 required' htmlFor='bookableDescription'>
              Bookable Description
              <input
                id='bookableDescription'
                type='text'
                name='bookableDescription'
                value={bookableDescription}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='bookableType'>
              Bookable Type
              <select id='bookableType' name='bookableType'
                value={bookableType}
                onChange={this.handleChange}
                required={true}
              >
                )
                  {this.state.listType.map((item, index) => (
                  <option key={index} value={item.value}>{item.name}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6' htmlFor='bookableCapacity'>
              Bookable Capacity
              <input
                id='bookableCapacity'
                type='number'
                name='bookableCapacity'
                value={bookableCapacity}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='image'>
              Image
              <input
                id='image'
                type='text'
                name='image'
                value={image}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='locationId'>
              Location Id
              <input
                id='locationId'
                type='text'
                name='locationId'
                value={locationId}
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

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import {Map as LeafletMap, Marker, Popup, TileLayer} from 'react-leaflet';
import Modal from 'react-modal';
import {buildId, EditComponent, HistoryProps} from 'react-onex';
import {clone} from 'reflectx';
import {alertError, confirm, getLocale, handleError, initForm, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Location} from '../model/Location';
import {LocationMapForm} from './location-map-form';

interface InternalState {
  location: Location;
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};
Modal.setAppElement('#root');
export class LocationForm extends EditComponent<Location, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.locationService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      location: {
        locationName: '', description: '', longitude: '', latitude: '', type: '', thumbnail: '', imageName: '',
        info: { viewCount: '', rateLocation: '', rate: '', rate1: '', rate2: '', rate3: '', rate4: '', rate5: '' }
      },
      modalIsOpen: false,
      markers: [{ lat: 10.854886268472459, lng: 106.63051128387453 }]
    };
    this.saveModel = this.saveModel.bind(this);
  }
  id: string;
  readonly locationService = applicationContext.locationService;
  componentDidMount() {
    this.form = initForm(this.ref.current, this.ui.initMaterial);
    const id = buildId<string>(this.keys, this.props);
    const defaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = defaultIcon;
    this.id = id;
    this.load(id);
  }
  async load(id: string) {
    if (id) {
      const data = await this.locationService.load(id);
      this.setState({ location: data['0'], markers: [{ lat: data['0'].latitude, lng: data['0'].longitude }] });
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(preState => {
      const location = Object.assign({}, preState.location);
      if (name !== 'rate' && name !== 'rate1' && name !== 'rate2' && name !== 'rate3' && name !== 'rate4' && name !== 'rate5' && name !== 'viewCount') {
        location[name] = isNaN(value) ? value : Number(value);
      } else {
        location.info[name] = Number(value);
      }
      return { location };
    });
  }

  private onSelectFile = (event) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.match('image/*')) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          const base64File = reader.result.split(',')[1];
          this.setState(prevState => ({
            location: {
              ...prevState.location,
              thumbnail: base64File,
              imageName: file.name

            }
          }));
        };
      } else {
        event.target.value = '';
        // this.messageDialogService.alert('Error', 'Only image file are allowed!', 'Close').subscribe(() => {
        // });
      }
    }
  }

  async saveModel(event) {
    event.preventDefault();
    if (this.id) {
      const data = clone(this.state.location);
      if (data.info) {
        delete data.info;
      }
      try {
        await this.service.update(data);
        storage.toast().showToast('Update Location Success!');
        this.props.history.push('/bo-tripal/location');
      } catch (err) {
        handleError(err);
      }
    } else {
      const data = clone(this.state.location);
      if (data.info) {
        delete data.info;
      }
      try {
        await this.service.insert(data);
        storage.toast().showToast('Insert Location Success!');
        this.props.history.push('/bo-tripal/location');
      } catch (err) {
        handleError(err);
      }
    }
  }

  back = () => {
    this.props.history.push('/bo-tripal/location');
  }

  closeModal = (index, position) => {
    if (index === 1) {
      this.setState({ modalIsOpen: false });
    }
  }
  openModal = (e, index) => {
    e.preventDefault();
    if (index === 1) {
      this.setState({ modalIsOpen: true });
    }
  }
  saveModal = (e, lat, long) => {
    const { location } = this.state;
    location['latitude'] = lat;
    location['longitude'] = long;
    this.setState({ location, markers: [{ lat, lng: long }] });
  }
  render() {
    const resource = this.resource;
    const location = this.state.location;
    const _this = this;
    const locationInfo = this.id ? <Info {...location.info} /> : null;
    function Info(props) {
      return (
        <>
          <label className='col s12 m6' htmlFor='viewCount'>
            View Count
            <input
              id='viewCount'
              type='number'
              min={0}
              name='viewCount'
              value={props.viewCount}
              onChange={_this.handleChange} />
          </label>

          <label className='col s12 m2' htmlFor='rate'>
            Rate
            <input
              id='rate'
              type='number'
              min={0}
              name='rate'
              value={props.rate}
              onChange={_this.handleChange} />
          </label>
          <label className='col s12 m2' htmlFor='rate1'>
            Rate 1
            <input
              id='rate1'
              type='number'
              min={0}
              name='rate1'
              value={props.rate1}
              onChange={_this.handleChange} />
          </label>
          <label className='col s12 m2' htmlFor='rate2'>
            Rate 2
            <input
              id='rate2'
              type='number'
              min={0}
              name='rate2'
              value={props.rate2}
              onChange={_this.handleChange} />
          </label>
          <label className='col s12 m2' htmlFor='rate3'>
            Rate 3
            <input
              id='rate3'
              type='number'
              min={0}
              name='rate3'
              value={props.rate3}
              onChange={_this.handleChange} />
          </label>
          <label className='col s12 m2' htmlFor='rate4'>
            Rate 4
            <input
              id='rate4'
              type='number'
              min={0}
              name='rate4'
              value={props.rate4}
              onChange={_this.handleChange} />
          </label>
          <label className='col s12 m2' htmlFor='rate5'>
            Rate 5
            <input
              id='rate5'
              type='number'
              min={0}
              name='rate5'
              value={props.rate5}
              onChange={_this.handleChange} />
          </label>
        </>
      );
    }

    return (
      <div className='view-container'>
        <form id='locationForm' name='locationForm' model-name='location' ref='form' noValidate={true}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{!this.id ? resource.create : resource.edit} Location</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6 required' htmlFor='locationName'>
              Location Name
              <input
                id='locationName'
                type='text'
                name='locationName'
                value={location.locationName}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6 required' htmlFor='description'>
              Description
              <input
                id='description'
                type='text'
                name='description'
                value={location.description}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='longitude'>
              Longitude
              <input
                id='longitude'
                type='text'
                name='longitude'
                value={location.longitude}
                disabled={true}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='latitude'>
              Latitude
              <input
                id='latitude'
                type='text'
                name='latitude'
                value={location.latitude}
                disabled={true}
                onChange={this.handleChange} />
            </label>
            <label className='col s12 m6' htmlFor='type'>
              Type
              <input
                id='type'
                type='text'
                name='type'
                value={location.type}
                onChange={this.handleChange} />
            </label>
            {locationInfo}
            <label className='col s12 m12'>
              Image
              <input type='file' accept='image/*'
                className='form-control' onChange={this.onSelectFile} />
            </label>
            <label className='col s12 m12' htmlFor='Image Preivew'>
              Image Preivew
              <img src={`data:image/jpeg;base64,${location.thumbnail}`} style={{ display: 'block', width: '50%' }} />
            </label>
            <label className='col s12 m12' htmlFor='location'>
              <h4>Location <span><button type='button' id='btnEdit' name='btnEdit' className='btn-edit' onClick={(e) => this.openModal(e, 1)} /></span></h4>
              <LeafletMap
                center={{ lat: location.latitude, lng: location.longitude }}
                zoom={16}
                maxZoom={20}
                attributionControl={true}
                zoomControl={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                style={{ height: '200px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker key='1' position={this.state.markers[0]}>
                  <Popup>
                    <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                  </Popup>
                </Marker>

              </LeafletMap>
            </label>
          </div>
          <footer>
            {
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveModel}>
                {resource.save}
              </button>
            }
          </footer>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Modal'
            portalClassName='modal-portal'
            className='modal-portal-content small-width'
            bodyOpenClassName='modal-portal-open'
            overlayClassName='modal-portal-backdrop'
          >
            <LocationMapForm
              position={this.state.markers}
              closeModal={this.closeModal}
              onModalSave={this.saveModal} />
          </Modal>
        </form>
      </div>
    );
  }
}

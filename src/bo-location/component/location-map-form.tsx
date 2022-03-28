import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as React from 'react';
import {Component} from 'react';
import {Map as LeafletMap, Marker, Popup, TileLayer} from 'react-leaflet';

export class LocationMapForm extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{ lat: '', lng: '' }],
    };
  }

  componentDidMount(): void {
    const { position } = this.props;
    const defaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = defaultIcon;
    this.setState({ markers: position });
  }

  addMarker = (e) => {
    const { markers } = this.state;
    const markerNew = [];
    markerNew.push(e.latlng);
    console.log('location: ', e.latlng);
    this.setState({ markers: markerNew });
  }
  closeModal = (index) => {
    this.props.closeModal(index);
  }
  saveModal = (e) => {
    const { markers } = this.state;
    this.props.onModalSave(e, markers[0]['lat'], markers[0]['lng']);
    this.props.closeModal(1);
  }

  render() {
    const { position } = this.props;
    return (<div className='view-container'>
      <header>
        <button type='button' id='btnClose' name='btnClose' className='btn-close'
          onClick={() => this.closeModal(1)} />
        <h2>Open Street Map</h2>
      </header>
      <LeafletMap
        center={position[0]}
        zoom={16}
        onClick={this.addMarker}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        style={{ height: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.markers.map((p, idx) =>
          <Marker key={`marker-${idx}`} position={p}>
            <Popup>
              <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
            </Popup>
          </Marker>
        )}
      </LeafletMap>
      <footer>
        <button id='btnSave' name='btnSave' onClick={(e) => this.saveModal(e)}>Save</button>
      </footer>
    </div>
    );
  }
}

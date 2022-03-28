import * as React from 'react';

export default function OverView({ location }) {
  return (
    <React.Fragment>
      <h3>Location</h3>
      <h4>location Id: {location && location.locationId}</h4>
      <h4>location Name: {location && location.locationName}</h4>
      <h4>description: {location && location.description}</h4>
      <h4>latitude: {location && location.latitude}</h4>
      <h4>longitude: {location && location.longitude}</h4>
      <h3>Location Info</h3>
      <h4>Rate: {location.info ? location.info.rate : null}</h4>
      <h4>Rate 1: {location.info ? location.info.rate1 : null}</h4>
      <h4>Rate 2: {location.info ? location.info.rate2 : null}</h4>
      <h4>Rate 3: {location.info ? location.info.rate3 : null}</h4>
      <h4>Rate 4: {location.info ? location.info.rate4 : null}</h4>
      <h4>Rate 5: {location.info ? location.info.rate5 : null}</h4>
      <h4>View Count : {location.info ? location.info.viewCount : null}</h4>
    </React.Fragment>
  );
}

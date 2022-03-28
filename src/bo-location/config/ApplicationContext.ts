import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {httpOptionsService} from 'uione';
import {BookableService} from '../service/BookableService';
import {BookingService} from '../service/BookingService';
import {BookableClient} from '../service/client/BookableClient';
import {BookingClient} from '../service/client/BookingClient';
import {EventClient} from '../service/client/EventClient';
import {LocationClient} from '../service/client/LocationClient';
import {EventService} from '../service/EventService';
import {LocationService} from '../service/LocationService';

const httpRequest = new HttpRequest(axios, httpOptionsService);
class ApplicationContext {
  readonly locationService: LocationService;
  readonly bookableService: BookableService;
  readonly eventService: EventService;
  readonly bookingService: BookingService;
  constructor() {
    this.locationService = new LocationClient(httpRequest);
    this.bookableService = new BookableClient(httpRequest);
    this.eventService = new EventClient(httpRequest);
    this.bookingService = new BookingClient(httpRequest);
  }
  getBookingService(): BookingService {
    return this.bookingService;
  }
}

const applicationContext = new ApplicationContext();

export default applicationContext;

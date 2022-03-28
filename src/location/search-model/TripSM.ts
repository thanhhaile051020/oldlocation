import {DateRange, SearchModel} from 'onecore';

export interface TripSM extends SearchModel {
    tripId: string;
    startTime: DateRange;
    endTime: DateRange;
    locations: object[];
}

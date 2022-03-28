import {DateRange, SearchModel} from 'onecore';

export interface TourSM extends SearchModel {
    tourId: string;
    startTime: DateRange;
    endTime: DateRange;
    locations: string[];
}

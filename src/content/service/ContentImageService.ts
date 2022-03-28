import {GenericSearchService, SearchModel} from 'onecore';
import {ResultInfo} from 'onecore';
import {ContentImage} from '../model/ContentImage';

export interface ContentImageService extends GenericSearchService<ContentImage, string, ResultInfo<ContentImage>, SearchModel> {

}

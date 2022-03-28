import {GenericSearchService, SearchModel} from 'onecore';
import {ResultInfo} from 'onecore';
import {ContentCategory} from '../model/ContentCategory';

export interface ContentCategoryService extends GenericSearchService<ContentCategory, string, ResultInfo<ContentCategory>, SearchModel> {

}

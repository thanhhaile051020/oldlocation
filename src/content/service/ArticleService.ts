import {GenericSearchService, SearchModel} from 'onecore';
import {ResultInfo} from 'onecore';
import {Article} from '../model/Article';

export interface ArticleService extends GenericSearchService<Article, string, ResultInfo<Article>, SearchModel> {

}

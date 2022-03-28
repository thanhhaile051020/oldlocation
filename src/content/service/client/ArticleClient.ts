import {SearchModel} from 'onecore';
import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {articleModel} from '../../metadata/ArticleModel';
import {Article} from '../../model/Article';
import {ArticleService} from '../ArticleService';

export class ArticleClient extends GenericSearchWebClient<Article, string, ResultInfo<Article>, SearchModel> implements ArticleService {
  constructor(http: HttpRequest) {
    super(config.articleUrl, http, articleModel);
  }
}

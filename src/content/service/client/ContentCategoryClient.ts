import {SearchModel} from 'onecore';
import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {contentCategoryModel} from '../../metadata/ContentCategoryModel';
import {ContentCategory} from '../../model/ContentCategory';
import {ContentCategoryService} from '../ContentCategoryService';

export class ContentCategoryClient extends GenericSearchWebClient<ContentCategory, string, ResultInfo<ContentCategory>, SearchModel> implements ContentCategoryService {
  constructor(http: HttpRequest) {
    super(config.contentUrl, http, contentCategoryModel);
  }
}

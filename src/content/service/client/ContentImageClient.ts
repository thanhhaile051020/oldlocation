import {SearchModel} from 'onecore';
import {ResultInfo} from 'onecore';
import {HttpRequest} from 'web-clients';
import {GenericSearchWebClient} from 'web-clients';
import { optimizeSearchModel } from 'web-clients';
import config from '../../../config';
import {contentImageModel} from '../../metadata/ContentImageModel';
import {ContentImage} from '../../model/ContentImage';
import {ContentImageService} from '../ContentImageService';

export class ContentImageClient extends GenericSearchWebClient<ContentImage, string, ResultInfo<ContentImage>, SearchModel> implements ContentImageService {
  constructor(http: HttpRequest) {
    super(config.contentImageUrl, http, contentImageModel);
    console.log('new contentImages');
  }

  protected optimizeSearchModel(s): SearchModel {
    const object = optimizeSearchModel(s);
    console.log('optimizeSearchModel', s);
    if (s.hasOwnProperty('keyword')) {
      object['keyword'] = s['keyword'];
    }
    return object;
  }
}

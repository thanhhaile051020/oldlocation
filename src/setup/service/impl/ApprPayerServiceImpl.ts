import {jsonArray, ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payerModel} from '../../metadata/PayerModel';
import {Payer} from '../../model/Payer';
import {PayerSM} from '../../search-model/PayerSM';
import {ApprPayerService} from '../ApprPayerService';

export class ApprPayerServiceImpl extends ViewSearchWebClient<Payer, any, PayerSM> implements ApprPayerService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/profile/payers', http, payerModel);
    this.loadData = this.loadData.bind(this);
  }

  async loadData(keyWords: string, max: number): Promise<Payer[]> {
    const url = this.serviceUrl + '/' + keyWords + '/' + max;
    const res = await this.http.get<Payer[]>(url);
    return jsonArray(res, this._metamodel);
  }
}

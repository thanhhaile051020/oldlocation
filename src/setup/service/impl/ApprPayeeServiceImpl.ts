import {jsonArray, ViewSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {payeeModel} from '../../metadata/PayeeModel';
import {Payee} from '../../model/Payee';
import {PayeeSM} from '../../search-model/PayeeSM';
import {ApprPayeeService} from '../ApprPayeeService';

export class ApprPayeeServiceImpl extends ViewSearchWebClient<Payee, any, PayeeSM> implements ApprPayeeService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'common/resources/profile/payees', http, payeeModel);
    this.loadData = this.loadData.bind(this);
  }

  async loadData(keyWords: string, max: number): Promise<Payee[]> {
    const url = this.serviceUrl + '/' + keyWords + '/' + max;
    const res = await this.http.get<Payee[]>(url);
    return jsonArray(res, this._metamodel);
  }
}

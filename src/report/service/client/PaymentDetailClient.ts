import {SearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {paymentDetailModel} from '../../metadata/PaymentDetailModel';
import {PaymentDetail} from '../../model/PaymentDetail';
import {PaymentDetailSM} from '../../search-model/PaymentDetailSM';
import {PaymentDetailService} from '../PaymentDetailService';

export class PaymentDetailServiceImpl extends SearchWebClient<PaymentDetail, PaymentDetailSM> implements PaymentDetailService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'paymentDetails', http, paymentDetailModel);
  }
  protected postOnly(s: PaymentDetailSM): boolean {
    return true;
  }
}

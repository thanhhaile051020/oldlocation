import {SearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {balanceInquiryModel} from '../../metadata/BalanceInquiryModel';
import {BalanceInquiry} from '../../model/BalanceInquiry';
import {BalanceInquirySM} from '../../search-model/BalanceInquirySM';
import {BalanceInquiryService} from '../BalanceInquiryService';

export class BalanceInquiryServiceImpl extends SearchWebClient<BalanceInquiry, BalanceInquirySM> implements BalanceInquiryService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'accountInfo', http, balanceInquiryModel);
  }
  protected postOnly(s: BalanceInquirySM): boolean {
    return true;
  }
}

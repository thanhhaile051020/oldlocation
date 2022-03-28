import {SearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {feeDetailReportModel} from '../../metadata/FeeDetailReportModel';
import {FeeDetailReport} from '../../model/FeeDetailReport';
import {FeeDetailReportSM} from '../../search-model/FeeDetailReportSM';
import {FeeDetailReportService} from '../FeeDetailReportService';

export class FeeDetailReportServiceImpl extends SearchWebClient<FeeDetailReport, FeeDetailReportSM> implements FeeDetailReportService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'transactionFeeDetail', http, feeDetailReportModel);
  }
  protected postOnly(s: FeeDetailReportSM): boolean {
    return true;
  }
}

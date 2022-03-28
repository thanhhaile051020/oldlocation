import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {LocaleFormatter} from 'onecore';
import {httpOptionsService} from 'uione';
import {ApprExternalSysClient} from '../service/client/ApprExternalSysClient';
import {ApprPayeeClient} from '../service/client/ApprPayeeClient';
import {ApprPayerClient} from '../service/client/ApprPayerClient';
import {ApprPaymentAccountClient} from '../service/client/ApprPaymentAccountClient';
import {ApprReceivingAccountClient} from '../service/client/ApprReceivingAccountClient';
import {BalanceInquiryServiceImpl} from '../service/client/BalanceInquiryClient';
import {EntProfileClient} from '../service/client/EntProfileClient';
import {FeeDetailReportServiceImpl} from '../service/client/FeeDetailReportClient';
import {MasterDataServiceImpl} from '../service/client/MasterDataClient';
import {PaymentDetailServiceImpl} from '../service/client/PaymentDetailClient';
import {TransactionLogServiceImpl} from '../service/client/TransactionLogClient';
import {UserActivityLogServiceImpl} from '../service/client/UserActivityLogClient';
import {WebServiceTransLogServiceImpl} from '../service/client/WebServiceTransLogClient';
import {MasterDataService} from '../service/MasterDataService';
import {BusinessSearchModelFormatter} from './BusinessSearchModelFormatter';

const httpRequest = new HttpRequest(axios, httpOptionsService);

class ApplicationContext {
  readonly businessSearchModelFormatter: LocaleFormatter<any> = new BusinessSearchModelFormatter();
  readonly masterDataService: MasterDataService = new MasterDataServiceImpl();
  readonly transactionLogService = new TransactionLogServiceImpl(httpRequest);
  readonly userActivityLogService = new UserActivityLogServiceImpl(httpRequest);
  readonly webServiceTransLogService = new WebServiceTransLogServiceImpl(httpRequest);
  readonly apprPayeeService = new ApprPayeeClient(httpRequest);
  readonly apprPayerService = new ApprPayerClient(httpRequest);
  readonly apprExternalSysService = new ApprExternalSysClient(httpRequest);
  readonly paymentDetailService = new PaymentDetailServiceImpl(httpRequest);
  readonly feeDetailReportService = new FeeDetailReportServiceImpl(httpRequest);
  readonly balanceInquiryService = new BalanceInquiryServiceImpl(httpRequest);
  readonly apprReceivingAccountService = new ApprReceivingAccountClient(httpRequest);
  readonly apprPaymentAccountService = new ApprPaymentAccountClient(httpRequest);
  readonly entProfileService = new EntProfileClient(httpRequest);
}

export const applicationContext = new ApplicationContext();

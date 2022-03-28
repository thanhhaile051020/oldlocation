import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {LocaleFormatter} from 'onecore';
import {EditPermissionBuilder, httpOptionsService} from 'uione';
import {GroupClient} from '../../access/service/client/GroupClient';
import {ApprBankServiceImpl} from '../service/impl/ApprBankServiceImpl';
import {ApprExternalSysServiceImpl} from '../service/impl/ApprExternalSysServiceImpl';
import {ApprPayeeServiceImpl} from '../service/impl/ApprPayeeServiceImpl';
import {ApprPayerServiceImpl} from '../service/impl/ApprPayerServiceImpl';
import {ApprReceivingAccountServiceImpl} from '../service/impl/ApprReceivingAccountServiceImpl';
import {BankServiceImpl} from '../service/impl/BankServiceImpl';
import {BranchServiceImpl} from '../service/impl/BranchServiceImpl';
import {EntityRelationshipServiceImpl} from '../service/impl/EntityRelationshipServiceImpl';
import {ExternalSysServiceImpl} from '../service/impl/ExternalSysServiceImpl';
import {MasterDataServiceImpl} from '../service/impl/MasterDataServiceImpl';
import {PayeeServiceImpl} from '../service/impl/PayeeServiceImpl';
import {PayerServiceImpl} from '../service/impl/PayerServiceImpl';
import {PaymentAccountServiceImpl} from '../service/impl/PaymentAccountServiceImpl';
import {ProfileServiceImpl} from '../service/impl/ProfileServiceImpl';
import {ReceivingAccountServiceImpl} from '../service/impl/ReceivingAccountServiceImpl';
import {TransactionFeeSetupSearchServiceImpl} from '../service/impl/TransactionFeeSetupSearchServiceImpl';
import {TransactionFeeSetupServiceImpl} from '../service/impl/TransactionFeeSetupServiceImpl';
import {MasterDataService} from '../service/MasterDataService';
import {BusinessSearchModelFormatter} from './BusinessSearchModelFormatter';
import {ODDEditPermissionBuilder} from './ODDEditPermissionBuilder';
import {ODDSearchPermissionBuilder} from './ODDSearchPermissionBuilder';

const httpRequest = new HttpRequest(axios, httpOptionsService);

class ApplicationContext {
  readonly httpRequest = httpRequest;
  readonly businessSearchModelFormatter: LocaleFormatter<any> = new BusinessSearchModelFormatter();
  readonly editPermissionBuilder: EditPermissionBuilder = new ODDEditPermissionBuilder();
  readonly searchPermissionBuilder = new ODDSearchPermissionBuilder();
  readonly masterDataService: MasterDataService = new MasterDataServiceImpl();
  readonly groupService = new GroupClient(httpRequest);
  readonly bankService = new BankServiceImpl(httpRequest);
  readonly branchService = new BranchServiceImpl(httpRequest);
  readonly apprBankService = new ApprBankServiceImpl(httpRequest);
  readonly payeeService = new PayeeServiceImpl(httpRequest);
  readonly payerService = new PayerServiceImpl(httpRequest);
  readonly apprPayeeService = new ApprPayeeServiceImpl(httpRequest);
  readonly apprPayerService = new ApprPayerServiceImpl(httpRequest);
  readonly profileService = new ProfileServiceImpl(httpRequest);
  readonly paymentAccountService = new PaymentAccountServiceImpl(httpRequest);
  readonly receivingAccountService = new ReceivingAccountServiceImpl(httpRequest);
  readonly externalSysService = new ExternalSysServiceImpl(httpRequest);
  readonly apprExternalSysService = new ApprExternalSysServiceImpl(httpRequest);
  readonly entityRelationshipService = new EntityRelationshipServiceImpl(httpRequest);
  readonly transactionFeeSetupService = new TransactionFeeSetupServiceImpl(httpRequest);
  readonly transactionFeeSetupSearchService = new TransactionFeeSetupSearchServiceImpl(httpRequest);
  readonly apprReceivingAccountService = new ApprReceivingAccountServiceImpl(httpRequest);
}

export const applicationContext = new ApplicationContext();

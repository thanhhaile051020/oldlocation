import {ValueText} from 'onecore';
import {MasterDataService} from '../MasterDataService';

export class MasterDataServiceImpl implements MasterDataService {
  private status = [
    {
      value: 'T',
      text: 'Activated',
    },
    {
      value: 'F',
      text: 'Deactivated',
    }
  ];
  private ctrlStatus = [
    {
      value: 'P',
      text: 'Pending',
    },
    {
      value: 'A',
      text: 'Approved',
    },
    {
      value: 'R',
      text: 'Rejected',
    }
  ];
  private transactionFeeRules = [
    { value: 'fix-per', text: 'Fix Per Transaction' },
    { value: 'sb', text: 'Slab Basic' },
    { value: 'tb', text: 'Tier Basic' },
    { value: 'ufc', text: 'Utility Fee Charging' }
  ];
  private defaultAccounts = [
    { value: '110', text: 'Cash' },
    { value: '111', text: 'Notes receivable' },
    { value: '112', text: 'Accounts receivable' },
    { value: '113', text: 'Interest receivable' },
    { value: '115', text: 'Merchandise invenstorey' },
    { value: '116', text: 'Office supplies' },
    { value: '117', text: 'Prepaid insurance' },
    { value: '120', text: 'Land' },
    { value: '123', text: 'Store equipment' },
    { value: '124', text: 'Accumulated depreciation store equipment' },
    { value: '125', text: 'Office equipment' },
    { value: '126', text: 'Accumulated depreciation office equipment' },
    { value: '210', text: 'Accounts payable' },
    { value: '211', text: 'Salaries payable' },
    { value: '212', text: 'Unearned rent' },
    { value: '215', text: 'Notes payable' },
    { value: '310', text: 'Capital Stock' },
    { value: '311', text: 'Retained earnings' },
    { value: '312', text: 'Dividends' },
    { value: '313', text: 'Income summary' },
    { value: '410', text: 'Sales' },
    { value: '411', text: 'Sales returns and allowances' },
    { value: '412', text: 'Sales discount' },
    { value: '510', text: 'Cost of goods sold' },
    { value: '520', text: 'Sales salaries expense' },
    { value: '521', text: 'Advertising expense' },
    { value: '522', text: 'Depreciation expense-store equipment' },
    { value: '529', text: 'Miscellaneous selling expense' },
    { value: '530', text: 'Office salaries expense' },
    { value: '531', text: 'Rent expense' },
    { value: '532', text: 'Depreciation expense-office equipment' },
    { value: '533', text: 'Insurance expense' },
    { value: '534', text: 'Office supplies expense' },
    { value: '539', text: 'Miscellaneous admin' },
    { value: '610', text: 'Rent income' },
    { value: '611', text: 'Interest income' },
    { value: '710', text: 'Interest expense' }
  ];
  private paymentStatus = [
    { value: 'D', text: 'Debited'},
    { value: 'C', text: 'Credited'},
    { value: 'F', text: 'Fail'},
    { value: 'S', text: 'Success'},
  ];
  private postingType = [
    { value: 'I', text: 'Immediately'},
    { value: 'D', text: 'Daily'},
    { value: 'M', text: 'Monthly'},
  ];
  getStatus(): Promise<ValueText[]> {
    return Promise.resolve(this.status);
  }
  getDefaultAcounts(): Promise<ValueText[]> {
    return Promise.resolve(this.defaultAccounts);
  }
  getTransactionFeeRules(): Promise<ValueText[]> {
    return Promise.resolve(this.transactionFeeRules);
  }
  getCtrlStatus(): Promise<ValueText[]> {
    return Promise.resolve(this.ctrlStatus);
  }
  getPaymentStatus(): Promise<ValueText[]> {
    return Promise.resolve(this.paymentStatus);
  }
  getPostingType(): Promise<ValueText[]> {
    return Promise.resolve(this.postingType);
  }
}

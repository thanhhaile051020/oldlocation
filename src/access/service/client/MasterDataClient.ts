import {ValueText} from 'onecore';
import {MasterDataService} from '../MasterDataService';

export class MasterDataClient implements MasterDataService {
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

  private entityTypes = [
    {
      value: 'B',
      text: 'Bank',
    },
    {
      value: 'E',
      text: 'Payee',
    },
    {
      value: 'R',
      text: 'Payer',
    }
  ];

  private roleTypes = [
    {
      value: 'M',
      text: 'Maker',
    },
    {
      value: 'C',
      text: 'Checker',
    }
  ];

  private userTypes = [
    {
      value: 'BA',
      text: 'Bank Admin',
    },
    {
      value: 'OP',
      text: 'Operator',
    }
  ];

  private titles = [
    {text: 'Mr', value: 'Mr'},
    {text: 'Mrs', value: 'Mrs'},
    {text: 'Ms', value: 'Ms'},
    {text: 'Dr', value: 'Dr'}
  ];

  private positions = [
    {value: 'E', text: 'Employee'},
    {value: 'M', text: 'Manager'},
    {value: 'D', text: 'Director'}
  ];

  private genders = [
    {value: 'M', text: 'Male'},
    {value: 'F', text: 'Female'}
  ];

  getGenders(): Promise<ValueText[]> {
    return Promise.resolve(this.genders);
  }

  getTitles(): Promise<ValueText[]> {
    return Promise.resolve(this.titles);
  }

  getPositions(): Promise<ValueText[]> {
    return Promise.resolve(this.positions);
  }

  getStatus(): Promise<ValueText[]> {
    return Promise.resolve(this.status);
  }

  getCtrlStatus(): Promise<ValueText[]> {
    return Promise.resolve(this.ctrlStatus);
  }

  getEntityTypes(): Promise<ValueText[]> {
    return Promise.resolve(this.entityTypes);
  }

  getRoleTypes(): Promise<ValueText[]> {
    return Promise.resolve(this.roleTypes);
  }

  getUserTypes(): Promise<ValueText[]> {
    return Promise.resolve(this.userTypes);
  }
}

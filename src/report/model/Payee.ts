import {ControlModel} from './ControlModel';

export class Payee extends ControlModel  {
  entityId: string;
  entityType: string;
  entityName: string;
  shortName: string;
  companyId: string;
  add1: string;
  add2: string;
  add3: string;
  postalCode: string;
  stateName: string;
  countryCode: string;
  contactName: string;
  contactNo: string;
  faxNo: string;
  mobilePhone: string;
  emailAdd: string;
  authMethod: string;
  businessType: string;
  maxAtmPtrn: number;
  webConfirmation: number;
  createdDate: Date;
}

export const DefaultPayee = {
  entityId: '',
  entityType: '',
  entityName: '',
  shortName: '',
  companyId: '',
  add1: '',
  add2: '',
  add3: '',
  postalCode: '',
  stateName: '',
  countryCode: '',
  contactName: '',
  contactNo: '',
  faxNo: '',
  mobilePhone: '',
  emailAdd: '',
  authMethod: '',
  businessType: '',
  maxAtmPtrn: 1,
  webConfirmation: 1,
  dateCreated: new Date
};


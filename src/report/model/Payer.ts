import {ControlModel} from './ControlModel';

export class Payer extends ControlModel {
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
  caFile: string;
  caFileName: string;
  faxNo: string;
  mobilePhone: string;
  emailAdd: string;
  authMethod: string;
  businessType: string;
  maxAtmPtrn: number;
  paymentConfirm: string;
  pymtAccCtl: boolean;
  createdDate: Date;
}

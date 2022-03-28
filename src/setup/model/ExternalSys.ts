import {ControlModel} from './ControlModel';
import {Payee} from './Payee';

export class ExternalSys extends ControlModel {
  esId: string;
  esSysName: string;
  esSysShortName: string;
  esUrl: string;
  signOnApproach: string;
  accValidation: string;
  logoutUrl: string;
  exRefDup: string;
  payDateCtl: string;
  allStatus: string;
  userID: string;
  password: string;
  profile: Payee;
}

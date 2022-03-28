import {ControlModel} from './ControlModel';

export class EntityAccount extends ControlModel {
  bankId: string;
  entityId: string;
  accNo: string;
  accType: string;
  accName: string;
  ccyCode: string;
  defaultType: string;
  entityType: string;
  accStatus: string;
  nightMode: string;
}

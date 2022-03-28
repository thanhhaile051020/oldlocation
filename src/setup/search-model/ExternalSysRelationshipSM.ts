import {EntitySearchModel} from './EntitySearchModel';

export interface ExternalSysRelationshipSM extends EntitySearchModel {
  esId: string;
  payeeId: string;
  payerId: string;
}

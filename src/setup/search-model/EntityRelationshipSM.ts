import {EntitySearchModel} from './EntitySearchModel';

export interface EntityRelationshipSM extends EntitySearchModel {
  esId: number;
  payeeId: number;
  payerId: number;
}

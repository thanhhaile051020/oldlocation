import {ControlModel} from './ControlModel';
import {Payer} from './Payer';

export class EntityRelationship extends ControlModel {
  esId: string;
  payeeId: string;
  entityName: string;
  payers: Payer[];
}

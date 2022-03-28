import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {EntityRelationship} from '../model/EntityRelationship';
import {EntityRelationshipSM} from '../search-model/EntityRelationshipSM';

export interface EntityRelationshipService extends GenericSearchDiffApprService<EntityRelationship, any, ResultInfo<EntityRelationship>, EntityRelationshipSM> {
  getEntityById(id, payeeId): Promise<EntityRelationship>;
}

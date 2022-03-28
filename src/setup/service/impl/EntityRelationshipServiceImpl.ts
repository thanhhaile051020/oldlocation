import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {entityRelationshipModel} from '../../metadata/EntityRelationshipModel';
import {EntityRelationship} from '../../model/EntityRelationship';
import {EntityRelationshipSM} from '../../search-model/EntityRelationshipSM';
import {EntityRelationshipService} from '../EntityRelationshipService';

export class EntityRelationshipServiceImpl extends GenericSearchDiffApprWebClient<EntityRelationship, any, ResultInfo<EntityRelationship>, EntityRelationshipSM> implements EntityRelationshipService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'entityRelationship', http, entityRelationshipModel);
  }
  getEntityById(id: string, payeeId: string): Promise<EntityRelationship> {
    const url = this.serviceUrl + '/' + id + '/' + payeeId;
    return this.http.get(url);
  }
}

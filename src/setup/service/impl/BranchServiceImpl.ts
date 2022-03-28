import {ResultInfo} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {branchModel} from '../../metadata/BranchModel';
import {Branch} from '../../model/Branch';
import {BranchSM} from '../../search-model/BranchSM';
import {BranchService} from '../BranchService';

export class BranchServiceImpl extends GenericSearchWebClient<Branch, string, ResultInfo<Branch>, BranchSM> implements BranchService {
  constructor(http: HttpRequest) {
    super(config.backOfficeUrl + 'branch', http, branchModel);
  }
}

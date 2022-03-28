import {GenericSearchService} from 'onecore';
import {ResultInfo} from 'onecore';
import {Branch} from '../model/Branch';
import {BranchSM} from '../search-model/BranchSM';

export interface BranchService extends GenericSearchService<Branch, string, ResultInfo<Branch>, BranchSM> {
}

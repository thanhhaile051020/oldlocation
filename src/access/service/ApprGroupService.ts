import {ViewSearchService} from 'onecore';
import {Group} from '../model/Group';
import {GroupSM} from '../search-model/GroupSM';

export interface ApprAccessGroupService extends ViewSearchService<Group, any, GroupSM> {
}

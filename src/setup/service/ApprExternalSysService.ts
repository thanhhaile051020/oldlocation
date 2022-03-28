import {ViewSearchService} from 'onecore';
import {ExternalSys} from '../model/ExternalSys';
import {ExternalSysSM} from '../search-model/ExternalSysSM';

export interface ApprExternalSysService extends ViewSearchService<ExternalSys, string, ExternalSysSM> {

}

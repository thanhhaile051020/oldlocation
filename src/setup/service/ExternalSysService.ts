import {ResultInfo} from 'onecore';
import {GenericSearchDiffApprService} from 'onecore';
import {ExternalSys} from '../model/ExternalSys';
import {ExternalSysSM} from '../search-model/ExternalSysSM';

export interface ExternalSysService extends GenericSearchDiffApprService<ExternalSys, string, ResultInfo<ExternalSys>, ExternalSysSM> {

}

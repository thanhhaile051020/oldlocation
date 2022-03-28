import {SearchService} from 'onecore';
import {FeeDetailReport} from '../model/FeeDetailReport';
import {FeeDetailReportSM} from '../search-model/FeeDetailReportSM';

export interface FeeDetailReportService extends SearchService<FeeDetailReport, FeeDetailReportSM> {
}

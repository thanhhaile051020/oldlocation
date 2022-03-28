import {SearchService} from 'onecore';
import {BalanceInquiry} from '../model/BalanceInquiry';
import {BalanceInquirySM} from '../search-model/BalanceInquirySM';

export interface BalanceInquiryService extends SearchService<BalanceInquiry, BalanceInquirySM> {

}

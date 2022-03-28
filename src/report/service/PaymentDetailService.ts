import {SearchService} from 'onecore';
import {PaymentDetail} from '../model/PaymentDetail';
import {PaymentDetailSM} from '../search-model/PaymentDetailSM';

export interface PaymentDetailService extends SearchService<PaymentDetail, PaymentDetailSM> {
}

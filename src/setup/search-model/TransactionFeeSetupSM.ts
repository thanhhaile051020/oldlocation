import {ControlSearchModel} from './ControlSearchModel';

export interface TransactionFeeSetupSM extends ControlSearchModel {
    transFeeId: number;
    esId: string;
    payeeId: string;
}

import {AccType} from '../enum/AccType';
import {EntitySearchModel} from './EntitySearchModel';

export interface AccSearchModel extends EntitySearchModel {
  accType: AccType;
}

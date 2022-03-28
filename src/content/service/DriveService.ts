import { GenericSearchService, ResultInfo, SearchModel } from 'onecore';
import { Drive } from '../model/Drive';

export interface DriveService extends GenericSearchService<Drive, string, ResultInfo<Drive>, SearchModel> {
  pushCode(obj: any): Promise<ResultInfo<any>>;
  getAuth(): Promise<ResultInfo<any>>;
  uploadFile(obj: any): Promise<ResultInfo<any>>;
  downloadFile(obj: any): Promise<ResultInfo<any>>;
}

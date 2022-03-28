import { ResultInfo, SearchModel } from 'onecore';
import { storage } from 'uione';
import { GenericSearchWebClient, HttpRequest } from 'web-clients';
import config from '../../../config';
import { DriveModel } from '../../metadata/DriveModel';
import { Drive } from '../../model/Drive';
import { DriveService } from '../DriveService';

export class DriveClient extends GenericSearchWebClient<Drive, string, ResultInfo<Drive>, SearchModel> implements DriveService {
  constructor(http: HttpRequest) {
    super(config.driveUrl, http, DriveModel);
  }

  pushCode(obj: any): Promise<ResultInfo<any>> {
    const url = `${config.driveUrl}/pushCode`;
    return this.http.post(url, obj);
  }

  getAuth(): Promise<ResultInfo<any>> {
    const url = `${config.driveUrl}`;
    return this.http.get(url);
  }

  uploadFile(obj: any): Promise<ResultInfo<any>> {
    const url = `${config.driveUrl}/upload`;
    return this.http.post(url, obj);
  }

  downloadFile(obj: any): Promise<ResultInfo<any>> {
    const { id, path } = obj;
    const url = `${config.driveUrl}/download/${id}/${path}`;
    const token = storage.getToken();
    console.log(token);
    const httpOptions = {
      headers: {
        'Content-Disposition': 'attachment; filename=123.png',
        'Authorization': 'Bearer ' + token,
      }
    };
    return this.http.get(url, httpOptions);
  }

}

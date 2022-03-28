import {ResultInfo, SearchModel} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {albumModel} from '../../metadata/AlbumModel';
import {Album} from '../../model/Album';
import {InfoImage} from '../../model/InfoImage';
import {AlbumService} from '../AlbumService';
import {CloudinaryService} from '../CloudinaryService';

export class AlbumClient extends GenericSearchWebClient<Album, string, ResultInfo<Album>, SearchModel> implements AlbumService {
  constructor(private cloudinaryService: CloudinaryService, http: HttpRequest) {
    super(config.albumUrl, http, albumModel);
  }

  uploadImageCloudinary(files: FileList[]): Promise<InfoImage[]> {
    return this.cloudinaryService.uploadImageCloudinary(files);
  }

  uploadStreamAlbum(obj: Album): Promise<ResultInfo<number>> {
    const url = this.serviceUrl + '/' + obj.albumId;
    return this.http.put(url, obj);
  }

  deleteMany(obj: any): Promise<ResultInfo<number>> {
    const url = this.serviceUrl + '/deleteMany';
    return this.http.post<ResultInfo<number>>(url, obj);
  }

  deleteManyItemStream(obj: Album): Promise<ResultInfo<number>> {
    const url = this.serviceUrl + '/deleteManyItemStream/' + obj.albumId;
    return this.http.post<ResultInfo<number>>(url, obj);
  }
}

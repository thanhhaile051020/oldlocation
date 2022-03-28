import {GenericSearchService, ResultInfo, SearchModel} from 'onecore';
import {Album} from '../model/Album';
import {InfoImage} from '../model/InfoImage';

export interface AlbumService extends GenericSearchService<Album, string, ResultInfo<Album>, SearchModel> {
  uploadImageCloudinary(dataImage: any): Promise<InfoImage[]>;
  deleteMany(objIds: any): Promise<ResultInfo<number>>;
  deleteManyItemStream(obj: Album): Promise<ResultInfo<number>>;
  uploadStreamAlbum(obj: any): Promise<ResultInfo<number>>;
}

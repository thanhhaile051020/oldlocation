import {InfoImage} from '../model/InfoImage';

export interface CloudinaryService {
  uploadImageCloudinary(files: FileList[]): Promise<InfoImage[]>;
}

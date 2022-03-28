import {Stream} from './Stream';

export class Album {
  albumId: string;
  createDate: Date;
  createBy: string;
  stream: Stream[];
}

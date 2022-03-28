import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {httpOptionsService} from 'uione';
import config from '../../config';
import {AlbumService} from '../service/AlbumService';
import {ArticleService} from '../service/ArticleService';
import {AlbumClient} from '../service/client/AlbumClient';
import {ArticleClient} from '../service/client/ArticleClient';
import {CloudinaryClient} from '../service/client/CloudinaryClient';
import {CommentClient} from '../service/client/CommentClient';
import {ContentCategoryClient} from '../service/client/ContentCategoryClient';
import {ContentImageClient} from '../service/client/ContentImageClient';
import {DriveClient} from '../service/client/DriveClient';
import {CloudinaryService} from '../service/CloudinaryService';
import {CommentService} from '../service/CommentService';
import {ContentCategoryService} from '../service/ContentCategoryService';
import {DriveService} from '../service/DriveService';

const httpRequest = new HttpRequest(axios, httpOptionsService);
class ApplicationContext {
  readonly contentCategoryService: ContentCategoryService;
  readonly driveService: DriveService;
  readonly contentImageService: ContentImageClient;
  readonly cloudinaryService: CloudinaryService;
  readonly albumService: AlbumService;
  readonly articleService: ArticleService;
  readonly commentService: CommentService;

  constructor() {
    this.contentCategoryService = new ContentCategoryClient(httpRequest);
    this.driveService = new DriveClient(httpRequest);
    this.contentImageService = new ContentImageClient(httpRequest);
    const cloudinaryConfig = {
      apikey: config.cloudinary.apiKey,
      apiSecret: config.cloudinary.apiSecret,
      unsignedUploadPreset: config.cloudinary.unsignedUploadPreset,
      cloudinaryName: config.cloudinary.cloudinaryName,
    };
    this.cloudinaryService = new CloudinaryClient(cloudinaryConfig);
    this.albumService = new AlbumClient(this.cloudinaryService, httpRequest);
    this.articleService = new ArticleClient(httpRequest);
    this.commentService = new CommentClient(httpRequest);
  }
}

const applicationContext = new ApplicationContext();

export default applicationContext;

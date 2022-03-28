import axios from 'axios';
import {Observable, of, throwError} from 'rxjs';
import {fromPromise} from 'rxjs-compat/observable/fromPromise';
import {flatMap, map} from 'rxjs/operators';
import {CloudinaryConfig} from '../../config/CloudinaryConfig';
import {InfoImage} from '../../model/InfoImage';
import {CloudinaryService} from '../CloudinaryService';

export class CloudinaryClient implements CloudinaryService {
  constructor(private cloudinaryConfig: CloudinaryConfig) {
  }

  uploadImageCloudinary(files: FileList[]): Promise<InfoImage[]> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinaryConfig.cloudinaryName}/upload`;
    const configPost = this.configCloud();
    return this.postRequestUploadWithConfig(url, files, configPost)
      .pipe(map((res: InfoImage[]) => {
        return res;
      })).toPromise();
  }

  private postRequestUploadWithConfig(url: string, files: any[], configPost: any): Observable<object> {
    const uploaders = files.map(fileItem => {
      const formData = new FormData();
      formData.append('upload_preset', this.cloudinaryConfig.unsignedUploadPreset);
      formData.append('tags', 'albums'); // Optional - add tag for image admin in Cloudinary
      formData.append('api_key', this.cloudinaryConfig.apikey);
      formData.append('folders', 'albums');
      formData.append('file', fileItem);
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post(url, formData, configPost);
    });
    // Once all the files are uploaded
    return fromPromise(
      axios.all(uploaders)
        .then(axios.spread((...args) => {
          return args;
        }))
    ).pipe(map(items => {
      console.log(items.map(item => item.data));
      return items.map(item => item.data);
    })).pipe(flatMap(data => {
      return this.handleFailResponse(data);
    }));
  }

  private handleFailResponse<T>(data): Observable<T> {
    if (data && data.status === 'F' && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return throwError(data);
    } else {
      return of(data);
    }
  }

  private configCloud(): any {
    return {
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      onUploadProgress(progressEvent) {
        // Do whatever you want with the native progress event
        const progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
        const proccessHtml = document.getElementById('progress');
        const proccessBar = document.getElementById('progress-bar');
        const text_proccessHtml = document.getElementById('box__text_proccess');
        if (proccessHtml) {
          proccessHtml.innerText = 'progressing... ' + progress + '%';
        }
        if (proccessBar) {
          proccessBar.style.display = 'block';
        }
        if (text_proccessHtml) {
          text_proccessHtml.textContent = progress + '%';
        }
        if (progress === 100) {
          const _done = document.getElementById('box__success');
          if (_done) {
            _done.style.display = 'block';
            proccessBar.style.display = 'none';
          }

        }
      }
    };
  }

  private configHeaderCloud(params) {
    const urlRq = `https://api.cloudinary.com/v1_1/${this.cloudinaryConfig.cloudinaryName}/resources/image/upload`;
    return {
      method: 'DELETE',
      url: urlRq,
      auth: {
        username: this.cloudinaryConfig.apikey,
        password: this.cloudinaryConfig.apiSecret
      },
      params
    };
  }
}

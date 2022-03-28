import * as React from 'react';
import {BaseComponent} from 'react-onex';
import {getLocale, handleError, showToast, storage} from 'uione';
import DropZone from '../../core/DropZone';
import applicationContext from '../config/ApplicationContext';
import {Album} from '../model/Album';
import {InfoImage} from '../model/InfoImage';
import {Stream} from '../model/Stream';
import './album.scss';
import './upload.scss';

export class UploadForm extends BaseComponent<any, any> {
  constructor(props) {
    super(props,storage.resource() ,storage.ui(), getLocale);
    this.state = {
      className: 'drop-zone-hide'
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  uploadOnClick = (event) => {
    event.preventDefault();
    const files = event.target.files ? event.target.files : event.dataTransfer.files;
    this.validateUploadFile(files, () => {
      this.handleUploadFile(files);
    });
  }

  handDropOnClick = (event) => {
    const files = event.target.files ? event.target.files : event.dataTransfer.files;
    this.validateUploadFile(files, () => {
      this.handleUploadFile(files);
    });
  }

  validateUploadFile(files: any, callback) {
    if (files) {
      const fileType = files[0].type;
      const isImage = /^(image)\//i.test(fileType);
      if (isImage) {
        callback(files);
      } else {
        storage.alert().alertWarning('No image!');
      }
    }
  }

  async handleUploadFile(files: any) {
    try {
      const service = applicationContext.albumService;
      const filesUpload = [];
      const size = files.length;
      // @ts-ignore
      for (const i = 0; i < size; i++) {
        filesUpload.push(files[i]);
      }
      const images: InfoImage[] = await service.uploadImageCloudinary(filesUpload);
      const album = new Album();
      // album.createBy = storage.getUserName();
      // album.createDate = new Date();
      const streams = [];
      for (const img of images) {
        const stream = new Stream();
        stream.url = img.url;
        stream.publicId = img.public_id;
        streams.push(stream);
      }
      album.stream = streams;
      // update stream album
      if (this.props.albumId) {
        const albumUpdate = this.props.album;
        albumUpdate.stream = album.stream;  // stream push
        const obj = await service.uploadStreamAlbum(albumUpdate);
        showToast('Update Image Album Success!');
      } else {
        // insert data
        const obj = await service.insert(album);
        showToast('Save Success!');
      }
    } catch (err) {
      handleError(err);
    }
  }

  clearMessage = () => {
    const proccessHtml = document.getElementById('progress');
    const proccessBar = document.getElementById('progress-bar');
    const text_proccessHtml = document.getElementById('box__text_proccess');
    proccessBar.style.display = 'block';
    text_proccessHtml.textContent = '';
    proccessHtml.textContent = '';
    const _done = document.getElementById('box__success');
    _done.style.display = 'block';
    _done.innerHTML = '';
    proccessBar.style.display = 'none';
  }

  render() {
    return (
      <form method='post' action=''
            encType='multipart/form-data'>
        <DropZone handle_Drop={this.handDropOnClick}>
          <div className='box__input'>
            <input className='box__file' type='file' name='files[]' id='file' accept='image/*'
                   data-multiple-caption='{count} files selected' onChange={this.uploadOnClick} multiple={true}/>
            <label htmlFor='file'><strong>Choose a file</strong><span
              className='box__dragndrop'> or drag it here</span>.</label>
            <button className='box__button' type='submit'>Upload</button>
          </div>
          <div className='box__uploading'>Uploading&hellip;</div>
          <div className='progress-bar' id='progress-bar'>
            <div className='progress' id='progress'/>
          </div>
          <span id='box__text_proccess'/>
          <div id='box__success' className='box__success' >Done!</div>
          <div className='box__error'>Error! .</div>
        </DropZone>
      </form>
    );
  }
}

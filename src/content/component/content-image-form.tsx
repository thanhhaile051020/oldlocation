import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {confirm} from 'ui-alert';
import {alertError, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {ContentImage} from '../model/ContentImage';

interface InternalState {
  contentImage: ContentImage;
  action: string;
}

export class ContentImageForm extends EditComponent<ContentImage, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.contentImageService, storage.resource(), storage.ui(), showToast, alertError, confirm);
    this.state = {
      contentImage: this.createModel(),
      action: props['props'].match.params.action
    };
  }

  private onSelectFile = (event) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.match('image/*')) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          this.state.contentImage.thumbnail = reader.result.split(',')[1];
        };
      } else {
        event.target.value = '';
        // this.messageDialogService.alert('Error', 'Only image file are allowed!', 'Close').subscribe(() => {
        // });
      }
    }
  }

  render() {
    const resource = this.resource;
    const {action, contentImage} = this.state;
    return (
      <div className='view-container'>
        <form id='userForm' name='userForm' model-name='contentImage' ref='form'>
          <header>
            <button type='button' className='btn-back' onClick={this.back}><i className=''/></button>
            <h2>{resource.image_title}</h2>
          </header>
          <div>
            <section className='row'>
              <label className='col s12'>
                {resource.image_id}
                <input type='text'
                       id='id' name='id'
                       disabled={action === 'edit'}
                       value={contentImage.id}
                       onChange={this.updateState}
                       maxLength={255}
                       placeholder={resource.placeholder_image_id}/>
              </label>
              <label className='col s12'>
                {resource.image_seq}
                <input type='text'
                       id='sequence' name='sequence'
                       value={contentImage.sequence}
                       onChange={this.updateState}
                       maxLength={255} required={true}
                       placeholder={resource.placeholder_image_sequence}/>
              </label>
              <label className='col s12'>
                {resource.image_name}
                <input type='text'
                       id='name' name='imageName'
                       value={contentImage.imageName}
                       onChange={this.updateState}
                       maxLength={255} required={true}
                       placeholder={resource.placeholder_image_name}/>
              </label>
              <label className='col s12'>
                {resource.image_choose_file}
                <input type='file' accept='image/*'
                       className='form-control' onChange={this.onSelectFile}/>
              </label>
            </section>
          </div>
          <footer>
            {this.editable &&
            <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
              {resource.save}
            </button>}
          </footer>
        </form>
      </div>
    );
  }


}

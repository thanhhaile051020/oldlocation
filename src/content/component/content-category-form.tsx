import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {confirm} from 'ui-alert';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {ContentCategory} from '../model/ContentCategory';
import './content-category.scss';

interface InternalState {
  contentCategory: ContentCategory;
}

export class ContentCategoryForm extends EditComponent<ContentCategory, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.contentCategoryService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      contentCategory: this.createModel(),
      action: props['props'].match.params.action,
    };
  }

  render() {
    const resource = this.resource;
    const { action, contentCategory } = this.state;
    return (
      <div className='content-category view-container'>
        <form id='contentCategoryForm' name='contentCategoryForm' model-name='contentCategory' ref='form'>
          <header className='view-header'>
            <button type='button' className='btn-back' onClick={this.back} />
            <h2>{resource.category_title}</h2>
          </header>
          <div className='view-body'>
            <label>
              {resource.category_id}
              <input type='text'
                id='contentcategoryId' name='contentcategoryId'
                disabled={action === 'edit'}
                value={contentCategory.contentcategoryId}
                placeholder={resource.placeholder_category_id}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.category_seq}
              <input type='text'
                id='sequence' name='sequence'
                value={contentCategory.sequence}
                placeholder={resource.placeholder_sequence}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.category_th_desc}
              <input type='text'
                id='descriptionTH' name='descriptionTH'
                value={contentCategory.descriptionTH}
                placeholder={resource.placeholder_category_th_desc}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.category_en_desc}
              <input type='text'
                id='descriptionEN' name='descriptionEN'
                value={contentCategory.descriptionEN}
                placeholder={resource.placeholder_descriptionEN}
                onChange={this.updateState}
                maxLength={255} required={true} />
            </label>
            <label>
              {resource.category_allow_unfollow}
              <input type='checkbox'
                id='allowUnfollow' name='allowUnfollow'
                checked={contentCategory.allowUnfollow ? true : false}
                onChange={this.updateState}
              />
            </label>
          </div>
          <footer>
            <button type='submit'
              id='btnSave' name='btnSave'
              onClick={this.saveOnClick}>{resource.button_save}
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

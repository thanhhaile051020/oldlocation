import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {confirm} from 'ui-alert';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Article} from '../model/Article';
import './article.scss';
import {CommentForm} from './comment-form';
import './comment-item.scss';
import {TextEditorComponent} from './text-editor';

interface InternalState {
  article: Article;
}

export class ArticleForm extends EditComponent<Article, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.articleService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      article: this.createModel(),
      update: false,
      disabled: true,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    const action = props['props'].match.params.action;
    if (action === 'edit') {
      this.newMode = false;
    } else {
      this.newMode = true;
    }
  }
/*
  protected formatModel(obj): any {
    this.setState({ articleBody: obj.body });
    return super.formatModel(obj);
  }
*/
  handleEditClick() {
    this.setState({ disabled: !this.state.disabled });
  }

  public editorChange = (textEditor: string) => {
    const { article } = this.state;
    article.body = textEditor;
    this.setState({ article });
  }

  render() {
    const idComment = this.props['props'].match.params.id;
    const resource = this.resource;
    const { article, articleBody } = this.state;

    return (
      <div>
        <article>
          <div className='article view-container'>
            <form id='articleForm' name='articleForm' model-name='article' className='form'>
              <header className='view-header'>
                <button type='button' className='btn-back' onClick={this.back} />
                <h2>{resource.article}</h2>
                {this.editable && <button type='button' id='btnEdit' name='btnEdit' className='btn-edit' onClick={this.handleEditClick} />}
              </header>
              <div className='view-body'>
                <label className={'required'}>{resource.article_title}
                  <input type='text' className='form-control' id='title' name='title' onChange={this.updateState}
                    value={article.title}
                    required={true}
                    placeholder={resource.article_title}
                    disabled={(this.state.disabled) ? true : false} />
                </label>
                <label>{resource.article_description}
                  <input type='text' className='form-control' id='description' name='description'
                    value={article.description}
                    onChange={this.updateState}
                    placeholder={resource.article_description}
                    disabled={(this.state.disabled) ? true : false} />
                </label>
                <label className={'lb-text-editor'}>{resource.article_body}
                  <TextEditorComponent location={null} history={null} html={articleBody} disabled={(this.state.disabled) ? true : false}
                    editorChange={this.editorChange} />
                </label>
                <label>{resource.status}
                  <div className='radio-group'>
                    <label className='radio-container'>{resource.status_active}
                      {resource.article_active}
                      <input type='radio' id='active' name='status' onChange={this.updateState} disabled={(this.state.disabled) ? true : false}
                        checked={article.status === 'A'} value='A' />
                    </label>
                    <label className='radio-container'>{resource.status_inactive}
                      {resource.article_inactive}
                      <input type='radio' id='inactive' name='status' onChange={this.updateState} disabled={(this.state.disabled) ? true : false}
                        checked={article.status === 'I'} value='I' />
                    </label>
                  </div>
                </label>
              </div>
              <footer>
                <button type='button' className='btn btn-primary' id='btnSave' name='btnSave'
                  onClick={this.saveOnClick}>
                  {resource.button_save}
                </button>
              </footer>
            </form>
          </div>
        </article>
        <CommentForm parentId={idComment} parentType={''} disabled={(this.state.disabled) ? true : false} />;
      </div>
    );
  }
}

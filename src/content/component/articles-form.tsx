import {SearchModel} from 'onecore';
import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Article} from '../model/Article';
import './comment-item.scss';


export class ArticlesForm extends SearchComponent<Article, SearchModel, HistoryProps, SearchState<Article>> {
  constructor(props) {
    super(props, applicationContext.articleService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      keyword: '',
      results: []
    };
  }

  saveOnClick = (event) => {
    event.preventDefault();
    this.form = event.target.form;
  }

  edit = (e, id: string) => {
    e.preventDefault();
    this.props.history.push('/content/articles/edit/' + id);
  }

  render() {
    const idComment = this.props['props'].match.params.id;
    const resource = this.resource;
    return (
      <div>
        <div className='article view-container'>
          <header>
            <h2>Article List Header</h2>
            {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
          </header>
          <div className='view-body'>
            <form id='locationsForm' name='locationsForm' noValidate={true} ref='form'>
              <section className='row search-group'>
                <label className='col s12 m6 search-input'>
                  <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged} />
                  <input type='text' id='keyword' name='keyword' value={this.state.keyword} onChange={this.updateState} maxLength={1000} placeholder={resource.keyword} />
                  <button type='button' hidden={this.state.keyword === ''} className='btn-remove-text' onClick={this.clearKeyword} />
                  <button type='submit' className='btn-search' onClick={this.searchOnClick} />
                </label>
                <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
              </section>
            </form>
            <form className='list-result'>
              <div className='table-responsive'>
                <table className='table table-striped table-bordered table-hover'>
                  <thead>
                    <tr>
                      <th data-field='title'><a id='sortTitle'
                        onClick={this.sort}>{resource.article_title}</a>
                      </th>
                      <th data-field='description'><a id='sortDescription'
                        onClick={this.sort}>{resource.article_description}</a>
                      </th>
                      <th data-field='status'><a id='sortStatus' onClick={this.sort}>{resource.article_status}</a>
                      </th>
                      <th className='col-action'><a>{resource.action}</a></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state && this.state.results && this.state.results.map((article, i) => {
                      return (
                        <tr key={article.articleId}>
                          <td>{article.title}</td>
                          <td>{article.description}</td>
                          <td>{article.status}</td>
                          <td className='col-action'>
                            <div className='btn-group'>
                              {(this.editable || this.viewable) &&
                                <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, article.articleId)} />}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

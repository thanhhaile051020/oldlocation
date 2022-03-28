import {SearchModel} from 'onecore';
import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {Link} from 'react-router-dom';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {ContentCategory} from '../model/ContentCategory';
import './content-category.scss';

export class ContentCategoriesForm extends SearchComponent<ContentCategory, SearchModel, HistoryProps, SearchState<ContentCategory>> {
  constructor(props) {
    super(props, applicationContext.contentCategoryService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());

    this.state = {
      keyword: '',
      results: []
    };
  }

  render() {
    const resource = this.resource;
    return (
      <div className='content-category view-container'>
        <header>
          <h2>{resource.category_list}</h2>
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
              <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} />
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table className='table table-striped table-bordered table-hover'>
                <thead>
                  <tr>
                    <th data-field='contentcategoryId'><a id='sortcontentcategoryId' onClick={this.sort}
                    >{resource.category_id}</a></th>
                    <th data-field='sequence'><a id='sequence' onClick={this.sort}
                      >{resource.category_seq}</a></th>
                    <th data-field='descriptionTH'><a id='descriptionTH' onClick={this.sort}
                      >{resource.category_th_desc}</a></th>
                    <th data-field='descriptionEN'><a id='descriptionEN' onClick={this.sort}
                      >{resource.category_en_desc}</a></th>
                    <th data-field='allowUnfollow'><a id='allowUnfollow' onClick={this.sort}
                      >{resource.category_allow_unfollow}</a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((category, i) => {
                    return (
                      <tr key={category.contentcategoryId}>
                        <td><Link to={'/content/content-category/edit/' + category.contentcategoryId}>{category.contentcategoryId}</Link></td>
                        <td>{category.sequence}</td>
                        <td>{category.descriptionTH}</td>
                        <td>{category.descriptionEN}</td>
                        <td><input type='checkbox' disabled={true}
                          id='allowUnfollow' name='allowUnfollow'
                          checked={category.allowUnfollow}
                          onChange={this.updateState}
                        /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} />
          </form>
        </div>
      </div>
    );
  }
}

import {SearchModel} from 'onecore';
import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {ContentImage} from '../model/ContentImage';

export class ContentImages extends SearchComponent<ContentImage, SearchModel, HistoryProps, SearchState<ContentImage>> {
  constructor(props) {
    super(props, applicationContext.contentImageService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());

    this.state = {
      keyword: '',
      results: []
    };
  }

  edit = (e, id: string) => {
    e.preventDefault();
    this.props.history.push('/content/content-image/edit/' + id);
  }

  render() {
    const resource = this.resource;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.image_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='usersForm' name='usersForm' noValidate={true} ref='form'>
            <section className='row search-group inline'>
              <label className='col s12 m5 l6'>
                {resource.image_name}
                <input
                  type='text'
                  id='imageName'
                  name='imageName'
                  value={this.state.imageName}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.image_name} />
              </label>
            </section>
            <section className='btn-group'>
              <label>
                {resource.page_size}
                <PageSizeSelect
                  pageSize={this.pageSize}
                  pageSizes={this.pageSizes}
                  onPageSizeChanged={this.pageSizeChanged}
                />
              </label>
              <button type='submit' className='btn-search'
                onClick={this.searchOnClick}>{resource.search}</button>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table className='table table-striped table-bordered table-hover'>
                <thead>
                  <tr>
                    <th data-field='id'><a id='sortUserName' onClick={this.sort}
                      >{resource.image_id}</a></th>
                    <th data-field='sequence'><a id='sortFirstName' onClick={this.sort}
                      >{resource.image_seq}</a></th>
                    <th data-field='imageName'><a id='sortLastName' onClick={this.sort}
                      >{resource.image_name}</a></th>
                    <th data-field='thumbnail'><a id='sortEmail' onClick={this.sort}
                      >{resource.image_thumbnail}</a></th>
                    <th data-field='updateDate'><a id='sortDateOfBirth' onClick={this.sort}
                      >{resource.image_update_date}</a></th>
                    <th data-field='remark'><a id='sortDateOfBirth' onClick={this.sort}
                      >{resource.image_remark}</a></th>
                    <th className='col-action'><a>{resource.action}</a></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((image, i) => {
                    return (
                      <tr key={i}>
                        <td>{image.id}</td>
                        <td>{image.sequence}</td>
                        <td>{image.imageName}</td>
                        <td><img src={'data:image/jpeg;base64,' + image.thumbnail} /> {}</td>
                        <td>{image.updateDate}</td>
                        <td>remark</td>
                        <td className='col-action'>
                          <div className='btn-group'>
                            {(this.editable || this.viewable) &&
                              <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, image.id)} />}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
          </form>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Bookable} from '../model/Bookable';
import {BookableSM} from '../search-model/BookableSM';

export class BookablesForms extends SearchComponent<Bookable, BookableSM, HistoryProps, SearchState<Bookable>> {
  constructor(props) {
    super(props, applicationContext.bookableService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      keyword: '',
      results: [],
      locationName: ''
    };
  }
  protected clearUserId = () => {
    this.setState({
      locationName: ''
    });
  }
  edit = (e, id: string) => {
    e.preventDefault();
    this.props.history.push('bookable/edit/' + id);
  }

  render() {
    const resource = this.resource;
    const { locationName } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.user_list}</h2>
          {<button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='bookablesForm' name='bookablesForm' noValidate={true} ref='form'>
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
            <ul className='row list-view'>
              {this.state && this.state.results && this.state.results.map((bookable, i) => {
                return (
                  <li key={i} className='col s12 m6 l4 xl3' onClick={(e) => this.edit(e, bookable.bookableId)}>
                    <section>
                      {/*<img src={maleIcon} className='round-border'/>*/}
                      <div>
                        <h3>{bookable.bookableName}</h3>
                        <p>{bookable.bookableDescription}</p>
                      </div>
                      <button id={'btnView' + i} className='btn-detail' />
                    </section>
                  </li>
                );
              })}
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

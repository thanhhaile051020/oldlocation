import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Location} from '../model/Location';
import {LocationSM} from '../search-model/LocationSM';

export class LocationsForm extends SearchComponent<Location, LocationSM, HistoryProps, SearchState<Location>> {
  constructor(props) {
    super(props, applicationContext.locationService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
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
    this.props.history.push('location/edit/' + id);
  }

  render() {
    const resource = this.resource;
    return (
      <div className='view-container'>
        <header>
          <h2>Locations</h2>
          {<button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='locationsForm' name='locationsForm' noValidate={true} ref='form'>
            <section className='row search-group'>
              <label className='col s12 m6 search-input'>
                <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged}/>
                <input type='text' id='keyword' name='keyword' value={this.state.keyword} onChange={this.updateState} maxLength={1000} placeholder={resource.keyword}/>
                <button type='button' hidden={this.state.keyword === ''} className='btn-remove-text' onClick={this.clearKeyword}/>
                <button type='submit' className='btn-search' onClick={this.searchOnClick}/>
              </label>
              <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
            </section>
          </form>
          <form className='list-result'>
            <ul className='row list-view'>
              {this.state && this.state.results && this.state.results.map((location, i) => {
                return (
                  <li key={i} className='col s12 m6 l4 xl3' onClick={(e) => this.edit(e, location.locationId)}>
                    <section>
                      {/*<img src={maleIcon} className='round-border'/>*/}
                      <div>
                        <h3>{location.locationName}</h3>
                        <p>{location.description}</p>
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

import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError, getLocale, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Event} from '../model/Event';
import {EventSM} from '../search-model/EventSM';

export class EventsForms extends SearchComponent<Event, EventSM, HistoryProps, SearchState<Event>> {
  constructor(props) {
    super(props, applicationContext.eventService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      keyword: '',
      results: [],
      eventName: ''
    };
  }
  protected clearUserId = () => {
    this.setState({
      eventName: ''
    });
  }
  edit = (e, id: string) => {
    e.preventDefault();
    this.props.history.push('event/edit/' + id);
  }

  render() {
    const resource = this.resource;
    const { eventName } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>Search Event</h2>
          {<button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='eventsForm' name='eventsForm' noValidate={true} ref='form'>
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
              {this.state && this.state.results && this.state.results.map((event, i) => {
                return (
                  <li key={i} className='col s12 m6 l4 xl3' onClick={(e) => this.edit(e, event.eventId)}>
                    <section>
                      {/*<img src={maleIcon} className='round-border'/>*/}
                      <div>
                        <h3>{event.eventName}</h3>
                        <p>{event.locationId}</p>
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

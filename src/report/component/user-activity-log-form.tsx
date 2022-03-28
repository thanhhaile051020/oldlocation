import * as moment from 'moment';
import * as React from 'react';
import {DayModifiers} from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {setValue} from 'reflectx';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, handleError, storage} from 'uione';
import '../../assets/css/datepicker.css';
import {applicationContext} from '../config/ApplicationContext';
import {UserActivityLog} from '../model/UserActivityLog';
import {UserActivityLogSM} from '../search-model/UserActivityLogSM';

enum RadioValue  {
  C = 'C',
  CN = 'CN'
}

export class UserActivityLogForm extends SearchComponent<UserActivityLog, UserActivityLogSM, HistoryProps, SearchState<UserActivityLog>> {
  constructor(props) {
    super(props, applicationContext.userActivityLogService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatDateTime = this.formatDateTime.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.updateDayPicker = this.updateDayPicker.bind(this);
    this.state = {
      results: [],
      userActivityLogsList: [],
      userActivitySM: {
        entityType: '',
        consumer: '',
        entityName: '',
        actionStatus: '',
        userId: '',
        actionDate: {
          startDate: new Date(),
          endDate: new Date()
        }
      }
    };
    this.initPageSize = 5;
    this.dateFormat = storage.getDateFormat();
    this.dateTimeFormat = this.dateFormat + ' hh:mm:ss';
  }
  protected dateFormat: string;
  protected dateTimeFormat: string;
  private readonly masterDataService = applicationContext.masterDataService;

  load(s: UserActivityLogSM, auto: boolean) {
    this.masterDataService.getUserActivityLogs()
      .then(userActivityLogsList => this.setState(prevState => ({...prevState, userActivityLogsList}), () => super.load(s, auto)))
      .catch(handleError);
  }
  protected formatDateTime(date: Date): string {
    if (!date) {
      return '';
    }
    return moment(date).format(this.dateTimeFormat);
  }
  protected formatDate(date: Date, format?: string, locale?: string): string {
    if (format) {
      return moment(date).format(format); // DateUtil.formatDate(date, format);
    } else {
      const l = this.getLocale();
      return moment(date).format(l.dateFormat); // DateUtil.formatDate(date, format);
    }
  }
  protected parseDate(date: string, format?: string, locale?: string): Date {
    return new Date(date);
  }
  protected updateDayPicker(day: Date, dayModifiers: DayModifiers, dayPickerInput: DayPickerInput) {
    const ctr = dayPickerInput;
    const props: any = ctr.props;
    const value = ctr.state.value;
    const input = ctr.getInput();
    const form = input.form;
    const modelName = form.getAttribute('model-name');
    const state = this.state[modelName];
    let dataField = props['data-field'];
    if (!dataField && input.parentElement.classList.contains('DayPickerInput')) {
      const label = input.parentElement.parentElement;
      dataField = label.getAttribute('data-field');
    }
    const valueSplit = value.split('/');
    const date = new Date(valueSplit[2], valueSplit[0] - 1, valueSplit[1]);

    if (props.setGlobalState) {
      const data = props.shouldBeCustomized ? this.prepareCustomData({ [dataField]: date }) : { [dataField]: date };
      props.setGlobalState({ [modelName]: { ...state, ...data } });
    } else {
      if (form) {
        if (modelName && modelName !== '') {
          if (dataField.indexOf('.') !== -1) {
            const arrSplit = dataField.split('.');
            const obj = {...state[arrSplit[0]], [arrSplit[1]]: date};
            this.setState({[modelName]: {...state, [arrSplit[0]]: obj}});
          } else {
            this.setState({[modelName]: {...state, [dataField]: date}});
          }
        } else {
          if (dataField.indexOf('.') > 0) {
            const split = dataField.split('.');
            const dateObj = this.state[split[0]];
            const indexdot = dataField.indexOf('.');
            const subrightdatafield = dataField.substring(indexdot, dataField.length);
            setValue(dateObj, subrightdatafield, date);
          } else {
            this.setState({[dataField]: date});
          }
        }
      }
    }
  }
  render() {
    const resource = this.resource;
    const { userActivitySM, userActivityLogsList } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.user_activity_log_search}</h2>
        </header>
        <div>
          <form id='userActivityLogForm' name='userActivityLogForm' model-name='userActivitySM' noValidate={true} ref={this.ref}>
            <section className='row radio-group'>
              <label className='col s6'>
                <input
                  type='radio'
                  id='entityType'
                  name='entityType'
                  onChange={this.updateState}
                  checked={userActivitySM.entityType === RadioValue.C.toString() ? true : false}
                  value={RadioValue.C}
                />
                {resource.transaction_fee_setup_form_consumer}
                <input
                  type='text'
                  id='consumer'
                  name='consumer'
                  value={userActivitySM.consumer}
                  onChange={this.updateState}
                  maxLength={255}
                  disabled={this.state.entityType !== RadioValue.C}
                  placeholder={resource.transaction_fee_setup_form_consumer} />
              </label>
              <label className='col s6'>
                <input
                  type='radio'
                  id='entityType'
                  name='entityType'
                  onChange={this.updateState} checked={userActivitySM.entityType === RadioValue.CN.toString() ? true : false}
                  value={RadioValue.CN}
                />
                {resource.company_name}
                <input
                  type='text'
                  id='entityName'
                  name='entityName'
                  value={userActivitySM.entityName}
                  onChange={this.updateState}
                  maxLength={255}
                  disabled={this.state.entityType !== RadioValue.CN}
                  placeholder={resource.company_name} />
              </label>
            </section>
            <section className='row search-group'>
              <label className='col s6 m6 l3'>
                {resource.action_type}
                <select
                  id='actionStatus'
                  name='actionStatus'
                  value={userActivitySM.actionStatus}
                  onChange={this.updateState}
                >
                  <option key={0} value=''>{resource.all}</option>
                  )
                  {userActivityLogsList.map((item, index) => (
                    <option key={index + 1} value={item.value}>{item.text}</option>)
                  )}
                </select>
              </label>
              <label className='col s6 m6 l3'>
                {resource.user_id}
                <input
                  type='text'
                  id='userId'
                  name='userId'
                  value={userActivitySM.userId}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.user_id} />
              </label>
              <label className='col s6 m6 l3' data-field='actionDate.startDate'>
                {resource.user_access_date_from}
                  <DayPickerInput
                    placeholder={this.dateFormat}
                    format={this.dateFormat}
                    formatDate={this.formatDate}
                    parseDate={this.parseDate}
                    value={userActivitySM.actionDate.startDate}
                    onDayChange={this.updateDayPicker}
                  />
              </label>
              <label className='col s6 m6 l3 up-date-picker2' data-field='actionDate.endDate'>
                {resource.user_access_date_to}
                  <DayPickerInput
                    placeholder={this.dateFormat}
                    format={this.dateFormat}
                    formatDate={this.formatDate}
                    parseDate={this.parseDate}
                    value={userActivitySM.actionDate.endDate}
                    onDayChange={this.updateDayPicker}
                  />
              </label>
            </section>
            <section className='btn-group'>
              <label>
                {resource.page_size}
                <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged}/>
              </label>
              <button type='submit' className='btn-search' onClick={this.searchOnClick}>{resource.search}</button>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field='userId'><button type='button' id='sortUserId' onClick={this.sort}>{resource.user_id}</button></th>
                    <th data-field='actedBy'><button type='button' id='sortActedBy' onClick={this.sort}>{resource.acted_by}</button></th>
                    <th data-field='actionStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='actionDate'><button type='button' id='sortActionDate' onClick={this.sort}>{resource.action_date}</button></th>
                    <th data-field='description'><button type='button' id='sortDescription' onClick={this.sort}>{resource.description}</button></th>
                    <th data-field='IpAddr'><button type='button' id='sortIpAddr' onClick={this.sort}>{resource.user_activity_log_IP}</button></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((usersActivityLog, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{usersActivityLog.sequenceNo}</td>
                        <td>{usersActivityLog.userId}</td>
                        <td>{usersActivityLog.actedBy}</td>
                        <td>{usersActivityLog.actionStatus}</td>
                        <td>{this.formatDateTime(usersActivityLog.actionDate)}</td>
                        <td>{usersActivityLog.description}</td>
                        <td>{usersActivityLog.IpAddr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} intPageSize={this.initPageSize}/>
          </form>
        </div>
      </div>
    );
  }
}

import * as moment from 'moment';
import * as React from 'react';
import {DayModifiers} from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Modal from 'react-modal';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {setValue} from 'reflectx';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, handleError, storage} from 'uione';
import '../../assets/css/datepicker.css';
import {applicationContext} from '../config/ApplicationContext';
import {WebServiceTransLog} from '../model/WebServiceTransLog';
import {WebServiceTransLogSM} from '../search-model/WebServiceTransLogSM';
import {WebServiceTransLogsHistoryForm} from './web-service-trans-logs-history-form';

const DEFAULT_DATE = 'Mon Jan 01 0001';
export class WebServiceTransLogsForm extends SearchComponent<WebServiceTransLog, WebServiceTransLogSM, HistoryProps, SearchState<WebServiceTransLog>> {
  constructor(props) {
    super(props, applicationContext.webServiceTransLogService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    this.formatDate = this.formatDate.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.updateDayPicker = this.updateDayPicker.bind(this);
    this.state = {
      keyword: '',
      transactionNo: '',
      exSystemRefNo: '',
      webServiceTypes: [],
      webServiceTransLog: {},
      results: [],
      webServicesType: '',
      receiveDate: {
        startDate: new Date(),
        endDate: new Date()
      },
      showData: WebServiceTransLog
    };
    this.initPageSize = 5;
  }
  protected dateFormat: string = storage.getDateFormat();
  private readonly masterDataService = applicationContext.masterDataService;

  load(s: WebServiceTransLogSM, auto: boolean) {
    this.masterDataService.getWebServiceTypes()
      .then(webServiceTypes => this.setState(prevState => ({...prevState, webServiceTypes}), () => super.load(s, auto)))
      .catch(handleError);
  }

  checkDate(value) {
    const defaultDate = new Date(DEFAULT_DATE);
    const webServiceTransLogDate = new Date(value);
    if (webServiceTransLogDate.getDate() !== defaultDate.getDate() && webServiceTransLogDate.getMonth() !== defaultDate.getMonth() && webServiceTransLogDate.getFullYear() !== defaultDate.getFullYear()) {
      return true;
    }
    return false;
  }

  showPopup = (e, showData) => {
    e.preventDefault();
    this.setState({ modalIsOpen: true, showData });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
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
    const { exSystemRefNo, transactionNo } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.web_services_trans_search}</h2>
        </header>
        <div>
          <form id='webServicesTransLogForm' name='webServicesTransLogForm' noValidate={true} ref={this.ref}>
            <section className='row search-group'>
              <label className='col s6 m6 l3'>
                {resource.corr_id}
                <input
                  type='text'
                  id='exSystemRefNo'
                  name='exSystemRefNo'
                  value={exSystemRefNo}
                  onChange={this.updateState}
                  maxLength={12}
                  placeholder={resource.corr_id} />
              </label>
              <label className='col s6 m6 l3'>
                {resource.transNo}
                <input
                  type='text'
                  id='transactionNo'
                  name='transactionNo'
                  value={transactionNo}
                  onChange={this.updateState}
                  maxLength={12}
                  placeholder={resource.transNo} />
              </label>
              <label className='col s12 m6 l3' data-field='receiveDate.startDate'>
                {resource.receive_date_from} ({this.dateFormat})
                  <DayPickerInput
                    placeholder={this.dateFormat}
                    parseDate={this.parseDate}
                    format={this.dateFormat}
                    formatDate={this.formatDate}
                    value={this.state.receiveDate.startDate}
                    onDayChange={this.updateDayPicker}
                  />
              </label>
              <label className='col s12 m6 l3' data-field='receiveDate.endDate'>
                {resource.receive_date_to} ({this.dateFormat})
                  <DayPickerInput
                    placeholder={this.dateFormat}
                    parseDate={this.parseDate}
                    format={this.dateFormat}
                    formatDate={this.formatDate}
                    value={this.state.receiveDate.endDate}
                    onDayChange={this.updateDayPicker}
                  />
              </label>
            </section>
            <section className='btn-group'>
              <label>
                {resource.page_size}
                <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged} />
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
                    <th data-field='exSysRefNo'><button type='button' id='aexSysRefNo' onClick={this.sort}>{resource.corr_id}</button></th>
                    <th data-field='transNo'><button type='button' id='transNo' onClick={this.sort}>{resource.transNo}</button></th>
                    <th data-field='exSysName'><button type='button' id='exSysName' onClick={this.sort}>{resource.externalsys_name}</button></th>
                    <th data-field='webServicesType'><button type='button' id='sortWebServicesType' onClick={this.sort}>{resource.web_services_type}</button></th>
                    <th data-field='detail'><button type='button' id='detail' onClick={this.sort}>{resource.detail}</button></th>
                    <th data-field='statusCode'><button type='button' id='statusCode' onClick={this.sort}>{resource.action_date}</button></th>
                    <th data-field='receiveDate'><button type='button' id='receiveDate' onClick={this.sort}>{resource.created_date}</button></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((log, i) => {
                    return (
                      <tr key={i} onClick={(e) => this.showPopup(e, log)}>
                        <td className='text-right'>{log.sequenceNo}</td>
                        <td>{log.exSysRefNo}</td>
                        <td>{log.transNo}</td>
                        <td>{log.exSysName}</td>
                        <td>{log.webServicesType}</td>
                        <td>{log.detail}</td>
                        <td>{log.statusCode}</td>
                        <td>{log.receiveDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
          </form>
          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel='Modal'
              portalClassName='modal-portal'
              className='modal-portal-content small-width'
              bodyOpenClassName='modal-portal-open'
              overlayClassName='modal-portal-backdrop'
          >
            <WebServiceTransLogsHistoryForm
              resource={resource}
              close={this.closeModal}
              data={this.state.showData}/>
          </Modal>
        </div>
      </div>
    );
  }
}

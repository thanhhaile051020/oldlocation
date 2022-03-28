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
import {TransactionLog} from '../model/TransactionLog';
import {TransactionLogSM} from '../search-model/TransactionLogSM';

enum RadioValue {
  C = 'C',
  PE = 'PE',
  PR = 'PR',
}


enum Operator {
  BETWEEN = 'B',
  EQUAL = 'E',
  GREATER_THAN = 'GT',
  GREATER_THAN_OR_EQUAL = 'BTOR',
  LESS_THAN = 'LT',
  LESS_THAN_OR_EQUAL = 'LTOE',
  UNKNOW = ''
}

export class TransactionLogsForm extends SearchComponent<TransactionLog, TransactionLogSM, HistoryProps, SearchState<TransactionLog>> {
  constructor(props) {
    super(props, applicationContext.transactionLogService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatDate = this.formatDate.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.updateDayPicker = this.updateDayPicker.bind(this);
    this.state = {
      keyword: '',
      exShortName: '',
      payerShortName: '',
      payeeShortName: '',
      operatorAmount: '',
      valueTextOptions: [],
      entityType: RadioValue.C,
      results: [],
      operatorsAmount: [],
      actionDate: {
        startDate: new Date(),
        endDate: new Date()
      }
    };
  }
  protected dateFormat: string = storage.getDateFormat();
  private readonly masterDataService = applicationContext.masterDataService;

  load(s: TransactionLogSM, auto: boolean) {
    this.masterDataService.getPaymentAmount()
      .then(operatorsAmount => this.setState({operatorsAmount}, () => super.load(s, auto)))
      .catch(handleError);
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('transaction-log/' + id + '?action=edit');
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
    const {operatorsAmount} = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.audit_trail_transaction_search}</h2>
        </header>
        <div>
          <form id='TransactionLogsForm' name='TransactionLogsForm' noValidate={true} ref={this.ref}>
            <section className='row'>
                <label className='col s12 m6 l4'>
                  {resource.externalsys_short_name}
                  <input
                    type='text'
                    id='exShortName'
                    name='exShortName'
                    value={this.state.exShortName}
                    onChange={this.updateState}
                    maxLength={50}
                    placeholder={resource.externalsys_short_name}
                  />
                </label>
                <label className='col s12 m6 l4'>
                  {resource.payer_short_name}
                  <input
                    type='text'
                    id='payerShortName'
                    name='payerShortName'
                    value={this.state.payerShortName}
                    onChange={this.updateState}
                    maxLength={50}
                    placeholder={resource.payer_short_name}
                  />
                </label>
                <label className='col s12 m6 l4'>
                  {resource.payee_short_name}
                  <input
                    type='text'
                    id='payeeShortName' name='payeeShortName'
                    value={this.state.payeeShortName}
                    onChange={this.updateState}
                    maxLength={50}
                    placeholder={resource.payee_short_name}
                  />
                </label>
                <label className='col s6 m3 l2' data-field='actionDate.startDate'>
                  {resource.transaction_payment_date_from}
                  <DayPickerInput
                    placeholder={this.dateFormat}
                    format={this.dateFormat}
                    formatDate={this.formatDate}
                    parseDate={this.parseDate}
                    value={this.state.actionDate.startDate}
                    onDayChange={this.updateDayPicker}
                  />
                </label>
                <label className='col s6 m3 l2' data-field='actionDate.endDate'>
                  {resource.transaction_payment_date_to}
                  <DayPickerInput
                    placeholder={this.dateFormat}
                    format={this.dateFormat}
                    formatDate={this.formatDate}
                    parseDate={this.parseDate}
                    value={this.state.actionDate.endDate}
                    onDayChange={this.updateDayPicker}
                  />
                </label>
                <label className='col s12 m6 l4'>
                  {resource.transaction_payment_amount}
                  <select
                    id='operatorAmount'
                    name='operatorAmount'
                    onChange={this.updateState}
                  >
                    <option value=''>{resource.please_select}</option>
                    {operatorsAmount.map((item, index) => (
                      <option key={index} value={item.value}>{item.text}</option>)
                    )}
                  </select>
                </label>
                <label className='col s6 m3 l2' hidden={this.state.operatorAmount === Operator.UNKNOW}>
                  {resource.transaction_amount_first}
                  <input
                    type='number'
                    id='firstAmount' name='firstAmount'
                    onChange={this.updateState}
                    value={this.state.firstAmount}
                    placeholder={resource.transaction_amount_first}
                  />
                </label>
                <label className='col s6 m3 l2' hidden={this.state.operatorAmount === Operator.UNKNOW || this.state.operatorAmount !== Operator.BETWEEN}>
                  {resource.transaction_amount_second}
                  <input
                    type='number'
                    id='secondAmount'
                    name='secondAmount'
                    onChange={this.updateState}
                    value={this.state.secondAmount}
                    placeholder={resource.transaction_amount_second}
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
                  <th data-field='exShortName'><button type='button' id='exShortName' onClick={this.sort}>{resource.externalsys_short_name}</button></th>
                  <th data-field='payerShortName'><button type='button' id='payerShortName' onClick={this.sort}>{resource.payer_short_name}</button></th>
                  <th data-field='payeeShortName'><button type='button' id='payeeShortName' onClick={this.sort}>{resource.payee_short_name}</button></th>
                  <th data-field='amount'><button type='button' id='amount' onClick={this.sort}>{resource.transaction_log_amount}</button></th>
                  <th data-field='currency'><button type='button' id='currency' onClick={this.sort}>{resource.transaction_log_currency}</button></th>
                  <th data-field='actionDate'><button type='button' id='actionDate' onClick={this.sort}>{resource.action_date}</button></th>
                  <th data-field='actionStatus'><button type='button' id='actionStatus' onClick={this.sort}>{resource.action_status}</button></th>
                  <th data-field='description'><button type='button' id='description' onClick={this.sort}>{resource.transaction_log_description}</button></th>
                </tr>
                </thead>
                <tbody>
                {this.state && this.state.results && this.state.results.map((transactionLog, i) => {
                  return (
                    <tr key={i}>
                      <td className='text-right'>{transactionLog.sequenceNo}</td>
                      <td>{transactionLog.exShortName}</td>
                      <td>{transactionLog.payerShortName}</td>
                      <td>{transactionLog.payeeShortName}</td>
                      <td>{transactionLog.amount}</td>
                      <td>{transactionLog.currency}</td>
                      <td>{transactionLog.actionDate}</td>
                      <td>{transactionLog.actionStatus}</td>
                      <td>{transactionLog.description}</td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize}
                        maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
          </form>
        </div>
      </div>
    );
  }
}

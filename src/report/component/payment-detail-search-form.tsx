import * as moment from 'moment';
import * as React from 'react';
import Chips from 'react-chips';
import {DayModifiers} from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {setValue} from 'reflectx';
import {DefaultSuggestionService, PreviousSuggestion} from 'suggestion-service';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, handleError, storage} from 'uione';
import '../../assets/css/datepicker.css';
import {applicationContext} from '../config/ApplicationContext';
import {Payee} from '../model/Payee';
import {Payer} from '../model/Payer';
import {PaymentDetail} from '../model/PaymentDetail';
import {PaymentDetailSM} from '../search-model/PaymentDetailSM';
import {PayeesLookup} from './payees-lookup';
import {PayersLookup} from './payers-lookup';

export const MAX_LOOK_UP = 5;
export class PaymentDetailSearchForm extends SearchComponent<PaymentDetail, PaymentDetailSM, HistoryProps, SearchState<PaymentDetail>> {
  constructor(props) {
    super(props, applicationContext.paymentDetailService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    this.formatDate = this.formatDate.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.updateDayPicker = this.updateDayPicker.bind(this);
    this.state = {
      hideDetail: true,
      payeesList: [],
      payersList: [],
      payees: [],
      payers: [],
      externalSystems: [],
      paymentStatusList: [],
      postingTypeList: [],
      paymentStatus: [],
      postingType: [],
      paymentDate: {
        startDate: new Date(),
        endDate: new Date()
      },
      chipsPayee: [],
      chipsPayer: [],
      prePayeeSuggestions: {
        previousKeyWord: '',
        result: [],
      } as PreviousSuggestion<Payee>,
      prePayerSuggestions: {
        previousKeyWord: '',
        result: [],
      } as PreviousSuggestion<Payer>,
    };
  }
  protected dateFormat: string = storage.getDateFormat();
  private readonly apprPayeeService = applicationContext.apprPayeeService;
  private readonly apprPayerService = applicationContext.apprPayerService;
  private readonly apprExternalSysService = applicationContext.apprExternalSysService;
  private readonly masterDataService = applicationContext.masterDataService;
  private readonly chipPayerSuggestionsService = new DefaultSuggestionService<Payer>(this.apprPayerService, MAX_LOOK_UP, 'entityName', 'entityId');
  private readonly chipPayeeSuggestionsService = new DefaultSuggestionService<Payee>(this.apprPayeeService, MAX_LOOK_UP, 'entityName', 'entityId');

  load(s: PaymentDetailSM, auto: boolean) {
    Promise.all([
      this.apprPayeeService.all(),
      this.apprPayerService.all(),
      this.apprExternalSysService.all(),
      this.masterDataService.getPaymentStatus(),
      this.masterDataService.getPostingType(),
    ]).then(values => {
      const [payees, payers, externalSystems, paymentStatusList, postingTypeList] = values;
      this.setState({ payees, payers, externalSystems, paymentStatusList, postingTypeList }, () => {
        const promise = new Promise((resolve, reject) => {
          super.load(s, auto);
        });
        promise.then(() => {
          const chipsPayee = this.state.payees.filter((payee) =>
            this.state.payeesList.includes(payee.entityId));
          const chipsPayer = this.state.payers.filter((payer) =>
            this.state.payersList.includes(payer.entityId));
          this.setState({ chipsPayee, chipsPayer });
        });
      });
    }).catch(handleError);
    /*
    zip(
      this.apprPayeeService.all(),
      this.apprPayerService.all(),
      this.apprExternalSysService.all(),
      this.masterDataService.getPaymentStatus(),
      this.masterDataService.getPostingType(),
    ).subscribe(([payees, payers, externalSystems, paymentStatusList, postingTypeList]) => {
      this.setState({ payees, payers, externalSystems, paymentStatusList, postingTypeList }, () => {
        const promise = new Promise((resolve, reject) => {
          this.loadData();
          resolve('Success!');
        });
        promise.then(() => {
          const chipsPayee = this.state.payees.filter((payee) =>
            this.state.payeesList.includes(payee.entityId));
          const chipsPayer = this.state.payers.filter((payer) =>
            this.state.payersList.includes(payer.entityId));
          this.setState({ chipsPayee, chipsPayer });
        });
      });
    }, this.handleError);
    */
  }
  getSearchModel(): PaymentDetailSM {
    const model = super.getSearchModel();
    model.payeesList = this.state.payeesList;
    model.payersList = this.state.payersList;
    return model;
  }

  onChangePayeeChips = chipsPayee => {
    let { payeesList } = this.state;
    const { payees } = this.state;
    payeesList = [];
    chipsPayee.map((value, index) => {
      const x = payees.find((v) => v.entityId === value.entityId);
      payeesList.push(x.entityId);
    });
    this.setState({ chipsPayee, payeesList });
  }

  onChangePayerChips = (chipsPayer) => {
    let { payersList } = this.state;
    const { payers } = this.state;
    payersList = [];
    chipsPayer.map((value, index) => {
      const x = payers.find((v) => v.entityId === value.entityId);
      payersList.push(x.entityId);
    });
    this.setState({ chipsPayer, payersList });
  }

  toggleSearch = (event) => {
    const target = event.currentTarget;
    if (target.classList.contains('toggle')) {
      target.classList.remove('toggle');
    } else {
      target.classList.add('toggle');
    }
    const { hideDetail } = this.state;
    this.setState({ hideDetail: !hideDetail });
  }

  historyPush = (e) => {
    e.preventDefault();
    this.props.history.push('payment-detail-search/history');
  }

  async fetchSuggestions(keyWords, entityType) {
    const { payersList, payeesList, prePayeeSuggestions, prePayerSuggestions } = this.state;
    if (entityType === 'Payer') {
      const result = await this.chipPayerSuggestionsService.getSuggestion(keyWords, prePayerSuggestions, payersList);
      this.setState({ prePayerSuggestions: result.previousSuggestion });
      return Promise.resolve(result);
    } else {
      const result = await this.chipPayeeSuggestionsService.getSuggestion(keyWords, prePayeeSuggestions, payeesList);
      this.setState({ prePayeeSuggestions: result.previousSuggestion });
      return Promise.resolve(result);
    }
  }

  onRemoveChips = (id, entityType) => {
    let { payersList, payeesList, chipsPayer, chipsPayee } = this.state;
    if (entityType === 'Payer') {
      payersList = payersList.filter(payerId => payerId !== id);
      chipsPayer = chipsPayer.filter(chip => chip.entityId !== id);
    } else {
      payeesList = payeesList.filter(payeeId => payeeId !== id);
      chipsPayee = chipsPayee.filter(chip => chip.entityId !== id);
    }
    this.setState({ payersList, payeesList, chipsPayer, chipsPayee });
  }

  onPayerModalSave = (payers) => {
    let { chipsPayer, payersList } = this.state;
    chipsPayer = chipsPayer.concat(payers);
    payersList = payersList.concat(payers.map(payer => payer.entityId));
    this.setState({ chipsPayer, payersList, modalPayerIsOpen: false });
  }


  openPayerModal = () => {
    this.setState({ modalPayerIsOpen: true });
  }

  onPayeeModalSave = (payees) => {
    let { chipsPayee, payeesList } = this.state;
    chipsPayee = chipsPayee.concat(payees);
    payeesList = payeesList.concat(payees.map(payee => payee.entityId));
    this.setState({ chipsPayee, payeesList, modalPayeeIsOpen: false });
  }

  openPayeeModal = () => {
    this.setState({ modalPayeeIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalPayerIsOpen: false, modalPayeeIsOpen: false });
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
    const { hideDetail, paymentStatusList, paymentStatus, postingTypeList, postingType, chipsPayer, chipsPayee, payersList, modalPayerIsOpen, payeesList, modalPayeeIsOpen } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.payment_detail_search_title}</h2>
        </header>
        <div>
          <form id='paymentDetailSearchForm' name='paymentDetailSearchForm' noValidate={true} ref={this.ref}>
            <section className='row'>
              <label className='col s6 m6 l3' data-field='paymentDate.startDate'>
                {resource.payment_detail_search_date_from} ({this.dateFormat})
                  <DayPickerInput
                  placeholder={this.dateFormat}
                  format={this.dateFormat}
                  formatDate={this.formatDate}
                  parseDate={this.parseDate}
                  value={this.state.paymentDate.startDate}
                  onDayChange={this.updateDayPicker}
                />
              </label>
              <label className='col s6 m6 l3' data-field='paymentDate.endDate'>
                {resource.payment_detail_search_date_to} ({this.dateFormat})
                  <DayPickerInput
                  placeholder={this.dateFormat}
                  format={this.dateFormat}
                  formatDate={this.formatDate}
                  parseDate={this.parseDate}
                  value={this.state.paymentDate.endDate}
                  onDayChange={this.updateDayPicker}
                />
              </label>
              <label className='col s12 m6 l2'>
                {resource.payment_detail_search_tran_id}
                <input type='text' id='transactionId' name='transactionId' />
              </label>
              <label className='col s12 m6 l4'>
                {resource.payment_detail_search_payment_status}
                <section className='checkbox-group'>
                  {paymentStatusList.map((item, index) => (
                    <label key={index}>
                      <input
                        type='checkbox'
                        id={item.value}
                        name='paymentStatus'
                        key={index}
                        value={item.value}
                        checked={paymentStatus.includes(item.value)}
                        onChange={this.updateState} />
                      {item.text}
                    </label>
                  )
                  )}
                </section>
              </label>
              <label className='col s12 chip-container'>
                {resource.payee}
                <Chips
                  value={chipsPayee}
                  onChange={this.onChangePayeeChips}
                  fetchSuggestions={(value) => this.fetchSuggestions(value, 'Payee')}
                  shouldRenderSuggestions={value => value.length >= 1}
                  renderChip={(item) => (
                    <div>
                      <div>{item.entityName} <span onClick={() => this.onRemoveChips(item.entityId, 'Payee')}>&times; &nbsp;</span></div>
                    </div>
                  )}
                  fromSuggestionsOnly={false}
                  renderSuggestion={(item, { query }) => (
                    <div
                      key={item.entityName}>
                      {item.entityName}
                    </div>
                  )}
                  getSuggestionValue={suggestion => suggestion.entityName}
                />
                <button type='button' className='btn-lookup' onClick={this.openPayeeModal} />
              </label>
              <label className='col s12 chip-container'>
                {resource.payer}
                <Chips
                  value={chipsPayer}
                  onChange={this.onChangePayerChips}
                  fetchSuggestions={(value) => this.fetchSuggestions(value, 'Payer')}
                  shouldRenderSuggestions={value => value.length >= 1}
                  renderChip={(item) => (
                    <div>
                      <div>{item.entityName} <span onClick={() => this.onRemoveChips(item.entityId, 'Payer')}>&times; &nbsp;</span></div>
                    </div>
                  )}
                  fromSuggestionsOnly={false}
                  renderSuggestion={(item, { query }) => (
                    <div
                      key={item.entityName}>
                      {item.entityName}
                    </div>
                  )}
                  getSuggestionValue={suggestion => suggestion.entityName}
                />
                <button type='button' className='btn-lookup' onClick={this.openPayerModal} />
              </label>
              {hideDetail === true ? '' :
                <React.Fragment>
                  <label className='col s12 m6 l4'>
                    {resource.payment_detail_search_payment_mode}
                    <section className='checkbox-group'>
                      {postingTypeList.map((item, index) => (
                        <label>
                          <input
                            type='checkbox'
                            id={item.value}
                            name='postingType'
                            key={index}
                            value={item.value}
                            checked={postingType.includes(item.value)}
                            onChange={this.updateState} />
                          {item.text}
                        </label>
                      )
                      )}
                    </section>
                  </label>
                  <label className='col s6 m6 l4'>
                    {resource.payment_detail_search_enternal_system_reference_number}
                    <select id='externalSystemId' name='externalSystemId'>
                      <option selected={true} value=''>{resource.all}</option>
                      {this.state.externalSystems.map((item, index) => (
                        <option key={index} value={item.esId}>{item.esSysName}</option>)
                      )}
                    </select>
                  </label>
                  <label className='col s6 m6 l4'>
                    {resource.transaction_payment_amount}
                    <input type='number' id='amount' name='amount' className='text-right' maxLength={13} onChange={this.updateState} />
                  </label>
                </React.Fragment>
              }
            </section>
            <section className='btn-group'>
              <label>
                {resource.page_size}
                <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged} />
              </label>
              <button type='button' className='btn-advance-search' onClick={this.toggleSearch}>
                {hideDetail ? resource.button_advance_search : resource.button_basic_search}
              </button>
              <button type='submit' className='btn-search' onClick={this.searchOnClick}>{resource.search}</button>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th>{resource.payment_detail_search_ex_sys_reference_num}</th>
                    <th>{resource.external_system}</th>
                    <th>{resource.payee}</th>
                    <th>{resource.payment_detail_search_payer_consumer}</th>
                    <th>{resource.payment_detail_search_currency}</th>
                    <th>{resource.transaction_payment_amount}</th>
                    <th>{resource.payment_detail_search_payment_mode}</th>
                    <th>{resource.payment_detail_search_payment_status}</th>
                    <th>{resource.payment_detail_search_debit_acc_no}</th>
                    <th>{resource.payment_detail_search_tran_id}</th>
                    <th>{resource.payment_detail_search_tran_date}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((paymentDetail, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{paymentDetail.sequenceNo}</td>
                        <td>{paymentDetail.externalSystemId}</td>
                        <td>{paymentDetail.externalSystemName}</td>
                        <td>{paymentDetail.payeeName}</td>
                        <td>{paymentDetail.payerName}</td>
                        <td>{paymentDetail.currencyCode}</td>
                        <td>{paymentDetail.amount}</td>
                        <td>{paymentDetail.postingType}</td>
                        <td>{paymentDetail.paymentStatus}</td>
                        <td>{paymentDetail.feeDebitBankAccount}</td>
                        <td>{paymentDetail.transactionId}</td>
                        <td>{paymentDetail.transactionDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize}
              maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
          </form>
          <PayersLookup
            resource={resource}
            isOpenModal={modalPayerIsOpen}
            closeModal={this.closeModal}
            history={this.props.history}
            location={this.props.location}
            props={this.props['props']}
            onModalSave={this.onPayerModalSave}
            excluding={{ entityId: payersList }}
          />
          <PayeesLookup
            resource={resource}
            isOpenModal={modalPayeeIsOpen}
            closeModal={this.closeModal}
            history={this.props.history}
            location={this.props.location}
            props={this.props['props']}
            onModalSave={this.onPayeeModalSave}
            excluding={{ entityId: payeesList }}
          />
        </div>
      </div>
    );
  }

}

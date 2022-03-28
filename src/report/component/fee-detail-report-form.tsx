import * as React from 'react';
import Chips from 'react-chips';
import Modal from 'react-modal';
import {dateToDefaultString, HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {DefaultSuggestionService, PreviousSuggestion} from 'suggestion-service';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, handleError, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {CtrlStatus} from '../enum/CtrlStatus';
import {FeeDetailReport} from '../model/FeeDetailReport';
import {Payer} from '../model/Payer';
import {FeeDetailReportSM} from '../search-model/FeeDetailReportSM';
import {PayerSM} from '../search-model/PayerSM';
import {FeeDetailHistoryForm} from './fee-detail-history-form';
import {PayersLookup} from './payers-lookup';

export const ITEMS_PER_PAGE = 10;
export const MAX_LOOK_UP = 5;

export class FeeDetailReportForm extends SearchComponent<FeeDetailReport, FeeDetailReportSM, HistoryProps, SearchState<FeeDetailReport>> {
  constructor(props) {
    super(props, applicationContext.feeDetailReportService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.state = {
      feeStatusList: [],
      feeDebitBankAccount: '',
      feeStatus: '',
      payers: [],
      payersList: [],
      transactionDate: new Date(),
      feeDueDate: new Date(),
      showData: {},
      chips: [],
      payerSuggestions: [],
      currentPagePayerModal: 1,
      payersTotal: 0,
      preSuggestions: {
        previousKeyWord: '',
        result: [],
      } as PreviousSuggestion<Payer>,
    };
  }
  private readonly masterDataService = applicationContext.masterDataService;
  private readonly apprPayerService = applicationContext.apprPayerService;
  private readonly chipSuggestionsService = new DefaultSuggestionService<Payer>(this.apprPayerService, MAX_LOOK_UP, 'entityName', 'entityId');

  load(s: FeeDetailReportSM, auto: boolean) {
    Promise.all([
      this.masterDataService.getDefaultAcounts(),
      this.masterDataService.getFeeStatus(),
      this.apprPayerService.all(),
    ]).then(values => {
      const [debitAccountList, feeStatusList, payers] = values;
      this.setState({ debitAccountList, feeStatusList, payers }, () => {
        const promise = new Promise((resolve) => {
          super.load(s, auto);
        });
        promise.then(() => {
          const chips = this.state.payers.filter((payer) =>
            this.state.payersList.includes(payer.entityId));
          this.setState({ chips });
        });
      });
    }).catch(handleError);
    /*
    zip(
      this.masterDataService.getDefaultAcounts(),
      this.masterDataService.getFeeStatus(),
      this.apprPayerService.all(),
    ).subscribe(([debitAccountList, feeStatusList, payers]) => {
      this.setState({ debitAccountList, feeStatusList, payers }, () => {
        const promise = new Promise((resolve) => {
          this.loadData();
          resolve('Success!');
        });
        promise.then(() => {
          const chips = this.state.payers.filter((payer) =>
            this.state.payersList.includes(payer.entityId));
          this.setState({ chips });
        });
      });
    });
    */
  }
  showPopup = (e, showData) => {
    e.preventDefault();
    this.setState({ modalIsOpen: true, showData });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalPayerIsOpen: false });
  }

  getSearchModel(): FeeDetailReportSM {
    const model = super.getSearchModel();
    model.payersList = this.state.payersList;
    return model;
  }

  onChangeChips = chips => {
    let { payersList } = this.state;
    const { payers } = this.state;

    payersList = [];
    chips.map((value) => {
      const x = payers.find((v) => v.entityId === value.entityId);
      payersList.push(x.entityId);
    });
    this.setState({ chips, payersList });
  }


  async fetchSuggestions(keyWords) {
    const { payersList, preSuggestions } = this.state;
    const result = await this.chipSuggestionsService.getSuggestion(keyWords, preSuggestions, payersList);
    this.setState({ preSuggestions: result.previousSuggestion });
    return Promise.resolve(result.response);
  }
  openPayerModal = () => {
    this.setState({ modalPayerIsOpen: true });
  }
  onRemoveChips = (id) => {
    let { payersList, chips } = this.state;
    payersList = payersList.filter(payerId => payerId !== id);
    chips = chips.filter(chip => chip.entityId !== id);
    this.setState({ payersList, chips });
  }

  onModalSave = (payers) => {
    let { chips, payersList } = this.state;
    chips = chips.concat(payers);
    payersList = payersList.concat(payers.map(payer => payer.entityId));
    this.setState({ chips, payersList, modalPayerIsOpen: false });
  }

  render() {
    const resource = this.resource;
    const { feeStatusList, feeDebitBankAccount, payersList } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.fee_detail_report_tile_summary}</h2>
        </header>
        <div>
          <form id='feeDetailReportForm' name='feeDetailReportForm' noValidate={true} ref={this.ref}>
            <section className='row search-group'>
              <label className='col s6 m6 l3'>
                {resource.fee_detail_report_list_transaction_date}
                <input type='date'
                  id='transactionDate' name='transactionDate'
                  value={dateToDefaultString(this.state.transactionDate)}
                  onChange={this.updateState} />
              </label>
              <label className='col s6 m6 l3'>
                {resource.fee_detail_report_fee_effective_day}
                <input type='date'
                  id='feeDueDate' name='feeDueDate'
                  value={dateToDefaultString(this.state.feeDueDate)}
                  onChange={this.updateState} />
              </label>
              <label className='col s6 m6 l3'>
                {resource.fee_detail_report_fee_status}
                <select id='feeStatus' name='feeStatus'
                  value={this.state.feeStatus}
                  onChange={this.updateState}
                >
                  )
                {feeStatusList.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>)
                  )}
                </select>
              </label>
              <label className='col s6 m6 l3'>
                {resource.fee_detail_report_fee_debit_account}
                <input
                  type='text'
                  id='feeDebitBankAccount'
                  name='feeDebitBankAccount'
                  value={feeDebitBankAccount}
                  onChange={this.updateState}
                  maxLength={12}
                  placeholder={resource.fee_detail_report_fee_debit_account} />
              </label>
              <label className='col s12 chip-container'>
                {resource.payer_name}
                <Chips
                  value={this.state.chips}
                  onChange={this.onChangeChips}
                  fetchSuggestions={this.fetchSuggestions}
                  shouldRenderSuggestions={value => value.length >= 1}
                  renderChip={(item) => (
                    <div>
                      <div>{item.entityName} <span onClick={() => this.onRemoveChips(item.entityId)}>&times; &nbsp;</span></div>
                    </div>
                  )}
                  fromSuggestionsOnly={false}
                  renderSuggestion={(item) => (
                    <div
                      key={item.entityName}>
                      {item.entityName}
                    </div>
                  )}
                  getSuggestionValue={suggestion => suggestion.entityName}
                />
                <button type='button' className='btn-lookup' onClick={this.openPayerModal} />
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
                  <tr className='w'>
                    <th>{resource.sequence}</th>
                    <th data-field='payerName'><button type='button' id='sortPayerName' onClick={this.sort}>{resource.payer_name}</button></th>
                    <th data-field='transactionDate'><button type='button' id='sortTransactionDate' onClick={this.sort}>{resource.fee_detail_report_list_transaction_date}</button></th>
                    <th data-field='transactionNo'><button type='button' id='sortTransactionNo' onClick={this.sort}>{resource.fee_detail_report_list_transaction_no}</button></th>
                    <th data-field='transactionStatus'><button type='button' id='sortTransactionStatus' onClick={this.sort}>{resource.fee_detail_report_list_transaction_status}</button></th>
                    <th data-field='feeAmount'><button type='button' id='sortFeeAmount' onClick={this.sort}>{resource.fee_detail_report_list_fee_amount}</button></th>
                    <th data-field='feeTransactionNo'><button type='button' id='sortFeeTransactionNo' onClick={this.sort}>{resource.fee_detail_report_list_fee_transaction_no}</button></th>
                    <th data-field='feeEffectiveDate'><button type='button' id='sortFeeEffectiveDate' onClick={this.sort}>{resource.fee_detail_report_fee_effective_day}</button></th>
                    <th data-field='feePositingType'><button type='button' id='sortFeePositingType' onClick={this.sort}>{resource.fee_detail_report_list_fee_positing_type}</button></th>
                    <th data-field='feeDebitAccount'><button type='button' id='sortFeeDebitAccount' onClick={this.sort}>{resource.fee_detail_report_list_debit_account}</button></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((feeDetailReport, i) => {
                    return (
                      <tr key={i} onClick={(e) => this.showPopup(e, feeDetailReport)}>
                        <td className='text-right'>{feeDetailReport.sequenceNo}</td>
                        <td>{feeDetailReport.payerName}</td>
                        <td>{feeDetailReport.paymentDate}</td>
                        <td>{feeDetailReport.paymentId}</td>
                        <td>{feeDetailReport.paymentStatus}</td>
                        <td>{feeDetailReport.feeAmount}</td>
                        <td>{feeDetailReport.feeTransactionNo}</td>
                        <td>{feeDetailReport.feeDueDate}</td>
                        <td>{feeDetailReport.postingType}</td>
                        <td>{feeDetailReport.feeDebitBankAccount}</td>
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
            // portalClassName='modal-portal'
            className='modal-portal-content small-width'
            bodyOpenClassName='modal-portal-open'
            overlayClassName='modal-portal-backdrop'
          >
            <FeeDetailHistoryForm history={this.props.history}
              resource={resource}
              close={this.closeModal}
              data={this.state.showData}
              location={this.props.location} />
          </Modal>
          <PayersLookup
            resource={resource}
            isOpenModal={this.state.modalPayerIsOpen}
            closeModal={this.closeModal}
            history={this.props.history}
            location={this.props.location}
            props={this.props['props']}
            onModalSave={this.onModalSave}
            excluding={{ entityId: payersList }}
          />
        </div>
      </div>
    );
  }

  getPayerSM(entityName, pageIndex, pageSize): PayerSM {
    // @ts-ignore
    const obj: PayerSM = {};
    obj.entityName = entityName;
    obj.entityType = 'R';
    obj.page = pageIndex;
    obj.limit = pageSize;
    obj.ctrlStatus = [CtrlStatus.Approved];
    return obj;
  }
}

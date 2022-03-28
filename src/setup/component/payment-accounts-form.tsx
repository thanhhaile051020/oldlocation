import * as React from 'react';
import {buildFromUrl, HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, setSearchPermission, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {AccType} from '../enum/AccType';
import {PaymentAccount} from '../model/PaymentAccount';
import {AccSearchModel} from '../search-model/AccSearchModel';

export class PaymentAccountsForm extends SearchComponent<PaymentAccount, AccSearchModel, HistoryProps, SearchState<PaymentAccount>> {
  constructor(props) {
    super(props, applicationContext.paymentAccountService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      keyword: '',
      results: [],
      accStatus: '',
      ctrlStatus: [],
      ctrlStatusList: [],
      entityName: '',
      accNo: ''
    };
  }
  private readonly masterDataService = applicationContext.masterDataService;

  componentDidMount() {
    this.form = initForm(this.ref.current, initMaterial);
    const s = this.mergeSearchModel(buildFromUrl(), ['ctrlStatus']);
    this.load(s, storage.autoSearch);
  }
  load(s: AccSearchModel, auto: boolean) {
    this.masterDataService.getCtrlStatus().then(ctrlStatusList => {
      this.setState({ ctrlStatusList }, () => super.load(s, auto));
    }).catch(this.handleError);
  }

  getSearchModel(): AccSearchModel {
    const model = super.getSearchModel();
    // model.entityType = EntityType.Payee;
    model.accType = AccType.Payable;
    return model;
  }

  edit = (e: any, payerId: string, bankId: string, accNo: string, accType: string) => {
    e.preventDefault();
    this.props.history.push(`odd-account/edit/${bankId}/${payerId}/${accNo}/${accType}`);
  }

  approve = (e: any, payerId: string, bankId: string, accNo: string, accType: string) => {
    e.preventDefault();
    this.props.history.push(`odd-account/approve/${bankId}/${payerId}/${accNo}/${accType}`);
  }


  render() {
    const resource = this.resource;
    const { ctrlStatusList, ctrlStatus, entityName, accNo } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.payment_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='payeesForm' name='payeesForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6 l3'>
                {resource.payer}
                <input
                  type='text'
                  id='entityName'
                  name='entityName'
                  value={entityName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.payer} />
              </label>
              <label className='col s12 m6 l3'>
                {resource.account_number}
                <input
                  type='text'
                  id='accNo'
                  name='accNo'
                  value={accNo}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.account_number} />
              </label>
              <label className='col s12 m12 l6'>
                {resource.ctrl_status}
                <section className='checkbox-group'>
                  {ctrlStatusList.map((item, index) => (
                    <label key={index}>
                      <input
                        type='checkbox'
                        id={item.value}
                        name='ctrlStatus'
                        key={index}
                        value={item.value}
                        checked={ctrlStatus.includes(item.value)}
                        onChange={this.updateState} />
                      {item.text}
                    </label>
                  )
                  )}
                </section>
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
                    <th data-field='ccyCode'><button type='button' id='sortCcyCode' onClick={this.sort}>{resource.account_currency}</button></th>
                    <th data-field='accNo'><button type='button' id='sortAccNo' onClick={this.sort}>{resource.account_number}</button></th>
                    <th data-field='accName'><button type='button' id='sortAccName' onClick={this.sort}>{resource.account_name}</button></th>
                    <th data-field='ctrlStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='nightMode'><button type='button' id='sortNightMode' onClick={this.sort}>{resource.enable_for_night_mode}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((payee, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{payee.sequenceNo}</td>
                        <td>{payee.ccyCode}</td>
                        <td>{payee.accNo}</td>
                        <td>{payee.accName}</td>
                        <td>{payee.ctrlStatusName}</td>
                        <td>{payee.nightMode}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'}
                              onClick={(e) => this.edit(e, payee.entityId, payee.bankId, payee.accNo, payee.accType)} />}
                          {this.approvable && payee.ctrlStatus === 'P' &&
                            <button type='button' id={'btnApprove' + i} className='btn-approve'
                              onClick={(e) => this.approve(e, payee.entityId, payee.bankId, payee.accNo, payee.accType)} />}
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

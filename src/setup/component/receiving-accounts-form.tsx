import * as React from 'react';
import {buildFromUrl, HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, setSearchPermission, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {AccType} from '../enum/AccType';
import {EntityAccount} from '../model/EntityAccount';
import {AccSearchModel} from '../search-model/AccSearchModel';

export class ReceivingAccountsForm extends SearchComponent<EntityAccount, AccSearchModel, HistoryProps, SearchState<EntityAccount>> {
  constructor(props) {
    super(props, applicationContext.receivingAccountService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      keyword: '',
      results: [],
      entityName: '',
      accType: AccType.Receivable,
      ctrlStatus: [],
      ctrlStatusList: []
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
    model.accType = AccType.Receivable;
    return model;
  }

  edit = (e: any, bankId: string, entityId: string, accNo: string, accType: string) => {
    e.preventDefault();
    this.props.history.push(`receiving-account/edit/${bankId}/${entityId}/${accNo}/${accType}`);
  }

  approve = (e: any, bankId: string, entityId: string, accNo: string, accType: string) => {
    e.preventDefault();
    this.props.history.push(`receiving-account/approve/${bankId}/${entityId}/${accNo}/${accType}`);
  }

  render() {
    const resource = this.resource;
    const { ctrlStatusList, ctrlStatus, entityName } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.receiving_account_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='receivingAccountsForm' name='receivingAccountsForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6'>
                {resource.payee}
                <input type='text'
                  id='entityName'
                  name='entityName'
                  value={entityName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.payee} />
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
                    <th data-field='entityId'>{resource.payee_name}</th>
                    <th data-field='bankId'>{resource.bank_name}</th>
                    <th data-field='accNo'><button type='button' id='accNo' onClick={this.sort}>{resource.account_number}</button></th>
                    <th data-field='accName'><button type='button' id='accName' onClick={this.sort}>{resource.account_name}</button></th>
                    <th data-field='ctrlStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((receivingAccount, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{receivingAccount.sequenceNo}</td>
                        <td>{(receivingAccount.entityName !== undefined && receivingAccount.entityName !== null) ? receivingAccount.entityName : ''}</td>
                        <td>{(receivingAccount.bankName !== undefined && receivingAccount.bankName !== null) ? receivingAccount.bankName : ''}</td>
                        <td>{receivingAccount.accNo}</td>
                        <td>{receivingAccount.accName}</td>
                        <td>{receivingAccount.ctrlStatusName}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'}
                              onClick={(e) => this.edit(e, receivingAccount.bankId, receivingAccount.entityId, receivingAccount.accNo, receivingAccount.accType)} />}
                          {this.approvable && receivingAccount.ctrlStatus === 'P' &&
                            <button type='button' id={'btnApprove' + i} className='btn-approve' onClick={(e) => this.approve(e, receivingAccount.bankId, receivingAccount.entityId, receivingAccount.accNo, receivingAccount.accType)} />}
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

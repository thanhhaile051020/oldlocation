import * as React from 'react';
import {buildFromUrl, HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, setSearchPermission, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {TransactionFeeSetup} from '../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../search-model/TransactionFeeSetupSM';

export class TransactionFeesForm extends SearchComponent<TransactionFeeSetup, TransactionFeeSetupSM, HistoryProps, SearchState<TransactionFeeSetup>> {
  constructor(props) {
    super(props, applicationContext.transactionFeeSetupSearchService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      esSysName: '',
      entityName: '',
      keyword: '',
      results: [],
      ctrlStatus: [],
      activationStatusList: [],
      ctrlStatusList: [],
    };
  }

  private readonly masterDataService = applicationContext.masterDataService;

  componentDidMount() {
    this.form = initForm(this.ref.current, initMaterial);
    const s = this.mergeSearchModel(buildFromUrl(), ['ctrlStatus']);
    this.load(s, storage.autoSearch);
  }

  async load(s: TransactionFeeSetupSM, auto: boolean) {
    Promise.all([
      this.masterDataService.getCtrlStatus(),
      this.masterDataService.getStatus(),
    ]).then(values => {
      const [ctrlStatusList, activationStatusList] = values;
      this.setState({ ctrlStatusList, activationStatusList }, () => super.load(s, auto));
    }).catch(this.handleError);
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('transaction-fee/edit/' + id);
  }

  approve = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('transaction-fee/approve/' + id);
  }

  render() {
    const resource = this.resource;
    const { ctrlStatusList, ctrlStatus } = this.state;

    return (
      <div className='view-container'>
        <header>
          <h2>{resource.transaction_fee_setup_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='transactionFeesForm' name='transactionFeesForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6 l3'>
                {resource.externalsys_name}
                <input type='text'
                  id='esSysName' name='esSysName'
                  value={this.state.esSysName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.esSysName} />
              </label>
              <label className='col s12 m6 l3'>
                {resource.payee_name}
                <input type='text'
                  id='entityName' name='entityName'
                  value={this.state.entityName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.entityName} />
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
                    <th data-field='esSysName'><button type='button' id='sortEsSysName' onClick={this.sort}>{resource.externalsys_name}</button></th>
                    <th data-field='entityName'><button type='button' id='sortEntityName' onClick={this.sort}>{resource.payee_name}</button></th>
                    <th data-field='ctrlStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='actedBy'><button type='button' id='sortActedBy' onClick={this.sort}>{resource.acted_by}</button></th>
                    <th data-field='actionDate'><button type='button' id='sortActionDate' onClick={this.sort}>{resource.action_date}</button></th>
                    <th data-field='actionStatus'><button type='button' id='sortActionStatus' onClick={this.sort}>{resource.action_status}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{obj.sequenceNo}</td>
                        <td>{obj.esSysName}</td>
                        <td>{obj.entityName}</td>
                        <td>{obj.ctrlStatusName}</td>
                        <td>{obj.actedBy}</td>
                        <td>{obj.actionDate}</td>
                        <td>{obj.actionStatus}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, obj.transFeeId)} />}
                          {this.approvable && obj.ctrlStatus === 'P' &&
                            <button type='button' id={'btnApprove' + i} className='btn-approve' onClick={(e) => this.approve(e, obj.transFeeId)} />}
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

import * as React from 'react';
import {buildFromUrl, HistoryProps, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {connect} from 'react-redux';
import {ReduxSearchComponent, SearchDispatchProps} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer} from 'redux-plus';
import {ListGlobalStateSelector} from 'reselect-plus';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, setSearchPermission, storage} from 'uione';
import {applicationContext} from '../../config/ApplicationContext';
import {TransactionFeeSetup} from '../../model/TransactionFeeSetup';
import {TransactionFeeSetupSM} from '../../search-model/TransactionFeeSetupSM';
import {getTransactionFeeList} from './transactionFeeAction';

export const TRANSACTION_FEES_FORM = 'transactionFeesForm';

type TransactionsFeesPropsType = SearchState<TransactionFeeSetup> & SearchDispatchProps<TransactionFeeSetup, TransactionFeeSetupSM> & HistoryProps;

class TransactionFeesComponent extends ReduxSearchComponent<TransactionFeeSetup, TransactionFeeSetupSM, TransactionsFeesPropsType, SearchState<TransactionFeeSetup>> {
  constructor(props) {
    super(props, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
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
    const s = this.mergeSearchModel(buildFromUrl(), ['ctrlStatus', 'actionStatus']);
    this.load(s, storage.autoSearch);
  }
  load(s: TransactionFeeSetupSM, auto: boolean) {
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
    const results = this.props.results || this.state.results;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.transaction_fee_setup_list}</h2>
          {this.addable && <button className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id={TRANSACTION_FEES_FORM} name={TRANSACTION_FEES_FORM} noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6'>
                {resource.externalsys_name}
                <input type='text'
                  id='esSysName' name='esSysName'
                  value={this.state.esSysName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.esSysName} />
              </label>
              <label className='col s12 m6'>
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
                    <label>
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
                    <th data-field='esId'>{resource.externalsys_name}</th>
                    <th data-field='payeeId'>{resource.payee_name}</th>
                    <th data-field='ctrlStatus'><button id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='actedBy'><button id='sortActedBy' onClick={this.sort}>{resource.acted_by}</button></th>
                    <th data-field='actionDate'><button id='sortActionDate' onClick={this.sort}>{resource.action_date}</button></th>
                    <th data-field='actionStatus'><button id='sortActionStatus' onClick={this.sort}>{resource.action_status}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((obj, i) => {
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
                            <button type='button' className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, obj.transFeeId)} />}
                          {this.approvable && obj.ctrlStatus === 'P' &&
                            <button type='button' className='btn-approve' onClick={(e) => this.approve(e, obj.transFeeId)} />}
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

export const transactionFeesSelector = new ListGlobalStateSelector(TRANSACTION_FEES_FORM);

function mapStateToProps(state) {
  return {
    results: transactionFeesSelector.selectListData(state)
  };
}

function mapDispatchToProps(dispatch): SearchDispatchProps<TransactionFeeSetup, TransactionFeeSetupSM> {
  return {
    search: (data) => dispatch(getTransactionFeeList(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const TransactionFeesForm = compose(
  withStore,
  withConnect
)(TransactionFeesComponent);

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
import {Bank} from '../../model/Bank';
import {BankSM} from '../../search-model/BankSM';
import {getBankList} from './bankActions';

export const BANKS_FORM = 'banksForm';

type BanksPropsType = SearchState<Bank> & SearchDispatchProps<Bank, BankSM> & HistoryProps;

class BanksComponent extends ReduxSearchComponent<Bank, BankSM, BanksPropsType, SearchState<Bank>> {
  constructor(props) {
    super(props, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      keyword: '',
      results: [],
      bankName: '',
      bankShortName: '',
    };
    this.initPageSize = 4;
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('bank/edit/' + id);
  }

  approve = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('bank/approve/' + id);
  }

  render() {
    const resource = this.resource;
    const results = this.props.results || this.state.results;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.bank_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add}/>}
        </header>
        <div>
          <form id={BANKS_FORM} name={BANKS_FORM} noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6'>
                {resource.bank_name}
                <input type='text'
                  id='bankName' name='bankName'
                  value={this.state.bankName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.bank_name}/>
              </label>
              <label className='col s12 m6'>
                {resource.bank_short_name}
                <input type='text'
                  id='bankShortName' name='bankShortName'
                  value={this.state.bankShortName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.bank_short_name}/>
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
                    <th data-field='bankName'><button type='button' id='bankName' onClick={this.sort}>{resource.bank_name}</button></th>
                    <th data-field='bankShortName'><button type='button' id='bankShortName' onClick={this.sort}>{resource.bank_short_name}</button></th>
                    <th data-field='branchId'><button type='button' id='branchId' onClick={this.sort}>{resource.bank_branch_id}</button></th>
                    <th data-field='ctrlStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='hostBankFlag'><button type='button' id='sortHostBankFlag' onClick={this.sort}>{resource.bank_host_bank}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((bank, i) => {
                    console.log('i', i);
                    return (
                      <tr key={i}>
                        <td className='text-right'>{bank.sequenceNo}</td>
                        <td>{bank.bankName}</td>
                        <td>{bank.bankShortName}</td>
                        <td>{bank.branchId}</td>
                        <td>{bank.ctrlStatusName}</td>
                        <td>{bank.hostBankFlag}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                          <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, bank.bankId)}/>}
                          {this.approvable && bank.ctrlStatus === 'P' &&
                          <button type='button' id={'btnApprove' + i} className='btn-approve' onClick={(e) => this.approve(e, bank.bankId)}/>}
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

export const banksSelector = new ListGlobalStateSelector(BANKS_FORM);

function mapStateToProps(state) {
  return {
    results: banksSelector.selectListData(state)
  };
}

function mapDispatchToProps(dispatch): SearchDispatchProps<Bank, BankSM> {
  return {
    search: (data) => dispatch(getBankList(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const BanksForm = compose(
  withStore,
  withConnect
)(BanksComponent);

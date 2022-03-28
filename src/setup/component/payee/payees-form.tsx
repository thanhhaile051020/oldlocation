import * as React from 'react';
import {buildFromUrl, HistoryProps, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {connect} from 'react-redux';
import {ReduxSearchComponent, SearchDispatchProps} from 'react-redux-one';
import {withReducer} from 'react-redux-one';
import {compose} from 'redux';
import {GLOBAL_STATE, globalStateReducer} from 'redux-plus';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, setSearchPermission, storage} from 'uione';
import {applicationContext} from '../../config/ApplicationContext';
import {EntityType} from '../../enum/EntityType';
import {Payee} from '../../model/Payee';
import {PayeeSM} from '../../search-model/PayeeSM';
import {PAYEES_FORM} from './Constants';
import {getPayeeList} from './payeeActions';
import {payeeSelector} from './PayeeSelector';

type PayeesPropsType = SearchState<Payee> & SearchDispatchProps<Payee, PayeeSM> & HistoryProps;

class PayeesComponent extends ReduxSearchComponent<Payee, PayeeSM, PayeesPropsType, SearchState<Payee>> {
  constructor(props) {
    super(props, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      keyword: '',
      ctrlStatus: [],
      results: [],
      ctrlStatusList: [],
      entityName: ''
    };
  }
  private readonly masterDataService = applicationContext.masterDataService;

  componentDidMount() {
    initForm(this.ref.current, initMaterial);
    const s = this.mergeSearchModel(buildFromUrl(), ['ctrlStatus']);
    this.load(s, storage.autoSearch);
  }
  load(s: PayeeSM, auto: boolean) {
    this.masterDataService.getCtrlStatus().then(ctrlStatusList => {
      this.setState({ ctrlStatusList }, () => super.load(s, auto));
    }).catch(this.handleError);
  }

  getSearchModel(): PayeeSM {
    const model = super.getSearchModel();
    model.entityType = EntityType.Payee;
    return model;
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('payee/edit/' + id);
  }

  approve = (e: any, entityId: string) => {
    e.preventDefault();
    this.props.history.push('payee/approve/' + entityId);
  }

  render() {
    const resource = this.resource;
    const { ctrlStatusList, ctrlStatus, entityName } = this.state;
    const results = this.props.results || this.state.results;
    console.log(this.props.results);
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.payees_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id={PAYEES_FORM} name={PAYEES_FORM} noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m5 l6'>
                {resource.company_name}
                <input
                  type='text'
                  id='entityName'
                  name='entityName'
                  value={entityName}
                  onChange={this.updateState}
                  maxLength={255}
                  placeholder={resource.company_name} />
              </label>
              <label className='col s12 m7 l6'>
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
                        onChange={this.updateState}
                      />
                      {item.text}
                    </label>)
                  )}
                </section>
              </label>
            </section>
            <section className='btn-group'>
              <label>
                {resource.page_size}
                <PageSizeSelect
                  id='limit'
                  name='limit'
                  pageSize={this.pageSize}
                  pageSizes={this.pageSizes}
                  onPageSizeChanged={this.pageSizeChanged}
                />
              </label>
              <button type='submit' className='btn-search'
                onClick={this.searchOnClick}>{resource.search}</button>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th>{resource.sequence}</th>
                    <th data-field='entityName'>
                      <button type='button' id='sortCompanyName'
                        onClick={this.sort}>{resource.company_name}</button>
                    </th>
                    <th data-field='shortName'>
                      <button type='button' id='sortCompanyShortName'
                        onClick={this.sort}>{resource.company_short_name}</button>
                    </th>
                    <th data-field='ctrlStatus'>
                      <button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button>
                    </th>
                    <th data-field='actedBy'>
                      <button type='button' id='sortActedBy' onClick={this.sort}>{resource.acted_by}</button>
                    </th>
                    <th data-field='actionDate'>
                      <button type='button' id='sortActionDate' onClick={this.sort}>{resource.action_date}</button>
                    </th>
                    <th data-field='actionStatus'>
                      <button type='button' id='sortActionStatus'
                        onClick={this.sort}>{resource.action_status}</button>
                    </th>
                    <th>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((payee, i) => {
                    return (
                      <tr key={i}>
                        <td>{payee.sequenceNo}</td>
                        <td>{payee.entityName}</td>
                        <td>{payee.shortName}</td>
                        <td>{payee.ctrlStatusName}</td>
                        <td>{payee.actedBy}</td>
                        <td>{payee.actionDate}</td>
                        <td>{payee.actionStatus}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, payee.entityId)} />}
                          {this.approvable && payee.ctrlStatus === 'P' &&
                            <button type='button' id={'btnApprove' + i} className='btn-approve' onClick={(e) => this.approve(e, payee.entityId)} />}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              className='col s12 m6'
              totalRecords={this.itemTotal}
              itemsPerPage={this.pageSize}
              maxSize={this.pageMaxSize}
              currentPage={this.pageIndex}
              onPageChanged={this.pageChanged}
              initPageSize={this.initPageSize}
            />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: payeeSelector.selectListData(state)
  };
}

function mapDispatchToProps(dispatch): SearchDispatchProps<Payee, PayeeSM> {
  return {
    search: (data) => dispatch(getPayeeList(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const PayeesForm = compose(
  withStore,
  withConnect
)(PayeesComponent);

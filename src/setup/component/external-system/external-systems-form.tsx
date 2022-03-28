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
import {ExternalSys} from '../../model/ExternalSys';
import {ExternalSysSM} from '../../search-model/ExternalSysSM';
import {getExternalSystemList} from './ExternalSystemAction';

export const EXTERNALSYSTEMS_FORM = 'externalSystemsForm';

type ExternalSystemsPropsType = SearchState<ExternalSys> & SearchDispatchProps<ExternalSys, ExternalSysSM> & HistoryProps;

class ExternalSystemsComponent extends ReduxSearchComponent<ExternalSys, ExternalSysSM, ExternalSystemsPropsType, SearchState<ExternalSys>> {
  constructor(props) {
    super(props, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      ctrlStatusList: [],
      keyword: '',
      results: [],
      ctrlStatus: [],
      esSysName: ''
    };
  }
  private readonly masterDataService = applicationContext.masterDataService;

  componentDidMount() {
    this.form = initForm(this.ref.current, initMaterial);
    const s = this.mergeSearchModel(buildFromUrl(), ['ctrlStatus']);
    this.load(s, storage.autoSearch);
  }
  load(s: ExternalSysSM, auto: boolean) {
    this.masterDataService.getCtrlStatus().then(ctrlStatusList => {
      this.setState({ ctrlStatusList }, () => super.load(s, auto));
    }).catch(this.handleError);
  }

  edit = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('external-system/edit/' + id);
  }

  approve = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push('external-system/approve/' + id);
  }

  render() {
    const resource = this.resource;
    const { ctrlStatusList, ctrlStatus, esSysName } = this.state;
    const results = this.props.results || this.state.results;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.external_system}</h2>
          { this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add}/> }
        </header>
        <div>
          <form id={EXTERNALSYSTEMS_FORM} name={EXTERNALSYSTEMS_FORM} noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m5 l6'>
                {resource.externalsys_name}
                <input type='text'
                  id='esSysName' name='esSysName'
                  value={esSysName}
                  onChange={this.updateState}
                  maxLength={500}
                  placeholder={resource.externalsys_name}/>
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
                    <th data-field='esSysName'><button type='button' id='sortEsSysName' onClick={this.sort}>{resource.externalsys_name}</button></th>
                    <th data-field='esSysShortName'><button type='button' id='esSysShortName' onClick={this.sort}>{resource.externalsys_short_name}</button></th>
                    <th data-field='ctrlStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='actedBy'><button type='button' id='sortActedBy' onClick={this.sort}>{resource.acted_by}</button></th>
                    <th data-field='actionDate'><button type='button' id='sortActionDate' onClick={this.sort}>{resource.action_date}</button></th>
                    <th data-field='actionStatus'><button type='button' id='sortActionStatus' onClick={this.sort}>{resource.action_status}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((externalsys, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{externalsys.sequenceNo}</td>
                        <td>{externalsys.esSysName}</td>
                        <td>{externalsys.esSysShortName}</td>
                        <td>{externalsys.ctrlStatusName}</td>
                        <td>{externalsys.actedBy}</td>
                        <td>{externalsys.actionDate}</td>
                        <td>{externalsys.actionStatus}</td>
                        <td>
                          { (this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, externalsys.esId)}/>  }
                          { this.approvable && externalsys.ctrlStatus === 'P' &&
                            <button type='button' id={'btnApprove' + i} className='btn-approve' onClick={(e) => this.approve(e, externalsys.esId)}/>}
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

export const externalSystemsSelector = new ListGlobalStateSelector(EXTERNALSYSTEMS_FORM);


function mapStateToProps(state) {
  return {
    results: externalSystemsSelector.selectListData(state)
  };
}

function mapDispatchToProps(dispatch): SearchDispatchProps<ExternalSys, ExternalSysSM> {
  return {
    search: (data) => dispatch(getExternalSystemList(data))
  };
}

const withStore = withReducer(globalStateReducer, GLOBAL_STATE);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const ExternalSystemsForm = compose(
  withStore,
  withConnect
)(ExternalSystemsComponent);

import * as React from 'react';
import {buildFromUrl, HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, setSearchPermission, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {EntityType} from '../enum/EntityType';
import {EntityRelationship} from '../model/EntityRelationship';
import {EntityRelationshipSM} from '../search-model/EntityRelationshipSM';

export class EntityRelationshipsForm extends SearchComponent<EntityRelationship, EntityRelationshipSM, HistoryProps, SearchState<EntityRelationship>> {
  constructor(props) {
    super(props, applicationContext.entityRelationshipService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    setSearchPermission(storage.getUser(), this.url, applicationContext.searchPermissionBuilder, this);
    this.state = {
      entityName: '',
      esSysName: '',
      keyword: '',
      ctrlStatusList: [],
      results: [],
      ctrlStatus: []
    };
  }
  private readonly masterDataService = applicationContext.masterDataService;

  componentDidMount() {
    this.form = initForm(this.ref.current, initMaterial);
    const s = this.mergeSearchModel(buildFromUrl(), ['ctrlStatus']);
    this.load(s, storage.autoSearch);
  }
  load(s: EntityRelationshipSM, auto: boolean) {
    this.masterDataService.getCtrlStatus().then(ctrlStatusList => {
      this.setState({ ctrlStatusList }, () => super.load(s, auto));
    }).catch(this.handleError);
  }

  getSearchModel(): EntityRelationshipSM {
    const model = super.getSearchModel();
    model.entityType = EntityType.Payee;
    return model;
  }

  approve = (e: any, esId: string, payeeId: string) => {
    e.preventDefault();
    this.props.history.push(`entity-relationship/approve/${esId}/${payeeId}`);
  }

  edit = (e: any, esId: string, payeeId: string) => {
    e.preventDefault();
    this.props.history.push(`entity-relationship/edit/${esId}/${payeeId}`);
  }

  render() {
    const resource = this.resource;
    const { ctrlStatusList, ctrlStatus, esSysName } = this.state;

    return (
      <div className='view-container'>
        <header>
          <h2>{resource.entity_relationship_list}</h2>
          {this.addable && <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />}
        </header>
        <div>
          <form id='payeesForm' name='payeesForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6 l3'>
                {resource.external_system}
                <input
                  type='text'
                  id='esSysName'
                  name='esSysName'
                  value={esSysName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.external_system} />
              </label>
              <label className='col s12 m6 l3'>
                {resource.entity_relationship_payee_company_sys}
                <input type='text'
                  id='entityName' name='entityName'
                  value={this.state.entityName}
                  onChange={this.updateState}
                  maxLength={240}
                  placeholder={resource.entity_relationship_payee_company_sys} />
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
                    <th data-field='esSysName'><button type='button' id='sortEssysName' onClick={this.sort}>{resource.externalsys_name}</button></th>
                    <th data-field='entityName'><button type='button' id='sortCompanyName' onClick={this.sort}>{resource.entity_relationship_payee_company_sys}</button></th>
                    <th data-field='ctrlStatus'><button type='button' id='sortCtrlStatus' onClick={this.sort}>{resource.ctrl_status}</button></th>
                    <th data-field='actedBy'><button type='button' id='sortActedBy' onClick={this.sort}>{resource.acted_by}</button></th>
                    <th data-field='actionDate'><button type='button' id='sortActionDate' onClick={this.sort}>{resource.action_date}</button></th>
                    <th data-field='actionStatus'><button type='button' id='sortActionStatus' onClick={this.sort}>{resource.action_status}</button></th>
                    <th className='action'>{resource.quick_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((entityRelationship, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-right'>{entityRelationship.sequenceNo}</td>
                        <td>{entityRelationship.esSysName}</td>
                        <td>{entityRelationship.entityName}</td>
                        <td>{entityRelationship.ctrlStatusName}</td>
                        <td>{entityRelationship.actedBy}</td>
                        <td>{entityRelationship.actionDate}</td>
                        <td>{entityRelationship.actionStatus}</td>
                        <td>
                          {(this.editable || this.viewable) &&
                            <button type='button' id={'btnView' + i} className={this.editable ? 'btn-edit' : 'btn-view'} onClick={(e) => this.edit(e, entityRelationship.esId, entityRelationship.payeeId)} />}
                          {this.approvable && entityRelationship.ctrlStatus === 'P' &&
                            <button type='button' id={'btnApprove' + i} className='btn-approve' onClick={(e) => this.approve(e, entityRelationship.esId, entityRelationship.payeeId)} />}
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

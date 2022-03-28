import * as React from 'react';
import {Diff} from 'react-diff-x';
import {buildId, DiffApprComponent, DiffState, HistoryProps} from 'react-onex';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {EntityRelationship} from '../model/EntityRelationship';

export class EntityRelationshipDiffForm extends DiffApprComponent<EntityRelationship, any, HistoryProps, DiffState<EntityRelationship>> {
  constructor(props) {
    super(props, applicationContext.entityRelationshipService, storage.resource(), getLocale, showToast, alertError, storage.loading());
    this.state = {
      origin: {},
      value: {},
      externals: [],
      payees: [],
    };
  }

  private readonly payeeService = applicationContext.payeeService;
  private readonly externalService = applicationContext.externalSysService;

  renderFields = [
    { resourceKey: 'external_system', name: 'esSysName' },
    { resourceKey: 'entity_relationship_payee_company_sys', name: 'entityPayeeName' },
    { resourceKey: 'payer', name: 'payerNameList' },
  ];

  formatFields(value) {
    const selectedPayee = this.getPayee(value.payeeId);
    const entityPayeeName = value && selectedPayee.entityName || '';

    const payerNameList = [];
    if (value.payers) {
      const payerList = value.payers;
      for (const payer of payerList) {
        payerNameList.push(payer.entityName);
      }
    }

    const selectedExternal = this.getExternal(value.esId);
    const esSysName = selectedExternal.esSysName;

    return { ...value, entityPayeeName, esSysName, payerNameList };
  }

  async load(id: any) {
    Promise.all([
      this.externalService.all(),
      this.payeeService.all()
    ]).then(values => {
      const [externals, payees] = values;
      this.setState(prevState => ({
        ...prevState,
        externals,
        payees
      }), () => super.load(id));
    }).then(this.handleError);
    /*
    zip(
      this.externalService.all(),
      this.payeeService.all()
    ).subscribe(([externals, payees]) => {
      this.setState(prevState => ({
        ...prevState,
        externals,
        payees
      }), this.loadData);
    }, this.handleError);
    */
  }

  detailForm(valueForm, resource, nameType) {
    const selectedExternal = this.getExternal(valueForm.esId);
    const selectedPayer = this.getPayee(valueForm.payeeId);
    return (
      <React.Fragment>
        <h4>{resource.externalsys_relationship_sub_subject} {nameType}</h4>
        <label className='col s12 m6'>
          {resource.external_system}
          <label>
            {selectedExternal.esSysName}
          </label>
        </label>
        <label className='col s12 m6'>
          {resource.entity_relationship_payee_company_sys}
          <label>
            {selectedPayer.entityName}
          </label>
        </label>
        <h4>{resource.payer}</h4>
        <label className='col s12 m6'>
          {valueForm.payers && valueForm.payers.map((item) => (
            <li>{item.entityName}</li>)
          )}
        </label>
      </React.Fragment>
    );
  }

  getExternal(esId: string): any {
    return this.state.externals.find(external => external.esId === esId) || {};
  }

  getPayee = (id: string) => {
    return this.state.payees.find(payee => payee.entityId === id) || {};
  }

  render() {
    const resource = this.resource;
    const { origin = {}, value = {}, disabled } = this.state;
    return (
      <div className='view-container'>
        <form id='detailEntityForm' name='detailEntityForm' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{resource.externalsys_relationship_subject}</h2>
          </header>
          <Diff origin={origin}
            value={value}
            resource={resource}
            renderFields={this.renderFields}
          />
          <footer>
            <button type='submit' id='btnApprove' name='btnApprove'
              onClick={this.approve} disabled={disabled}>
              {resource.approve}
            </button>
            <button type='button' id='btnReject' name='btnReject'
              onClick={this.reject} disabled={disabled}>
              {resource.reject}
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

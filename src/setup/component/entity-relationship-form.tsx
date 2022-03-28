import {ValueText} from 'onecore';
import * as React from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import {buildId, EditComponent, HistoryProps} from 'react-onex';
import {alertError, confirm} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, initForm, initMaterial, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {EntityRelationship} from '../model/EntityRelationship';
import {Payer} from '../model/Payer';

interface InternalState {
  entityRelationship: EntityRelationship;
  externalSystems: ValueText[];
  payees: ValueText[];
  payers: ValueText[];
  event: any;
  payersListed: Payer[];
  externalSysName: string;
  payeeName: string;
}

export class EntityRelationshipForm extends EditComponent<EntityRelationship, any, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.entityRelationshipService, storage.resource(), storage.ui(), showToast, alertError, confirm, getLocale, storage.loading());
    this.state = {
      entityRelationship: this.createModel(),
      externalSystems: [],
      payees: [],
      payers: [],
      event: {},
      payersListed: [],
      externalSysName: '',
      payeeName: ''
    };
  }
  private readonly payeeService = applicationContext.apprPayeeService;
  private readonly payerService = applicationContext.apprPayerService;
  private readonly externalSysService = applicationContext.apprExternalSysService;

  async load(id: any) {
    Promise.all([
      this.payeeService.all(),
      this.payerService.all(),
      this.externalSysService.all(),
    ]).then(values => {
      const [xpayees, xpayerList, xexternalSystems] = values;
      const externalSystems = this.getKeyValue(xexternalSystems, 'esId', 'esSysName');
      const payees = this.getKeyValue(xpayees, 'entityId', 'entityName');
      const payers = this.getKeyValue(xpayerList, 'entityId', 'entityName');
      payers.map((item) => {
        item = this.renameKeyObj(item, 'value', 'entityId');
        item = this.renameKeyObj(item, 'text', 'entityName');
      });
      const this_ = this;
      this.setState({
        payees,
        payers,
        externalSystems,
      }, () => {
        super.load(id).then(() => {
          const { entityRelationship } = this_.state;
          this_.setState({ payersListed: entityRelationship.payers });
        });
      });
    }, this.handleError);
    /*
    zip(
      this.payeeService.all(),
      this.payerService.all(),
      this.externalSysService.all(),
    ).subscribe(([payees, payerList, externalSystems]) => {
      externalSystems = this.getKeyValue(externalSystems, 'esId', 'esSysName');
      payees = this.getKeyValue(payees, 'entityId', 'entityName');
      const payers = this.getKeyValue(payerList, 'entityId', 'entityName');
      payers.map( (item) => {
        item = this.renameKeyObj(item, 'value', 'entityId' );
        item = this.renameKeyObj(item, 'text', 'entityName' );
      });
      this.setState({
        payees,
        payers,
        externalSystems,
      }, this.loadData);
    }, this.handleError);
    */
  }

  formatModel(obj) {
    const entityRelationship = obj;
    const payersListed = entityRelationship.payers;
    this.setState({ payersListed });
    this.getExternalSysName(entityRelationship);
    this.getPayeeShortName(entityRelationship);
    return entityRelationship;
  }

  handleDeselect = (deselectedOptions) => {
    const { payersListed } = this.state;
    const selectedOptions = payersListed.slice();
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1);
    });
    this.setState(prev => ({
      ...prev,
      payersListed: selectedOptions
    }));
  }

  handleSelect = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.value - b.value);
    this.setState(prev => ({
      ...prev,
      payersListed: selectedOptions
    }));
  }

  getModel(): EntityRelationship {
    const { entityRelationship } = this.state;
    entityRelationship.payers = this.state.payersListed;
    return entityRelationship;
  }

  getExternalSysName(entityRelationship?: EntityRelationship): any {
    const { externalSystems } = this.state;
    entityRelationship = entityRelationship === undefined ? this.state.entityRelationship : entityRelationship;
    for (const external of externalSystems) {
      if (external.value === entityRelationship.esId) {
        this.setState({ externalSysName: external.text });
      }
    }
  }

  getPayeeShortName(entityRelationship?: EntityRelationship): any {
    const { payees } = this.state;
    entityRelationship = entityRelationship === undefined ? this.state.entityRelationship : entityRelationship;
    for (const payee of payees) {
      if (payee.value === entityRelationship.payeeId) {
        this.setState({ payeeName: payee.text });
      }
    }
  }

  render() {
    const resource = this.resource;
    const { entityRelationship, externalSystems, payees, payers } = this.state;
    const payersListed = this.state.payersListed ? this.state.payersListed : [];
    return (
      <div className='view-container'>
        <form id='entityRelationshipForm' name='entityRelationshipForm' model-name='entityRelationship'
          ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
            <h2>{this.newMode ? resource.create : resource.edit} {resource.externalsys_relationship_subject}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.external_system}
              <select id='esId' name='esId' disabled={!this.newMode}
                value={entityRelationship.esId}
                onChange={(e) => {
                  this.updateState(e, this.getExternalSysName);
                }}
                required={true}
              >
                <option selected={true} value=''>{resource.all}</option>
                )
                                {externalSystems.map((item, index) => (
                  <option key={index} value={item.value}>{item.text}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.entity_relationship_payee_company_sys}
              <select id='payeeId' name='payeeId' disabled={!this.newMode}
                value={entityRelationship.payeeId}
                onChange={(e) => {
                  this.updateState(e, this.getPayeeShortName);
                }}
                required={true}
              >
                <option selected={true} value=''>{resource.all}</option>
                )
                                {payees.map((item: ValueText, index) => (
                  <option key={index} value={item.value}>{item.text}</option>)
                )}
              </select>
            </label>
            <h4>{resource.payer}</h4>
            <label className='col s12 m6'>
              {resource.payer_name}
              <FilteredMultiSelect
                className='item-select'
                buttonText='Selected'
                showFilter={true}
                classNames={{
                  filter: 'filter',
                  select: 'form-control',
                  button: 'btn',
                  buttonActive: 'btn-select',
                }}
                onChange={this.handleSelect}
                options={payers}
                selectedOptions={payersListed}
                textProp='entityName'
                valueProp='entityId'
              />
            </label>
            <label className='col s12 m6'>
              {resource.entity_relationship_payee_list}
              <FilteredMultiSelect
                className='item-select'
                showFilter={true}
                buttonText='Remove'
                classNames={{
                  filter: 'filter',
                  select: 'form-control',
                  button: 'btn',
                  buttonActive: 'btn-deselect'
                }}
                onChange={this.handleDeselect}
                options={payersListed}
                textProp='entityName'
                valueProp='entityId'
              />
            </label>
          </div>
          <footer>
            {this.editable &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
                {resource.save}
              </button>}
          </footer>
        </form>
      </div>
    );
  }

  getKeyValue(objs, key, value) {
    return objs.map(item => {
      return { value: item[key], text: item[value] };
    });
  }

  renameKeyObj(obj: object, oldKey: string, newKey: string): object {
    if (obj) {
      delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey];
    }
    return obj;
  }
}

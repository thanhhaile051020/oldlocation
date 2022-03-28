import * as React from 'react';
import Modal from 'react-modal';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {Payer} from '../model/Payer';
import {PayerSM} from '../search-model/PayerSM';

interface Props extends HistoryProps {
  resource?: any;
  isOpenModal?: any;
  closeModal?: any;
  props?: any;
  onModalSave?: any;
  excluding?: any;
}

export class PayersLookup extends SearchComponent<Payer, PayerSM, Props, SearchState<Payer>> {
  constructor(props) {
    super(props, applicationContext.apprPayerService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.state = {
      payersList: []
    };

  }
  createSearchModel(): PayerSM {
    const obj: any = {};
    obj.entityType = 'R';
    return obj;
  }

  onCheckPayer = (event) => {
    const id = event.currentTarget.getAttribute('data-id');
    let { payersList } = this.state;
    const { results } = this.state;
    if (payersList.find((payer) => payer.entityId === id)) {
      payersList = payersList.filter((payer) => payer.entityId !== id);
    } else {
      payersList.push(results.find(result => result.entityId === id));
    }
    this.setState({ payersList });
  }

  onChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSearch = (e) => {
    this.setState({ results: [] });
    this.searchOnClick(e);
  }

  onModalSave = () => {
    this.props.onModalSave(this.state.payersList);
    this.setState({ payersList: [] });
  }

  onModelClose = () => {
    this.props.onModalSave([]);
    this.setState({ payersList: [] });
  }
  afterOpenModal = () => {
    this.excluding = this.props.excluding;
    this.ignoreUrlParam = true;
    this.setState({ payersList: [] }, () => this.load(this.createSearchModel(), storage.autoSearch));
  }
  handleCheckAll = (e) => {
    const check = e.target.checked;
    const { results } = this.state;
    let { payersList } = this.state;
    if (check) {
      const addpayers = results.filter(result => payersList.every(payer => result.entityId !== payer.entityId));
      payersList = payersList.concat(addpayers);
    } else {
      payersList = payersList.filter(payer => results.every(result => result.entityId !== payer.entityId));
    }
    this.setState({ payersList });
  }
  render() {
    const { resource, isOpenModal, closeModal } = this.props;
    const { results, payersList } = this.state;
    return (
      <Modal
        isOpen={isOpenModal}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Modal'
        // portalClassName='modal-portal'
        className='modal-portal-content'
        bodyOpenClassName='modal-portal-open'
        overlayClassName='modal-portal-backdrop'
      >
        <div className='view-container'>
          <header>
            <h2>{resource.payers_list_title}</h2>
            <button type='button' className='btn-close' onClick={this.onModelClose} />
          </header>
          <div>
            <form id='payerForm' name='payerForm' noValidate={true} ref={this.ref}>
              <section className='row search-group'>
                <label className='col s12 m6 search-input'>
                  <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged} />
                  <input type='text'
                    id='entityName'
                    name='entityName'
                    onChange={this.onChangeText}
                    value={this.state.payer}
                    maxLength={40}
                    placeholder='Search for payer' />
                  <button type='submit' className='btn-search' onClick={this.onSearch} />
                </label>
                <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
              </section>
            </form>
            <form className='list-result'>
              <div className='table-responsive'>
                <table>
                  <thead>
                    <tr>
                      <th>{resource.sequence}</th>
                      <th data-field='entityId'><button type='button' id='sortEntityId' onClick={this.sort}>{resource.payer}</button></th>
                      <th data-field='entityName'><button type='button' id='sortEntityName' onClick={this.sort}>{resource.payer_name}</button></th>
                      <th>
                        <input
                          type='checkbox'
                          value='all'
                          checked={this.state && results &&
                            results.every(result => !!payersList.find(payer => payer.entityId === result.entityId))}
                          onChange={this.handleCheckAll} />
                        {resource.all}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state && results && results.map((item, index) => {
                      const check = payersList.some((v) => v.entityId === item.entityId);
                      return (
                        <tr key={index + 1} onClick={this.onCheckPayer} data-id={item.entityId}>
                          <td className='text-right' >{index + 1 + (this.pageIndex - 1) * 10}</td>
                          <td>{item.entityId}</td>
                          <td>{item.entityName}</td>
                          <td>
                            <input
                              type='checkbox'
                              key={index}
                              id={item.entityId}
                              checked={check}
                              value={item.entityName}
                            />
                          </td>
                        </tr>);
                    }
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <footer>
            <button type='button' onClick={this.onModalSave}>{resource.select}</button>
          </footer>
        </div>
      </Modal>
    );
  }
}

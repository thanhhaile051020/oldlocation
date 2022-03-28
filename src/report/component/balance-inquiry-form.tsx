import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import {alertError} from 'ui-alert';
import {showToast} from 'ui-toast';
import {getLocale, handleError, storage} from 'uione';
import {applicationContext} from '../config/ApplicationContext';
import {BalanceInquiry} from '../model/BalanceInquiry';
import {BalanceInquirySM} from '../search-model/BalanceInquirySM';

export class BalanceInquiryForm extends SearchComponent<BalanceInquiry, BalanceInquirySM, HistoryProps, SearchState<BalanceInquiry>> {
  constructor(props) {
    super(props, applicationContext.balanceInquiryService, storage.resource(), storage.ui(), showToast, alertError, getLocale, storage.loading());
    this.formatter = applicationContext.businessSearchModelFormatter;
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      entityId: '',
      accountNo: '',
      accountList: [],
      companies: [],
      results: [],
    };
  }
  // private readonly apprPayeeService = applicationContext.apprPayeeService;
  private readonly getEntProfileService = applicationContext.entProfileService;
  private readonly getApprReceivingAccountService = applicationContext.apprReceivingAccountService;
  private readonly getApprPaymentAccountService = applicationContext.apprPaymentAccountService;

  load(s: BalanceInquirySM, auto: boolean) {
    this.getEntProfileService.all().then(
      companies => this.setState({ companies }, () => super.load(s, auto))).catch(handleError);
  }

  async handleChange(e) {
    try {
      const entityId = e.target.value;
      const profile = this.state.companies.find(value => value.entityId === entityId);
      if (!profile ) {
        this.setState({ accountList: [] });
      } else if (profile.entityType === 'E') {
        const payee = await this.getApprReceivingAccountService.getByPayeeId(entityId);
        this.setState({ accountList: payee });
      } else if (profile.entityType === 'R') {
        const payer = await this.getApprPaymentAccountService.getByPayerId(entityId);
        this.setState({ accountList: payer });
      }
      this.setState({ entityId });
    } catch (err) {
      handleError(err);
    }
  }

  render() {
    const resource = this.resource;
    const { companies, accountList } = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.balance_enquiry_list}</h2>
        </header>
        <div>
          <form id='balanceInquiryForm' name='balanceInquiryForm' noValidate={true} ref={this.ref}>
            <section className='row search-group inline'>
              <label className='col s12 m6'>
                {resource.company_name}
                <select
                  id='entityId'
                  name='entityId'
                  value={this.state.entityId}
                  onChange={this.handleChange} >
                  <option value=''>{resource.all}</option>
                  {companies.map((item, index) => (
                    <option key={index} value={item.entityId}>{item.entityName}</option>)
                  )}
                </select>
              </label>
              <label className='col s12 m6'>
                {resource.account_number}
                <select id='accountNo' name='accountNo'
                  value={this.state.accountNo}
                  onChange={this.updateState}
                  required={true} >
                  <option value=''>{resource.all}</option>
                  {accountList.map((item, index) => (
                    <option key={index} value={item.accNo}>{item.accNo}</option>)
                  )}
                </select>
              </label>
            </section>
            <section className='btn-group'>
              <button type='submit' className='btn-search' onClick={this.searchOnClick}>{resource.search}</button>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th data-field='entityId'><button type='button' id='entityId' onClick={this.sort}>{resource.company_name}</button></th>
                    <th data-field='accountNo'><button type='button' id='accountNo' onClick={this.sort}>{resource.account_number}</button></th>
                    <th data-field='accountBalance'><button type='button' id='accountBalance' onClick={this.sort}>{resource.account_balance}</button></th>
                    <th data-field='accountType'><button type='button' id='accountType' onClick={this.sort}>{resource.account_type}</button></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state && this.state.results && this.state.results.map((account, i) => {
                    return (
                      <tr key={i}>
                        <td>{account.entityId}</td>
                        <td>{account.accountNo}</td>
                        <td>{account.accountBalance}</td>
                        <td>{account.accountType}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

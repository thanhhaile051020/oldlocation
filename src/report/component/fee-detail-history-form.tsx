import * as React from 'react';
import {HistoryProps} from 'react-onex';
import {FeeDetailReport} from '../model/FeeDetailReport';

interface Props extends HistoryProps {
  data: FeeDetailReport;
  resource: any;
  close: any;
}

export class FeeDetailHistoryForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  close = () => {
    this.props.close();
  }

  render() {
    const resource = this.props.resource;
    const feeDetailReport = this.props.data;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.fee_detail_report_tile}</h2>
          <button type='button' id='btnClose' name='btnClose' className='btn-close' onClick={this.close}/>
        </header>
        <div>
          <article>
            <p>{resource.payer_name}: <span>{feeDetailReport.payerName}</span></p>
            <p>{resource.fee_detail_report_list_transaction_date}: <span>{feeDetailReport.paymentDate}</span></p>
            <p>{resource.fee_detail_report_list_transaction_no}: <span>{feeDetailReport.paymentId}</span></p>
            <p>{resource.fee_detail_report_list_transaction_status}: <span>{feeDetailReport.paymentStatus}</span></p>
            <p>{resource.fee_detail_report_list_fee_amount}: <span>{feeDetailReport.feeAmount}</span></p>
            <p>{resource.fee_detail_report_list_fee_transaction_no}: <span>{feeDetailReport.feeTransactionNo}</span></p>
            <p>{resource.fee_detail_report_fee_effective_day}: <span>{feeDetailReport.feeDueDate}</span></p>
            <p>{resource.fee_detail_report_list_fee_positing_type}: <span>{feeDetailReport.postingType}</span></p>
            <p>{resource.fee_detail_report_list_debit_account}: <span>{feeDetailReport.feeDebitBankAccount}</span></p>
          </article>
        </div>
      </div>
    );
  }
}

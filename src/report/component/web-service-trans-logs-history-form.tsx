import * as React from 'react';
import {WebServiceTransLog} from '../model/WebServiceTransLog';

interface Props {
  data: WebServiceTransLog;
  resource: any;
  close: any;
}

export class WebServiceTransLogsHistoryForm extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  close = () => {
    this.props.close();
  }

  render() {
    const resource = this.props.resource;
    const log = this.props.data;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.web_services_trans_search}</h2>
          <button type='button' id='btnClose' name='btnClose' className='btn-close' onClick={this.close} />
        </header>
        <div>
          <article>
            <p>{resource.corr_id}: <span>{log.exSysRefNo}</span></p>
            <p>{resource.transNo}: <span>{log.transNo}</span></p>
            <p>{resource.externalsys_name}: <span>{log.exSysName}</span></p>
            <p>{resource.web_services_type}: <span>{log.webServicesType}</span></p>
            <p>{resource.detail}: <span>{log.detail}</span></p>
            <p>{resource.action_date}: <span>{log.statusCode}</span></p>
            <p>{resource.created_date}: <span>{log.receiveDate}</span></p>
          </article>
        </div>
      </div>
    );
  }
}

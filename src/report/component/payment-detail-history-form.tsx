import * as React from 'react';

export class PaymentDetailHistoryForm extends React.Component<any, any> {
  render() {
    return (
      <div className='view-container'>
        <header>
          <h2>Payment Detail Search</h2>
        </header>
        <div>
          <form className='list-result'>
            <section className='row'>
              <label className='col s12 m6'>
                <h1>Payment Detail</h1>
              </label>
            </section>
            <div className='table-responsive'>
              <table>
                <tbody>
                  <tr>
                    <td>Transaction No</td>
                    <td>222007787787454411</td>
                    <td>Payment Amount</td>
                    <td>5:00</td>
                  </tr>
                  <tr>
                    <td>Payee</td>
                    <td>PTT Puclic Company Limited</td>
                    <td>Fee Amount</td>
                    <td>0:00</td>
                  </tr>
                  <tr>
                    <td>Payer/Customer</td>
                    <td>PTT Payer005(DCT)</td>
                    <td>Grad Total Amount</td>
                    <td>5:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <section className='row'>
              <label className='col s12 m6'>
                <h1>Detail</h1>
              </label>
            </section>
            <div className='table-responsive'>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Reference 1</th>
                    <th>Reference 2</th>
                    <th>Reference 3</th>
                    <th>Reference 4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>R 1</td>
                    <td>R 2</td>
                    <td>R 3</td>
                    <td>R 4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

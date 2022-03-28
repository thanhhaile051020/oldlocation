import {SearchModel} from 'onecore';
import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import PageSizeSelect from 'react-page-size-select';
import Pagination from 'react-pagination-x';
import {alertError, showToast, storage} from 'uione';
import config from '../../config';
import applicationContext from '../config/ApplicationContext';
import {Drive} from '../model/Drive';
import {DriveService} from '../service/DriveService';
import './drive.scss';

export class DrivesForm extends SearchComponent<Drive, SearchModel, HistoryProps, SearchState<Drive>> {
  constructor(props) {
    super(props, applicationContext.driveService, storage.resource(), storage.ui(), showToast, alertError);

    this.state = {
      keyword: '',
      results: [],
      authData: {}
    };
    this.driveService = applicationContext.driveService;
  }
  driveService: DriveService;

  edit = (e, id: string) => {
    e.preventDefault();
    this.props.history.push(`/content/drive/edit/` + id);
  }

  render() {
    const { keyword, results } = this.state;
    const resource = this.resource;
    return (
      <div className='drive view-container'>
        <header>
          <h2>{resource._drive}</h2>
          <button type='button' id='btnNew' name='btnNew' className='btn-new' onClick={this.add} />
        </header>
        <div className='view-body'>
          <form id='locationsForm' name='locationsForm' noValidate={true} ref='form'>
            <section className='row search-group'>
              <label className='col s12 m6 search-input'>
                <PageSizeSelect pageSize={this.pageSize} pageSizes={this.pageSizes} onPageSizeChanged={this.pageSizeChanged} />
                <input type='text' id='keyword' name='keyword' maxLength={1000} placeholder={resource.keyword} />
                <button type='button' hidden={keyword === ''} className='btn-remove-text' onClick={this.clearKeyword} />
                <button type='submit' className='btn-search' onClick={this.searchOnClick} />
              </label>
              <Pagination className='col s12 m6' totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize} currentPage={this.pageIndex} onPageChanged={this.pageChanged} initPageSize={this.initPageSize}/>
            </section>
          </form>
          <form className='list-result'>
            <div className='table-responsive'>
              <table className='table table-striped table-bordered table-hover'>
                <thead>
                  <tr>
                    <th data-field='name'><a id='name' onClick={this.sort}
                    >{resource.drive_name}</a></th>
                    <th data-field='owners'><a id='owners' onClick={this.sort}
                    >{resource.drive_owners}</a></th>
                    <th data-field='modifiedTime'><a id='modifiedTime' onClick={this.sort}
                    >{resource.drive_modified_time}</a></th>
                    <th data-field='size'><a id='size' onClick={this.sort}
                    >{resource.drive_size}</a></th>
                    <th className='col-action'><a>{resource.action}</a></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    results.map((drive, i) => {
                      const { id, name, createdBy, lastModifiedDateTime, size } = drive;
                      return (
                        <tr key={id}>
                          <td>{name}</td>
                          <td>{createdBy && createdBy.user && createdBy.user.displayName}</td>
                          <td>{lastModifiedDateTime}</td>
                          <td>{size}</td>
                          <td className='col-action'>
                            <div className='btn-group'>
                              <button type='button' id={'btnView' + i} className='btn-edit' onClick={(e) => this.edit(e, drive.id)} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
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

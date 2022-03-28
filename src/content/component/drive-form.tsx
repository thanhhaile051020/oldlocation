import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {confirm} from 'ui-alert';
import {alertError, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Drive} from '../model/Drive';
import {DriveService} from '../service/DriveService';
import './comment-item.scss';
import './drive.scss';

interface InternalState {
  drive: Drive;
}

export class DriveForm extends EditComponent<Drive, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.driveService, storage.resource(), storage.ui(), showToast, alertError, confirm);
    this.state = {
      drive: this.createModel(),
      file: null,
      fileName: '',
      action: props['props'].match.params.action,

    };
    this.driveService = applicationContext.driveService;
    const action = props['props'].match.params.action;
    if (action === 'edit') {
      this.newMode = false;
    } else {
      this.newMode = true;
    }
  }
  driveService: DriveService;

  public handleFileChange = (e) => {
    this.setState({ file: e.target && e.target.files[0], fileName: e.target && e.target.files[0].name });
  }

  public handleDown = async (e) => {
    const { drive: { id } } = this.state;
    const p = 'D:/';
    const path = encodeURIComponent(p);
    await this.driveService.downloadFile({ id, path });
    this.props.history.push('/content/drive');
  }

  public handleSave = async (e) => {
    const { action } = this.state;
    if (action === 'add') {
      e.persist();
      const { file, fileName } = this.state;
      if (file && fileName) {
        const formData = new FormData();
        formData.append('file', file, fileName);
        // Upload
        // Google
        // formData.append('parent', '1Q4xnAnldPoYmzLRviPqyz8OO1aDRkNzs');
        // OneDrive
        formData.append('parent', 'C955EE1514DFF3A9!110');
        try {
          await this.driveService.uploadFile(formData);
          this.props.history.push('/content/drive');
        } catch (error) {
          throw new Error('cant upload file');
        }
      }
    } else {
      // Test Move OneDrive
      // const { drive: { parents } } = this.state;
      // parents[0] = 'C955EE1514DFF3A9!110';
      // this.setState({ drive: { parents } });
      this.saveOnClick(e);
    }
  }

  render() {
    const resource = this.resource;
    const { action, drive: { name, id } } = this.state;
    return (
      <div>
        <article>
          <div className='drive view-container'>
            <form id='driveForm' name='driveForm' model-name='drive' className='form'>
              <header className='view-header'>
                <button type='button' className='btn-back' onClick={this.back} />
                <h2>{resource.drive}</h2>
              </header>
              <br />
              {
                action === 'edit' ?
                  <div className='view-body'>
                    <label className={'required'}>{resource.drive_id}
                      <input type='text' className='form-control' id='id' name='id' onChange={this.updateState}
                        value={id}
                        required={true}
                        disabled={true}
                        placeholder={resource.drive_id} />
                    </label>
                    <label className={'required'}>{resource.drive_name}
                      <input type='text' className='form-control' id='name' name='name' onChange={this.updateState}
                        value={name}
                        required={true}
                        placeholder={resource.drive_name} />
                    </label>
                  </div> :
                  <div>
                    <input type='file' onChange={this.handleFileChange} accept='image/*' required={true} />
                  </div>
              }
              <footer>
                <button type='button' className='btn btn-primary' id='btnSave' name='btnSave' onClick={this.handleSave}>
                  {resource.button_save}
                </button>
                {action === 'edit' && <button type='button' className='btn btn-primary' id='btnDown' name='btnDown' onClick={this.handleDown}>
                  {resource.button_download}
                </button>}
              </footer>
            </form>
          </div>
        </article>
      </div>
    );
  }
}

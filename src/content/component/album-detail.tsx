import {ResultInfo} from 'onecore';
import * as React from 'react';
import {EditComponent, HistoryProps} from 'react-onex';
import {Link} from 'react-router-dom';
import {confirm} from 'ui-alert';
import {alertError, handleError, showToast, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Album} from '../model/Album';
import './album.scss';
import {UploadForm} from './upload-form';

interface InternalState {
  album: Album;
}

export class AlbumDetail extends EditComponent<Album, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.albumService, storage.resource(), storage.ui(), showToast, alertError, confirm);
    this.onDeleteCheckBox = this.onDeleteCheckBox.bind(this);
    this.state = {
      album: this.createModel(),
      isShowCheckbox: false,
      isUploadImage: false,
      checkBoxList: []
    };
    this.childUploadForm = React.createRef();
  }

  private childUploadForm: any;

  onDeleteCheckBox = (e) => {
    e.preventDefault();
    const r = this.resourceService;
    this.confirm(r.value('msg_confirm_delete'), r.value('confirm'), () => {
      const album = Object.assign({}, this.state.album);
      album.stream = this.state.checkBoxList;
      const arrIdStreams = this.state.checkBoxList.map(item => {
        item['streamId'] = item._id;
        delete item._id;
        return item;
      });
      if (album.stream && album.stream.length > 0) {
        applicationContext.albumService.deleteManyItemStream(album).then((result: ResultInfo<number>) => {
          /*
          if (result && result.status === StatusCode.Success) {
            storage.alert().alertWarning('Deleted ' + result.value + ' items');
            // this.loadData();
          } else {
            if (result.errors && result.errors.length > 0) {
              storage.alert().alertError(result.errors[0].message);
            }
          }
          */
        }, err => {
          handleError(err);
        });
      }
    });
  }

  onShowCheckBox = () => {
    this.setState(prevState => ({ isShowCheckbox: !prevState.isShowCheckbox }));
  }

  onCheckBox = (label) => {
    const { checkBoxList, album } = this.state;
    const _this = this;
    const result = album.stream.find((value) => {
      if (value) {
        return value._id === label;
      }
    });
    if (result) {
      const index = checkBoxList.indexOf(result);
      if (index !== -1) {
        checkBoxList.splice(index);
      } else {
        checkBoxList.push(result);
      }
      this.setState({ checkBoxList }, () => {
        let { isShowCheckbox } = this.state;
        if (this.state.checkBoxList.length > 0) {
          isShowCheckbox = true;
        } else {
          isShowCheckbox = false;
        }
        this.setState({ isShowCheckbox });
      });
    }
  }

  toggleClose = (e) => {
    e.preventDefault();
    if (this.state.isUploadImage) {
      // this.loadData();
    }
    if (this.state.isUploadImage && this.childUploadForm && this.childUploadForm.current) {
      this.childUploadForm.current.clearMessage();
    }
    this.setState(prevState => ({ isUploadImage: !prevState.isUploadImage }));
  }

  onCheckAll = (e) => {
    const { album } = this.state;
    let { checkBoxList } = this.state;
    if (album.stream) {
      checkBoxList = album.stream;
    }
    this.setState({ checkBoxList });
  }

  onUnCheckAll = (e) => {
    this.setState({ checkBoxList: [] });
  }

  render() {
    const resource = this.resource;
    const { album, isUploadImage, isShowCheckbox, checkBoxList } = this.state;
    return (
      <div className='album-container'>
        <header className='view-header'>
          <button type='button' className='btn-back' onClick={this.back} />
          <h2>{resource.albums}</h2>
        </header>
        <div className='view-body'>
          <section>
            <h4>
              <div className='btn-group'>
                {this.editable && <button onClick={this.toggleClose}>
                  {!this.state.isUploadImage ? resource.add : resource.close}</button>}
                {this.editable && <button type='button'
                  onClick={this.onShowCheckBox}>{isShowCheckbox ? resource.deselect : resource.select}</button>}
                {isShowCheckbox ? <button type='button' onClick={this.onCheckAll}>{resource.check_all}</button> : ''}
                {isShowCheckbox ?
                  <button type='button' onClick={this.onUnCheckAll}>{resource.uncheck_all}</button> : ''}
                {isShowCheckbox ? <button type='button' onClick={this.onDeleteCheckBox}>{resource.delete}</button> : ''}
              </div>
            </h4>
          </section>
          <div hidden={isUploadImage} className='view-detail-images grid-row'>
            {album.stream && album.stream.map((item, i) => {
              const result = checkBoxList.find((v) => {
                if (v) {
                  return v._id === item._id;
                }
              });
              return (
                <section key={i} className='gallery grid-column'>
                  <Link to={'/content/album/preview/' + album.albumId + '/' + item._id} className='card-image'>
                    <img src={item.url} alt='' />
                  </Link>
                  <div className='desc'>
                    <input type='checkbox' name='selected' checked={result ? true : false} onClick={(e) => {
                      this.onCheckBox(item._id);
                    }} />
                  </div>
                </section>
              );
            })}
          </div>
          <div hidden={!isUploadImage}>
            <UploadForm album={album} albumId={album.albumId} ref={this.childUploadForm} history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

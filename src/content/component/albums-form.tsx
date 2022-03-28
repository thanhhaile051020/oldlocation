import {SearchModel} from 'onecore';
import * as React from 'react';
import {HistoryProps, SearchComponent, SearchState} from 'react-onex';
import Pagination from 'react-pagination-x';
import {Link} from 'react-router-dom';
import {alertError, showToast, storage} from 'uione';
import imageDefault from '../../assets/images/default-albums.jpg';
import applicationContext from '../config/ApplicationContext';
import {Album} from '../model/Album';
import './album.scss';
import {UploadForm} from './upload-form';

interface InternalState {
  album: Album;
}

export class AlbumsForm extends SearchComponent<Album, SearchModel, HistoryProps, SearchState<Album>> {
  constructor(props) {
    super(props, applicationContext.albumService, storage.resource(), storage.ui(), showToast, alertError);
    this.state = {
      albums: [],
      isUploadImage: false,
      checkBoxList: [],
      className: 'drop-zone-hide'
    };
    this.childUploadForm = React.createRef();
  }

  private childUploadForm: any;


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

  onDeleteCheckBox = (e) => {
    /*
    e.preventDefault();
    const r = this.resourceService;
    this.confirm(r.value('msg_confirm_delete'), r.value('confirm'), () => {
      const albums = Object.assign([], this.state.results);
      const ids = this.state.checkBoxList.map(item => item.albumId);
      if (ids.length === 0) {
        return;
      }
      applicationContext.getAlbumService().deleteMany({ ids }).then((result: ResultInfo<number>) => {
        console.log('resultaa: ' + JSON.stringify(result));
        if (result.status === StatusCode.Success) {
          storage.alert().alertSuccess('Deleted ' + result.value + ' items');
          this.loadData();
        } else {
          if (result.errors && result.errors.length > 0) {
            storage.alert().alertError(result.errors[0].message);
          } else {
            storage.alert().alertError(JSON.stringify(result));
          }
        }
      }, err => {
        handleError(err);
      });
    });
    */
  }

  onShowCheckBox = () => {
    this.setState(prevState => ({ isShowCheckbox: !prevState.isShowCheckbox }));
  }

  onCheckBox = (label) => {
    const { checkBoxList, results } = this.state;
    const _this = this;
    const result = results.find((value) => {
      if (value) {
        return value.albumId === label;
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

  onCheckAll = (e) => {
    const { results } = this.state;
    let { checkBoxList } = this.state;
    if (results) {
      checkBoxList = results;
    }
    this.setState({ checkBoxList });
  }

  onUnCheckAll = (e) => {
    this.setState({ checkBoxList: [] });
  }


  render() {
    const resource = this.resource;
    const { isUploadImage, results, checkBoxList, isShowCheckbox } = this.state;
    const albums = Object.assign([], results);
    console.log(this.editable);
    return (
      <div className='album-container view-container'>
        <header>
          <h2>{resource.albums}</h2>
        </header>
        <Pagination totalRecords={this.itemTotal} itemsPerPage={this.pageSize} maxSize={this.pageMaxSize}
          onPageChanged={this.pageChanged} initPageSize={this.initPageSize} />
        <div className='view-images'>
          <section>
            <h4>
              <div className='btn-group'>
                {this.editable &&
                  <button type='button' className={!this.state.isUploadImage ? 'btn-new' : ''} onClick={this.toggleClose}>
                    {!this.state.isUploadImage ? '' : resource.close} </button>}
                {this.editable && <button type='button'
                  onClick={this.onShowCheckBox}>{isShowCheckbox ? resource.deselect : resource.select}</button>}
                {isShowCheckbox ? <button type='button' onClick={this.onCheckAll}>{resource.check_all}</button> : ''}
                {isShowCheckbox ?
                  <button type='button' onClick={this.onUnCheckAll}>{resource.uncheck_all}</button> : ''}
                {isShowCheckbox ? <button type='button' onClick={this.onDeleteCheckBox}>{resource.delete}</button> : ''}
              </div>
            </h4>
          </section>
          {!isUploadImage && albums && albums.map((item, i) => {
            const result = checkBoxList.find((v) => {
              if (v) {
                return v.albumId === item.albumId;
              }
            });
            return (
              <section key={i} className='gallery-card grid-column'>
                <Link to={'/content/album/' + item.albumId} className='card-image'>
                  {item.stream && item.stream[0] ? <img
                    src={item.stream[0].url}
                    alt='' /> : <img
                      src={imageDefault}
                      className='image-large'
                      alt='image default' />
                  }
                </Link>
                <div className='desc'>
                  <input type='checkbox' name='selected' checked={result ? true : false} onClick={(e) => {
                    this.onCheckBox(item.albumId);
                  }} />
                  <span>{item.createDate}</span>
                  <span className='photo'>{item.stream && item.stream.length} photo</span>
                </div>
              </section>
            );
          })}
          <div hidden={!isUploadImage}>
            {isUploadImage && <UploadForm ref={this.childUploadForm} history={this.props.history} />}
          </div>
        </div>
      </div>
    );
  }
}

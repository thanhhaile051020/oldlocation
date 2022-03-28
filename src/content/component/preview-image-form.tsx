import * as React from 'react';
import {createModel, HistoryProps, ViewComponent} from 'react-onex';
import {alertError, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {Album} from '../model/Album';
import './album.scss';
import './upload.scss';

interface InternalState {
  album: Album;
  idStream: string;
  id: string;
}

export class PreviewImageForm extends ViewComponent<Album, string, HistoryProps, InternalState> {
  constructor(props) {
    super(props, applicationContext.albumService, storage.resource(), alertError);
    const idStream = props['props'].match.params.idStream;
    const id = props['props'].match.params.id;
    this.state = {
      album: createModel(this.service.metadata()),
      idStream,
      id,
    };
  }

  nextOnClick = (event) => {
    event.preventDefault();
    const {album, idStream} = this.state;
    const index = album.stream.findIndex(x => x._id === idStream);
    if (album.stream[index + 1] && album.stream[index + 1]._id) {
      const streamId = album.stream[index + 1]._id;
      this.props.history.push('/content/album/preview/' + this.state.id + '/' + streamId);
    }
  }

  prevOnClick = (event) => {
    event.preventDefault();
    const {album, idStream} = this.state;
    const index = album.stream.findIndex(x => x._id === idStream);
    if (album.stream[index - 1] && album.stream[index - 1]._id) {
      const streamId = album.stream[index - 1]._id;
      this.props.history.push('/content/album/preview/' + this.state.id + '/' + streamId);
    }
  }

  closeOnClick = (event) => {
    event.preventDefault();
    this.props.history.push('/content/album/' + this.state.id);
  }


  render() {
    const {album, idStream} = this.state;
    const albumShow = Object.assign({}, album);
    console.log(albumShow.stream);
    if (idStream && album.stream) {
      albumShow.stream = albumShow.stream.filter(x => x._id === idStream);
    }
    return (
      <div id='preview_images'>
        <button className={'btn-al btn-close-right'} onClick={this.closeOnClick}>{'x'}</button>
        <button className={'btn-al btn-prev-left'} onClick={this.prevOnClick}>{'<'}</button>
        {albumShow.stream && albumShow.stream.map((item, i) => {
          return (
            <figure key={i}>
              <img src={item.url} alt=''/>
              <figcaption>A young Roger Moore</figcaption>
            </figure>
          );
        })}
        <button className={'btn-al btn-next-right'} onClick={this.nextOnClick}>{'>'}</button>
      </div>
    );
  }
}

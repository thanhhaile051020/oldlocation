// @ts-ignore
import PropTypes from 'prop-types';
import * as React from 'react';
import {createModel} from 'react-onex';
import {confirm} from 'ui-alert';
import {handleError, storage} from 'uione';
import applicationContext from '../config/ApplicationContext';
import {commentModel} from '../metadata/CommentModel';
import {Comment} from '../model/Comment';
import {CommentService} from '../service/CommentService';
import './comment-item.scss';

interface InternalState {
  comment: Comment;
  username: string;
  dataComment: any;
  comments: Comment[];
}

interface InternalProp {
  parentId: string;
  parentType: string;
  disabled: boolean;
}

export class CommentForm extends React.Component<InternalProp, InternalState> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      dataComment: {},
      comment: {
        commentId: '',
        content: '',
        parentId: '',
        parentType: '',
        comments: []
      },
      comments: []
    };
    this.resource = storage.resource().resource();
    this.loadComment = this.loadComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.deleteCommentChild = this.deleteCommentChild.bind(this);
    this.serviceComment = applicationContext.commentService;
    this.setState({ username: storage.getUserName() });
  }
  form: any;
  resource: any;
  serviceComment: CommentService;

  componentDidMount() {
    this.loadComment();
  }

  async loadComment() {
    // debugger;
    if (this.props.parentId) {
      try {
        /*
        const dataCommentRs = await this.serviceComment.load(this.props.parentId);
        this.setState({ comments: dataCommentRs });
        */
      } catch (err) {
        handleError(err);
      }
    }
  }

  async sendMessage(event, index, action: string, indexChild?: number) {
    console.log('index: ' + index);
    event.preventDefault();
    this.form = event.target.form;
    let obj: Comment = this.createComment(index);
    const idElement = event.target.getAttribute('data-closeID');
    try {
      if (index === '') {
        obj.comments = [];
        const objInsert = Object.assign({}, obj);
        delete objInsert.commentId;
        const rs = await this.serviceComment.insert(objInsert);
        this.loadComment();
      } else {
        // push message
        if (action === 'push') {
          obj.comments = [];
          obj.comments.push(this.createComment(''));
          if (obj) {
            console.log('object push: ' + JSON.stringify(obj));
            const rs = await this.serviceComment.pushChildComment(obj);
            this.loadComment();
          }
        }
        if (action === 'updateChild' && typeof indexChild !== 'undefined' && indexChild >= 0 && obj.comments && obj.comments[indexChild]) {
          const comments = [];
          obj = this.createComment(index);
          // @ts-ignore
          const commentUpdate: Comment = obj.comments[indexChild];
          commentUpdate.content = this.state.dataComment.content;
          comments.push(commentUpdate);
          obj.comments = comments;
          const rs = await this.serviceComment.updateChildComment(obj);
          this.loadComment();
          if (idElement) {
            this.toggle_element(idElement);
          }
        }
        if (action === 'update') {
          const rs = await this.serviceComment.update(obj);
          this.loadComment();
          this.toggle_element(obj.commentId);
        }
      }
    } catch (err) {
      handleError(err);
    }
  }

  private createComment(index) {
    // debugger;
    const props = this.props;
    const obj: Comment = index === '' ? createModel(commentModel) : Object.assign({}, this.state.comments[index]);
    if (index === '') {
      obj.content = this.state.dataComment['content'];
      obj.parentId = props.parentId ? props.parentId : '';
      obj.parentType = props.parentType ? props.parentType : '';
    }
    // obj.createdBy = storage.getUserName();
    // obj.created_date = new Date();
    console.log('object later: ' + JSON.stringify(obj));
    return obj;
  }

  toggle_element(element_id: string) {
    const element = document.getElementById(element_id);
    element.style.display = (element.style.display === 'none' ? 'block' : 'none');
  }

  async deleteComment(_id: string) {
    if (!_id) {
      return;
    }
    try {
      const rs = await this.serviceComment.delete(_id);
      this.loadComment();
    } catch (err) {
      handleError(err);
    }
  }

  async deleteCommentChild(_id: string, idChild: string) {
    if (!_id || !idChild) {
      return;
    }
    try {
      const rs = await this.serviceComment.deleteChild(_id, idChild);
      this.loadComment();
    } catch (err) {
      handleError(err);
    }
  }

  createFormEditComment(element_id: string, index: number, message: string, action: string, indexChild?: number) {
    return (
      <section key={element_id} className='row' id={element_id} style={{ 'display': 'none' }}>
        <label className='col s12 m6'>
          <input type='text' id={'contentEdit-' + element_id} name='content'
            /* onChange={this.updateState} */
            defaultValue={message}
            maxLength={255} required={true}
            placeholder='Content message...' />
        </label>
        <button className='btn-send' data-closeID={element_id}
          onClick={(e) => this.sendMessage(e, index, action, indexChild)}> Send <i
            className='fa fa-paper-plane' aria-hidden='true' /></button>
      </section>
    );
  }

  collapsible = (event, callback?) => {
    event.preventDefault();
    const collapsibleData = event.target.getAttribute('collapsible-data');
    if (collapsibleData) {
      this.toggle_element(collapsibleData);
      if (callback) {
        callback();
      }
    }
  }

  close = (event) => {
    event.preventDefault();
    const collapsibleData = event.target.getAttribute('data-closeID');
    console.log(event.target.getAttribute('data-closeID'));
    if (collapsibleData) {
      this.toggle_element(collapsibleData);
    }
  }

  showDialog = (id) => {
    const delectFunction = this.deleteComment;
    confirm('Are you sure?', 'Confirm', () => delectFunction(id));
  }

  render() {
    const resource = this.resource;
    const comments_level = this.state.comments;
    const { username } = this.state;
    if (this.props.disabled) {
      return (
        <form id='comments' name='comments' model-name='dataComment' ref='form'>
          <div className='comment-header'>
            <h2>{resource.comment_title}</h2>
          </div>
          <div className='comment-body'>
            {comments_level && comments_level.map((comment, index) => (
              <div id={'parent' + index} key={index} className='comments'>
                <div className='options' hidden={username !== comment.createdBy}>
                  <label className='btn-customer-default' onClick={this.collapsible}
                    collapsible-data={'id-option' + index}><i className={''}>...</i></label>
                  <div className='list-option' id={'id-option' + index} style={{ 'display': 'none' }}>
                    <span className='' collapsible-data={comment.commentId} data-closeID={'id-option' + index}
                      onClick={(e) => {
                        this.collapsible(e, this.close(e));
                      }}>Edit</span>
                    <span onClick={() => {
                      this.showDialog(comment.commentId);
                    }}>Delete</span>
                  </div>
                </div>
                <div className='content'>
                  {/* <span className='user'> {comment.createdBy}</span> */}
                  <p> {comment.content}</p>
                  {this.createFormEditComment(comment.commentId, index, comment.content, 'update')}
                  <span className='btn-reply' onClick={this.collapsible} collapsible-data={'child' + index}>Reply</span>
                  {/* <span className='date'>{this.formatDateTime(comment.createdDate)}</span> */}
                </div>
                {/*Comment child*/}
                <div id={'child' + index} className='reply fade-in' style={{ 'display': 'none' }}>
                  {comment.comments && comment.comments.map((comment_reply, index1) => (
                    <div key={'reply' + index1} className='comments'>
                      <div className='options' hidden={username !== comment_reply.createdBy}>
                        <label className='btn-customer-default' onClick={this.collapsible}
                          collapsible-data={'id-option-reply' + comment_reply.commentId}><i
                            className={''}>...</i></label>
                        <div className='list-option' id={'id-option-reply' + comment_reply.commentId}
                          style={{ 'display': 'none' }}>
                          <span collapsible-data={comment_reply.commentId}
                            data-closeID={'id-option-reply' + comment_reply.commentId}
                            onClick={(e) => {
                              this.collapsible(e, this.close(e));
                            }}>Edit</span>
                          <span onClick={(e) => {
                            confirm('Are you sure?', 'Confirm', () => {
                              this.deleteCommentChild(comment.commentId, comment_reply.commentId);
                            });
                          }}>Delete</span>
                        </div>
                      </div>
                      <div className='content'>
                        <span className='user'> {comment_reply.createdBy}</span>
                        <p>{comment_reply.content}</p>
                        {this.createFormEditComment(comment_reply.commentId, index, comment_reply.content, 'updateChild', index1)}
                        <span className='date'>{comment.createdDate}</span>
                      </div>
                    </div>
                  ))}
                  <section className='row'>
                    <label className='col s12 m6'>
                      <input type='text' id={'content' + index} name={'content'}
                        /* onChange={this.updateState} */
                        maxLength={255} required={true}
                        placeholder='Content message...' />
                    </label>
                    <button className='btn-send' onClick={(e) => this.sendMessage(e, index, 'push')}> Send <i
                      className='fa fa-paper-plane' aria-hidden='true' /></button>
                  </section>
                </div>
              </div>
            ))}
            <section className='row'>
              <label className='col s6 m6'>
                <textarea rows={2}
                  id='content-comment' className={'input-field'} name='content'
                  /* onChange={this.updateState} */
                  maxLength={255} required={true}
                  placeholder='Content message...' />
              </label>
            </section>
            <section className='row'>
              <div className={'col offset-s6'}>
                <button className='waves-effect waves-light btn-send '
                  onClick={(e) => this.sendMessage(e, '', '')}> Send <i
                    className='fa fa-paper-plane'
                    aria-hidden='true' /></button>
              </div>
            </section>
          </div>
        </form>
      );
    } else {
      return (<div />);
    }
  }
}

// @ts-ignore
CommentForm.propTypes = {
  parentId: PropTypes.string,
  parentType: PropTypes.string,
};

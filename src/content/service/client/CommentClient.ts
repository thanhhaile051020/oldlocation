import {ResultInfo, SearchModel} from 'onecore';
import {GenericSearchWebClient} from 'web-clients';
import {HttpRequest} from 'web-clients';
import config from '../../../config';
import {commentModel} from '../../metadata/CommentModel';
import {Comment} from '../../model/Comment';
import {CommentService} from '../CommentService';

export class CommentClient extends GenericSearchWebClient<Comment, string, ResultInfo<Comment>, SearchModel> implements CommentService {
  constructor(http: HttpRequest) {
    super(config.commentUrl, http, commentModel);
  }

  pushChildComment(comment: Comment): Promise<ResultInfo<number>> {
    const url = this.serviceUrl + '/comment/push/' + comment.commentId;
    return this.http.put(url, comment);
  }

  updateChildComment(comment: Comment): Promise<ResultInfo<number>> {
    const url = this.serviceUrl + '/comment/update/' + comment.commentId;
    return this.http.put<ResultInfo<number>>(url, comment);
  }

  deleteChild(id, idChild): Promise<ResultInfo<number>> {
    const url = this.serviceUrl + '/' + id + '/' + idChild;
    return this.http.delete(url);
  }
}

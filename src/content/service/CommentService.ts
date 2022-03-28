import {GenericSearchService, ResultInfo, SearchModel} from 'onecore';
import {Comment} from '../model/Comment';

export interface CommentService extends GenericSearchService<Comment, string, ResultInfo<Comment>, SearchModel> {
  pushChildComment(obj: Comment): Promise<ResultInfo<number>>;
  updateChildComment(obj: Comment): Promise<ResultInfo<number>>;
  deleteChild(id, idChild): Promise<ResultInfo<number>>;
}

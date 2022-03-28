export class Comment {
  commentId: string;
  content: string;
  parentId: string;
  parentType: string;
  createdBy?: string;
  createdDate?: Date;
  comments: Comment[];
}

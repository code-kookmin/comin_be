export interface CommentUpdate {
  content: string;
  like: number;
}

export function isCommentUpdate(comment: CommentUpdate) {
  if (typeof comment.content !== 'string' || typeof comment.like !== 'number') return false;
  return true;
}

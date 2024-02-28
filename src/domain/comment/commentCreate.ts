export interface CommentCreate {
  communityId: number;
  content: string;
  like: number;
}

export function isCommentCreate(comment: CommentCreate) {
  if (typeof comment.communityId !== 'number' || typeof comment.content !== 'number') return false;
  return true;
}

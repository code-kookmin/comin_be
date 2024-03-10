export interface CommentUpdate {
  id: number;
  userId?: number;
  content: string;
  like: number;
}

export function isCommentUpdate(comment: CommentUpdate) {
  if (typeof comment.id !== "number" || typeof comment.content !== "string" || typeof comment.like !== "number")
    return false;
  return true;
}

export interface CommentCreate {
  userId: number;
  communityId: number;
  content: string;
  like: number;
}

export function isCommentCreate(comment: CommentCreate) {
  if (
    typeof comment.userId !== 'number' ||
    typeof comment.communityId !== 'number' ||
    typeof comment.content !== 'number'
  )
    return false;
  return true;
}

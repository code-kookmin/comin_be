import { Tspec } from 'tspec';

export interface Comment {
  id: number;
  userId: number;
  communityId: number;
  content: string;
  like: number;
}

export interface CommentCreate {
  userId: number;
  communityId: number;
  content: string;
}

export interface CommentUpdate {
  content: string;
  like: number;
}

export function isComment(comment: Comment) {
  if (
    typeof comment.id !== 'number' ||
    typeof comment.communityId !== 'number' ||
    typeof comment.userId !== 'number' ||
    typeof comment.content !== 'string' ||
    typeof comment.like !== 'number'
  )
    return false;
  return true;
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

export function isCommentUpdate(comment: CommentUpdate) {
  if (typeof comment.content !== 'string' || typeof comment.like !== 'number')
    return false;
  return true;
}

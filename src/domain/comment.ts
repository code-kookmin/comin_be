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

export type CommentApiTspec = Tspec.DefineApiSpec<{
  tags: ['Comment'];
  paths: {
    '/comments': {
      post: {
        summary: '댓글 생성';
        body: CommentCreate;
        responses: { 200: string };
      };
    };
    '/comments/{id}': {
      get: {
        summary: '댓글 조회';
        path: { id: number };
        responses: { 200: Comment };
      };
      put: {
        summary: '댓글 수정';
        path: { id: number };
        body: CommentUpdate;
        responses: { 200: string };
      };
      delete: {
        summary: '댓글 삭제';
        path: { id: number };
        responses: { 200: string };
      };
    };
    '/comments/community/{id}': {
      get: {
        summary: '특정 게시글의 댓글 조회';
        path: { id: number };
        responses: { 200: Comment };
      };
    };
  };
}>;

import { Tspec } from 'tspec';
import { CommentCreate } from './commentCreate';
import { CommentUpdate } from './commentUpdate';

export interface Comment {
  id: number;
  userId: number;
  communityId: number;
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

export type CommentApiTspec = Tspec.DefineApiSpec<{
  tags: ['Comment'];
  paths: {
    '/community/comments': {
      post: {
        summary: '댓글 생성';
        body: CommentCreate;
        responses: { 200: string };
      };
    };
    '/community/comments/{id}': {
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
    '/community/{communityId}/comments/': {
      get: {
        summary: '특정 게시글의 댓글 조회';
        path: { communityId: number };
        responses: { 200: Comment };
      };
    };
  };
}>;

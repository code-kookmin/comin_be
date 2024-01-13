import { Tspec } from 'tspec';

export interface Reply {
  id: number;
  userId: number;
  commentId: number;
  content: string;
  like: number;
}

export interface ReplyUpdate {
  content: string;
  like: number;
}

export interface ReplyCreate {
  userId: number;
  commentId: number;
  content: string;
}

export function isReply(reply: Reply) {
  if (
    typeof reply.id !== 'number' ||
    typeof reply.userId !== 'number' ||
    typeof reply.commentId !== 'number' ||
    typeof reply.content !== 'string' ||
    typeof reply.like !== 'number'
  )
    return false;
  return true;
}

export function isReplyCreate(reply: ReplyCreate) {
  if (
    typeof reply.userId !== 'number' ||
    typeof reply.commentId !== 'number' ||
    typeof reply.content !== 'string'
  )
    return false;
  return true;
}

export function isReplyUpdate(reply: ReplyUpdate) {
  console.log(typeof reply.content, typeof reply.like);
  if (typeof reply.content !== 'string' || typeof reply.like !== 'number')
    return false;
  return true;
}

export type ReplyApiTspec = Tspec.DefineApiSpec<{
  tags: ['Reply'];
  paths: {
    '/reply': {
      post: {
        summary: '대댓글 생성';
        body: ReplyCreate;
        responses: { 200: string };
      };
    };
    '/reply/{id}': {
      get: {
        summary: '대댓글 조회';
        path: { id: number };
        responses: { 200: Reply };
      };
      put: {
        summary: '대댓글 수정';
        path: { id: number };
        body: ReplyUpdate;
        responses: { 200: string };
      };
      delete: {
        summary: '대댓글 삭제';
        path: { id: number };
        responses: { 200: string };
      };
    };
    '/reply/comments/{id}': {
      get: {
        summary: '특정 댓글의 대댓글 조회';
        path: { id: number };
        responses: { 200: Reply };
      };
    };
    '/reply/users/{id}': {
      get: {
        summary: '특정 사용자의 대댓글 조회';
        path: { id: number };
        responses: { 200: Reply };
      };
    };
  };
}>;

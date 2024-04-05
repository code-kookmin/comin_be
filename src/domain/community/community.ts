import { Tspec } from 'tspec';

export interface Communtiy {
  id: number;
  userId: number;
  subcategoryId: number;
  title: string;
  content: string;
  like: number;
}

export function isCommuntiy(obj: Communtiy) {
  if (
    typeof obj.id !== 'number' ||
    typeof obj.subcategoryId !== 'number' ||
    typeof obj.userId !== 'number' ||
    typeof obj.title !== 'string' ||
    typeof obj.content !== 'string' ||
    typeof obj.like !== 'number'
  )
    return false;
  return true;
}

export type CommuntiyApiTspec = Tspec.DefineApiSpec<{
  tags: ['Community'];
  paths: {
    '/community/{id}': {
      get: {
        summary: '게시물 조회';
        path: { id: number };
        responses: { 200: Communtiy };
      };
      delete: {
        summary: '게시물 삭제';
        path: { id: number };
        responses: { 200: string };
      };
      put: {
        summary: '게시물 수정';
        path: { id: number };
        body: {
          title: string;
          content: string;
        };
        responses: { 200: string };
      };
    };
    '/community': {
      get: {
        summary: '게시물 전체 조회';
        query: { pageSize?: number; pageNumber?: number };
        responses: { 200: Communtiy };
      };
      post: {
        summary: '게시물 생성';
        body: {
          categoryId: number;
          title: string;
          content: string;
        };
        responses: { 200: string };
      };
    };
  };
}>;

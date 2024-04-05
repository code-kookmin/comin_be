import { Tspec } from 'tspec';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  birthday: string;
  githubName: string;
  baekjoonName: string;
  profileImage?: string;
  role?: number;
}

export function isUserCreate(obj: any): obj is User {
  if (
    typeof obj.email !== 'string' ||
    typeof obj.password !== 'string' ||
    typeof obj.name !== 'string' ||
    typeof obj.birthday !== 'string' ||
    typeof obj.githubName !== 'string' ||
    typeof obj.baekjoonName !== 'string'
  ) {
    return false;
  }
  return true;
}

export function isUser(obj: any): obj is User {
  if (
    typeof obj.id !== 'number' ||
    typeof obj.email !== 'string' ||
    typeof obj.password !== 'string' ||
    typeof obj.name !== 'string' ||
    typeof obj.birthday !== 'string' ||
    typeof obj.githubName !== 'string' ||
    typeof obj.baekjoonName !== 'string' ||
    typeof obj.role !== 'number'
  ) {
    return false;
  }
  return true;
}

export type userApiTspec = Tspec.DefineApiSpec<{
  tags: ['User'];
  paths: {
    '/user': {
      get: {
        summary: '사용자 전체 조회';
        query: { pageSize?: number; pageNumber?: number };
        responses: { 200: User };
      };
    };
    '/user/login': {
      get: {
        summary: '사용자 로그인 로그인 상태의 유저면 req.session.user 로 유저 객체 가져올 수 있음';
        query: { email: string; passWord: string };
        responses: { 200: string };
      };
    };
    '/user/logout': {
      get: {
        summary: '사용자 세션 종료 후 로그아웃';
        responses: { 200: string };
      };
    };
    '/user/signin': {
      post: {
        summary: '사용자 로그인';
        body: User;
        responses: { 200: string };
      };
    };
    '/user/password': {
      get: {
        summary: '사용자 비밀번호 조회';
        query: { email: string };
        responses: { 200: string };
      };
    };
    '/user/profile': {
      put: {
        summary: '사용자 프로필 수정';
        body: User;
        responses: { 200: string };
      };
    };
  };
}>;

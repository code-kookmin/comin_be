import { Tspec } from 'tspec';
import { UserCreate } from './userCreate';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  birthday: string;
  githubName: string;
  baekjoonName: string;
}

export function isUser(obj: any): obj is User {
  if (
    typeof obj.id !== 'number' ||
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

export function isUserCreate(obj: any): obj is UserCreate {
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

export type userApiTspec = Tspec.DefineApiSpec<{
  tags: ['User'];
  paths: {
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
        body: UserCreate;
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
        body: UserCreate;
        responses: { 200: string };
      };
    };
  };
}>;

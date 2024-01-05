import { Tspec } from 'tspec';

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

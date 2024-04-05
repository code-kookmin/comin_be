import { Tspec } from 'tspec';
import { BojProblemInfo } from '../service/boj';

export type ProblemApiSpec = Tspec.DefineApiSpec<{
  tags: ['Problem'];
  paths: {
    '/problem/recommendation': {
      get: {
        summary: '추천 문제 조회';
        query: { size?: number };
        responses: { problems: any[] };
      };
    };
    '/problem/{problemId}': {
      get: {
        summary: '백준 사이트에서 크롤링';
        path: { problemId: number };
        responses: { problem: BojProblemInfo };
      };
    };
  };
}>;

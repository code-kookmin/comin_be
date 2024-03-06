import { Tspec } from 'tspec';

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
  };
}>;

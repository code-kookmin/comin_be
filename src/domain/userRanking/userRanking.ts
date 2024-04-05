import { Tspec } from 'tspec';

export interface UserRanking {
  id: number;
  userId: number;
  roundId: number;
  totalSolved: number;
  totalSolvedWeight: number;
  tier: number;
}

export function isUserRanking(obj: UserRanking) {
  if (
    typeof obj.id === 'number' &&
    typeof obj.userId === 'number' &&
    typeof obj.roundId === 'number' &&
    typeof obj.totalSolved === 'number' &&
    typeof obj.totalSolvedWeight === 'number' &&
    typeof obj.tier === 'number'
  )
    return true;
  return false;
}

export type UserRankingApiTspec = Tspec.DefineApiSpec<{
  tags: ['UserRanking'];
  paths: {
    '/user/rankings/solved': {
      get: {
        summary: '특정 라운드의 전체 사용자 목록을 푼 문제 순으로 반환';
        query: { pageSize?: number; pageNumber?: number; roundId?: number };
        responses: { 200: string };
      };
    };
    '/user/rankings/weight': {
      get: {
        summary: '특정 라운드의 전체 사용자 목록을 푼 문제의 가중차 함 순으로 반환';
        query: { pageSize?: number; pageNumber?: number; roundId?: number };
        responses: { 200: string };
      };
    };
    '/user/{userId}/rankings': {
      get: {
        summary: '특정 라운드의 전체 사용자 목록을 랭킹 순으로 반환';
        path: { userId: number };
        query: { roundId?: number };
        responses: { 200: string };
      };
    };
  };
}>;

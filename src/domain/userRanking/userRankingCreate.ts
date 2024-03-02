export interface UserRankingCreate {
  userId: number;
  roundId: number;
  totalSolved: number;
  totalSolvedWeight: number;
  tier: number;
}

export function isUserRankingCreate(obj: UserRankingCreate) {
  if (
    typeof obj.userId === 'number' &&
    typeof obj.roundId === 'number' &&
    typeof obj.totalSolved === 'number' &&
    typeof obj.totalSolvedWeight === 'number' &&
    typeof obj.tier === 'number'
  )
    return true;
  return false;
}

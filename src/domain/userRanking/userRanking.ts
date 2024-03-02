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

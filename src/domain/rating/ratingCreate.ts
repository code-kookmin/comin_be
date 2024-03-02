export interface RatingCreate {
  userId: number;
  roundId: number;
  solvedCount: number;
  solvedCountWeight: number;
  tier: number;
}

export function isRatingCreate(obj: RatingCreate) {
  if (
    typeof obj.userId === 'number' &&
    typeof obj.roundId === 'number' &&
    typeof obj.solvedCount === 'number' &&
    typeof obj.solvedCountWeight === 'number' &&
    typeof obj.tier === 'number'
  )
    return true;
  return false;
}

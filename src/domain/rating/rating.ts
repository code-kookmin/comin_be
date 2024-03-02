export interface Rating {
  id: number;
  userId: number;
  roundId: number;
  registedDate: String;
  solvedCount: number;
  solvedCountWeight: number;
  tier: number;
}

export function isRating(obj: Rating) {
  if (
    typeof obj.id === 'number' &&
    typeof obj.userId === 'number' &&
    typeof obj.roundId === 'number' &&
    typeof obj.registedDate === 'string' &&
    typeof obj.solvedCount === 'number' &&
    typeof obj.solvedCountWeight === 'number' &&
    typeof obj.tier === 'number'
  )
    return true;
  return false;
}

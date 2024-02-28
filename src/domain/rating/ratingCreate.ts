export interface RatingCreate {
  userId: number;
  roundId: number;
  registeredDate: String;
  solvedCount: number;
  solvedCountWeight: number;
}

export function isRatingCreate(obj: RatingCreate) {
  if (
    typeof obj.userId === 'number' &&
    typeof obj.roundId === 'number' &&
    typeof obj.registeredDate === 'string' &&
    typeof obj.solvedCount === 'number' &&
    typeof obj.solvedCountWeight === 'number'
  )
    return true;
  return false;
}

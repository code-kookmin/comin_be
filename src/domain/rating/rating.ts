export interface Rating {
  id: number;
  userId: number;
  roundId: number;
  registeredDate: String;
  solvedCount: number;
  solvedCountWeight: number;
}

export function isRating(obj: Rating) {
  if (
    typeof obj.id === 'number' &&
    typeof obj.userId === 'number' &&
    typeof obj.roundId === 'number' &&
    typeof obj.registeredDate === 'string' &&
    typeof obj.solvedCount === 'number' &&
    typeof obj.solvedCountWeight === 'number'
  )
    return true;
  return false;
}

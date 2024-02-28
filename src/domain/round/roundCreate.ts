export interface RoundCreate {
  name: string;
  startDate: string;
}

export function isRoundCreate(obj: RoundCreate) {
  if (typeof obj.name === 'string' && typeof obj.startDate === 'string') return true;
  return false;
}
